import argparse
import json
import os
import random
import re
import sys
import tempfile
import time
import shutil
import unicodedata
from pathlib import Path
from urllib.parse import urlencode, urljoin, urlparse, quote_plus

import requests
from bs4 import BeautifulSoup

# Optional: pdf text extractors
# pdfminer is more robust; PyPDF2 as fallback.
try:
    from pdfminer.high_level import extract_text as pdfminer_extract_text
except Exception:
    pdfminer_extract_text = None

try:
    import PyPDF2
except Exception:
    PyPDF2 = None

from selenium import webdriver
from selenium.webdriver.chrome.options import Options as ChromeOptions
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# -------------------------
# Config
# -------------------------
DEFAULT_PROFILE_URL = "https://scholar.google.com/citations?user=6fqNXooAAAAJ&hl=en"
OUTPUT_PDFS_DIR = Path("pdfs")
OUTPUT_TEXTS_DIR = Path("texts")
METADATA_JSONL = Path("metadata.jsonl")

PREFERRED_DOMAINS = [
    "arxiv.org", "arxiv-vanity.com",
    "biorxiv.org", "medrxiv.org",
    "openaccess", "europepmc.org",
    "nih.gov", "ncbi.nlm.nih.gov",
    "researchgate.net",  # sometimes direct pdfs
    "aclanthology.org",
    "ieeexplore.ieee.org",
    "springer.com", "link.springer.com",
    "nature.com",
    "science.org",
    "dl.acm.org",
]

HEADERS_LIST = [
    # A few common modern UAs (rotate to reduce trivial blocks),
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36"
]

SCHOLAR_HOST = "https://scholar.google.com"

# -------------------------
# Helpers
# -------------------------
def log(msg):
    print(f"[scholar] {msg}", flush=True)

def rand_headers():
    return {
        "User-Agent": random.choice(HEADERS_LIST),
        "Accept-Language": "en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "Cookie": "MAID=YBpVWvJNc3x26eWH3oP8VA==; MACHINE_LAST_SEEN=2025-08-20T17%3A15%3A12.909-07%3A00; JSESSIONID=93829B0CF001686E2CFB4EB7240EDFA4; _cfuvid=76MEMSLA8NRCgcL2RAF36oLcmjsIO7FgMLQVAboYA80-1755735313040-0.0.1.1-604800000; _ga=GA1.2.1737651124.1755735316; _gid=GA1.2.326039450.1755735316; _hjSessionUser_1290436=eyJpZCI6IjgwNWZlNjJkLTQ2NmMtNWJkYi04OGE1LWI4OWYxN2Q1OGVjMSIsImNyZWF0ZWQiOjE3NTU3MzUzMTYyMDIsImV4aXN0aW5nIjpmYWxzZX0=; cf_clearance=nXUpafzFSvcEZa1WrvfERljSZ5KHnpC_OsOVX0ydhzc-1755735316-1.2.1.1-h2.vXFizXIl8SkFx5opdkr2jZ9XYxc0K4DHr.uSvIK9mw2Y_WqjODCZMirqWO_ylU7ERZsQnad9kAaC_xjcnk06U7xAueCoYYRVe.ujpVfOCriBeyvtqxB3xRjm.UjgbIbVvx_3F7aGKoAgiL8KFRoMWiAwIKCiwQAK1go1UOkxEn2FJ36GR1vNrbVUOJxR6P5V4eHwm5jRUREogQBS6arv_N1v0LkOxHxKvT6258Jk; _ga_JPDX9GZR59=GS2.2.s1755735316$o1$g0$t1755735316$j60$l0$h0; __cf_bm=MIEk2TuKdS2ZoczTX8IRkAYTSS2RuN2GapsDLA1XPaI-1755736683-1.0.1.1-wdjF0pUfFESe0T9h6TPjPJQi8M3cfdT_GcYo4Syl3OTo6R5wyAFtx2N6tQfXZZKoVTJOvMuG5Av9_J_.wR1.H6qGfOkOSHlrpnA6iozh9s8"
    }

def sanitize_filename(s):
    # Strip accents, remove filesystem-problem chars, collapse spaces
    s = unicodedata.normalize("NFKD", s).encode("ascii", "ignore").decode("ascii")
    s = re.sub(r"[^\w\s\-\.\(\)\[\]]", "", s)
    s = re.sub(r"\s+", " ", s).strip()
    return s[:180]  # keep reasonable length

def load_env_cookies_for_domain(domain):
    # If COOKIES_JSON given, use the matching domain cookie dict
    cj = os.getenv("COOKIES_JSON")
    if cj:
        try:
            data = json.loads(cj)
            for d, cookie_dict in data.items():
                if d in domain:
                    return cookie_dict
        except Exception:
            pass
    # Else parse BROWSER_COOKIES "k=v; k2=v2"
    raw = os.getenv("BROWSER_COOKIES")
    if not raw:
        return None
    cookie_dict = {}
    for part in raw.split(";"):
        part = part.strip()
        if not part or "=" not in part:
            continue
        k, v = part.split("=", 1)
        cookie_dict[k.strip()] = v.strip()
    return cookie_dict or None

def add_cookies_to_session(session, domain):
    cookie_dict = load_env_cookies_for_domain(domain)
    if cookie_dict:
        for k, v in cookie_dict.items():
            session.cookies.set(k, v, domain="." + domain)

def robust_get(session, url, max_tries=5, allow_redirects=True, stream=False, expect_pdf=False, extra_headers=None, set_referer_for=None):
    """
    GET with retries and exponential backoff.
    - expect_pdf: tweak Accept header
    - extra_headers: dict merged into headers for this call
    - set_referer_for: if given, force a Referer header to that URL
    """
    domain = urlparse(url).netloc
    add_cookies_to_session(session, domain)

    for attempt in range(1, max_tries + 1):
        try:
            headers = rand_headers()
            if expect_pdf:
                headers["Accept"] = "application/pdf,*/*;q=0.8"
            if set_referer_for:
                headers["Referer"] = set_referer_for
            if extra_headers:
                headers.update(extra_headers)

            resp = session.get(url, headers=headers, timeout=25, allow_redirects=allow_redirects, stream=stream)
            if resp.status_code in (200, 206):
                return resp
            elif resp.status_code in (403, 429, 503):
                sleep = min(60, (2.0 ** attempt) + random.uniform(0, 0.7))
                log(f"[rate-limit] {resp.status_code} on {url}. Backoff {sleep:.1f}s")
                time.sleep(sleep)
            else:
                log(f"[warn] HTTP {resp.status_code} on {url}. Attempt {attempt}/{max_tries}")
                time.sleep(1.5 * attempt + random.random())
        except requests.RequestException as e:
            log(f"[warn] GET error: {e}. Attempt {attempt}/{max_tries}")
            time.sleep(1.5 * attempt + random.random())
    raise RuntimeError(f"Failed to GET after {max_tries} attempts: {url}")


def scholar_profile_iter_pubs(session, profile_url):
    """
    Iterate all publications on a Scholar profile by paginating with cstart & pagesize=100.
    Yields dicts: {title, year, title_link (view page), cluster_search_url}
    """
    log("Enumerating publications via cstart pagination (pagesize=100)")
    cstart = 0
    pagesize = 100
    while True:
        sep = "&" if "?" in profile_url else "?"
        page_url = f"{profile_url}{sep}cstart={cstart}&pagesize={pagesize}"
        resp = robust_get(session, page_url)
        soup = BeautifulSoup(resp.text, "html.parser")

        rows = soup.select("tr.gsc_a_tr")
        if not rows:
            # Might be blocked; try lighter UA delay and a second pass
            time.sleep(2.0 + random.random())
            resp = robust_get(session, page_url)
            soup = BeautifulSoup(resp.text, "html.parser")
            rows = soup.select("tr.gsc_a_tr")

        if not rows:
            # No more pubs or layout changed
            if cstart == 0:
                log("No publications found (profile may be blocked).")
            break

        for tr in rows:
            a = tr.select_one("a.gsc_a_at")
            if not a or not a.get_text(strip=True):
                continue
            title = a.get_text(" ", strip=True)
            view_href = a.get("href", "")
            view_url = urljoin(SCHOLAR_HOST, view_href) if view_href else None

            year_td = tr.select_one("td.gsc_a_y span")
            year = year_td.get_text(strip=True) if year_td else ""

            # We'll also prepare a cluster search URL by querying the title directly
            cluster_search_url = f"{SCHOLAR_HOST}/scholar?{urlencode({'q': title})}"

            yield {
                "title": title,
                "year": year,
                "view_url": view_url,
                "cluster_search_url": cluster_search_url,
            }

        # If fewer than pagesize, we're at end
        if len(rows) < pagesize:
            break
        cstart += pagesize
        # be polite
        time.sleep(2.0 + random.random())

def pick_pdf_from_scholar_result_page(html):
    """
    Parse a Google Scholar search/cluster results page HTML, return a single best PDF URL.
    Strategy:
      - Prefer the small left "[PDF]" links (class gs_or_ggsm a).
      - Otherwise, look for direct .pdf in result anchors.
      - Prefer by PREFERRED_DOMAINS order.
    """
    soup = BeautifulSoup(html, "html.parser")
    candidates = []

    for a in soup.select(".gsc_oci_title_ggi"):
        candidates.append(a.find("a")["href"])
        
    # 1) The classic small [PDF] link to the left of a result
    for a in soup.select(".gs_or_ggsm a[href]"):
        href = a.get("href", "")
        if href.lower().endswith(".pdf") or "/pdf" in href:
            candidates.append(href)

    # 2) Any anchor within a result containing direct PDF
    for a in soup.select("h3 a[href], .gs_rs a[href], .gs_fl a[href]"):
        href = a.get("href", "")
        if href.lower().endswith(".pdf") or re.search(r"/pdf(?:/|$|\?)", href.lower()):
            candidates.append(href)

    # Deduplicate preserving order
    seen = set()
    deduped = []
    for u in candidates:
        if u not in seen:
            seen.add(u)
            deduped.append(u)

    if not deduped:
        return None

    # Prefer by domain ordering
    def domain_rank(u):
        host = urlparse(u).netloc.lower()
        for i, d in enumerate(PREFERRED_DOMAINS):
            if d in host:
                return i
        return len(PREFERRED_DOMAINS) + 1

    deduped.sort(key=domain_rank)
    return deduped[0]

def find_one_pdf_for_title(session, title, view_url=None, cluster_search_url=None):
    """
    Try several approaches to locate a single PDF URL for a paper title.
    1) Use 'view_url' page (Scholar's per-paper page) if provided: it often contains "All versions" and left [PDF] links.
    2) Use 'cluster_search_url' to query Scholar results for the title.
    3) As a stretch, query Scholar preferring arXiv/bioRxiv first by adding site: filters.
    Returns a PDF URL or None.
    """
    tries = []

    if view_url:
        tries.append(view_url)
    if cluster_search_url:
        tries.append(cluster_search_url)
    # targeted arXiv/bioRxiv searches
    if title:
        tries.append(f"{SCHOLAR_HOST}/scholar?q=site:arxiv.org+{quote_plus(title)}")
        tries.append(f"{SCHOLAR_HOST}/scholar?q=site:biorxiv.org+{quote_plus(title)}")

    for turl in tries:
        try:
            resp = robust_get(session, turl)
            pdf = pick_pdf_from_scholar_result_page(resp.text)
            if pdf:
                return pdf
            # if this was a 'view' page, it may be a different layout; also try
            # extracting its "All versions" link then open that
            soup = BeautifulSoup(resp.text, "html.parser")
            more_versions = soup.select_one("a[href*='scholar?cluster='], a.gsc_oci_title_gg a[href*='scholar?cluster=']")
            if more_versions and more_versions.get("href"):
                vurl = urljoin(SCHOLAR_HOST, more_versions["href"])
                resp2 = robust_get(session, vurl)
                pdf2 = pick_pdf_from_scholar_result_page(resp2.text)
                if pdf2:
                    return pdf2
        except Exception as e:
            log(f"[warn] while searching PDF for '{title}': {e}")
        # be polite between requests
        time.sleep(1.2 + random.random())

    return None

def maybe_adjust_pdf_url(url):
    """
    Adjust known domains to maximize likelihood of a binary PDF response.
    """
    parsed = urlparse(url)
    host = parsed.netloc.lower()

    # ACM often needs ?download=true
    if "dl.acm.org" in host and "download=true" not in url:
        if "?" in url:
            return url + "&download=true"
        else:
            return url + "?download=true"

    # arXiv html pages -> try to convert to /pdf/<id>.pdf
    if "arxiv.org" in host and not url.lower().endswith(".pdf"):
        m = re.search(r"arxiv\.org/(abs|html|format|pdf)/([0-9]+\.[0-9]+)(v[0-9]+)?", url)
        if m:
            paper_id = m.group(2)
            ver = m.group(3) or ""
            return f"https://arxiv.org/pdf/{paper_id}{ver}.pdf"

    # bioRxiv often provides direct pdf via /content/....full.pdf
    if "biorxiv.org" in host and not url.lower().endswith(".pdf"):
        # heuristic: replace /content/xxxxx with .full.pdf
        if "/content/" in url:
            if not url.endswith(".full.pdf"):
                return re.sub(r"(/content/[^?#]+?)(?:[\?#].*)?$", r"\1.full.pdf", url)

    return url

def download_pdf(session, url, out_path):
    url = maybe_adjust_pdf_url(url)
    domain = urlparse(url).netloc
    add_cookies_to_session(session, domain)
    
    return selenium_fetch_pdf(url, out_path)


def may_get_file(directory):
    file_paths = os.listdir(directory)
    if len(file_paths) == 0:
        return None
    file_path = os.path.join(directory, file_paths[0])
    return file_path
    

def selenium_fetch_pdf(url, out_path):
    """
    Use headless Chrome to fetch/save a PDF binary. We *navigate*, then:
    - If content is served as PDF in-browser, Chrome can 'print to PDF' or we try to fetch via a <a> link.
    - As a practical shortcut, we try to directly download the URL with cookies taken from the Selenium session.
    """
    chrome_opts = ChromeOptions()
    # chrome_opts.add_argument("--headless=new")
    chrome_opts.add_argument("--disable-gpu")
    chrome_opts.add_argument("--no-sandbox")
    chrome_opts.add_argument("--window-size=1400,900")
    # Try to encourage direct download
    temp_dir = tempfile.mkdtemp()
    prefs = {
        "download.default_directory": temp_dir,
        "download.prompt_for_download": False,
        "download.directory_upgrade": True,
        "plugins.always_open_pdf_externally": True,  # don't use Chrome PDF viewer
        # These help avoid Chrome blocking the save
        "safebrowsing.enabled": False,
        "safebrowsing.disable_download_protection": True,
    }
    chrome_opts.add_experimental_option("prefs", prefs)
    driver = webdriver.Chrome(options=chrome_opts)
    driver.get(url)
    # allow redirects/JS
    time.sleep(4.0)
    file_path = may_get_file(temp_dir)

    if file_path:
        os.rename(file_path, out_path)
        driver.quit()
        return True

    driver.quit()
    
    return False

def ensure_dirs():
    OUTPUT_PDFS_DIR.mkdir(parents=True, exist_ok=True)
    OUTPUT_TEXTS_DIR.mkdir(parents=True, exist_ok=True)

def cleanup():
    shutil.rmtree(OUTPUT_PDFS_DIR, ignore_errors=True)
    shutil.rmtree(OUTPUT_TEXTS_DIR, ignore_errors=True)
    METADATA_JSONL.unlink(missing_ok=True)

def write_metadata_line(meta, rec):
    meta.append(rec)
    with METADATA_JSONL.open("w", encoding="utf-8") as f:
        for rec in meta:
            f.write(json.dumps(rec, ensure_ascii=False) + "\n")
            
def read_metadata():
    if not METADATA_JSONL.exists():
        return []
    records = []
    with METADATA_JSONL.open("r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            try:
                records.append(json.loads(line))
            except Exception:
                pass
    return records

def do_download(profile_url):
    ensure_dirs()
    # fresh metadata file? append in case of resume
    old_metadata = read_metadata()
    existing = {Path(r.get("pdf_path", "")).name for r in old_metadata}
    
    new_metadata = []

    with requests.Session() as session:
        # baseline cookies for scholar itself
        add_cookies_to_session(session, "scholar.google.com")

        for idx, pub in enumerate(scholar_profile_iter_pubs(session, profile_url), 1):
            title = pub["title"]
            year = pub.get("year", "")
            safe_name = sanitize_filename(f"{title} ({year})" if year else title)
            pdf_path = OUTPUT_PDFS_DIR / f"{safe_name}.pdf"
            if pdf_path.name in existing and pdf_path.exists():
                log(f"[{idx}] Skipping already-downloaded: {pdf_path.name}")
                for rec in old_metadata:
                    if rec.get("pdf_path", "") == str(pdf_path):
                        write_metadata_line(new_metadata, rec)
                        break
                continue

            log(f"[{idx}] Resolving PDF for: {title} ({year})")
            pdf_url = find_one_pdf_for_title(
                session,
                title=title,
                view_url=pub.get("view_url"),
                cluster_search_url=pub.get("cluster_search_url"),
            )

            if not pdf_url:
                log(f"    -> No PDF found on Scholar for '{title}'. You can manually add it later.")
                meta = {
                    "title": title,
                    "year": year,
                    "pdf_url": None,
                    "source_domain": None,
                    "pdf_path": str(pdf_path),
                    "status": "not_found",
                }
                write_metadata_line(new_metadata, meta)
                continue

            pdf_url_adj = maybe_adjust_pdf_url(pdf_url)
            domain = urlparse(pdf_url_adj).netloc
            log(f"    -> Candidate PDF: {pdf_url_adj}")

            ok = download_pdf(session, pdf_url_adj, pdf_path)
            if ok and pdf_path.exists() and pdf_path.stat().st_size > 1024:
                log(f"    -> Saved: {pdf_path}")
                meta = {
                    "title": title,
                    "year": year,
                    "pdf_url": pdf_url_adj,
                    "source_domain": domain,
                    "pdf_path": str(pdf_path),
                    "status": "downloaded",
                }
                write_metadata_line(new_metadata, meta)
            else:
                log(f"    -> Download failed for '{title}'.")
                meta = {
                    "title": title,
                    "year": year,
                    "pdf_url": pdf_url_adj,
                    "source_domain": domain,
                    "pdf_path": str(pdf_path),
                    "status": "failed",
                }
                write_metadata_line(new_metadata, meta)

            # politeness delay between papers
            time.sleep(2.0 + random.random())

def extract_text_from_pdf(path):
    # Prefer pdfminer if available
    if pdfminer_extract_text:
        try:
            return pdfminer_extract_text(str(path)) or ""
        except Exception as e:
            log(f"[warn] pdfminer failed on {path.name}: {e}")

    # Fallback to PyPDF2
    if PyPDF2:
        try:
            text = []
            with open(path, "rb") as f:
                reader = PyPDF2.PdfReader(f)
                for page in reader.pages:
                    try:
                        text.append(page.extract_text() or "")
                    except Exception:
                        text.append("")
            return "\n".join(text)
        except Exception as e:
            log(f"[warn] PyPDF2 failed on {path.name}: {e}")

    raise RuntimeError("No PDF text extractor available. Install pdfminer.six or PyPDF2.")

def do_convert():
    ensure_dirs()
    records = read_metadata()
    if not records:
        log("No metadata.jsonl found. Run with --download first.")
        sys.exit(1)

    for i, rec in enumerate(records, 1):
        pdf_path = Path(rec.get("pdf_path", ""))
        if not pdf_path.exists():
            log(f"[{i}] Missing PDF, skip: {pdf_path}")
            continue

        # Use the same base name
        base = pdf_path.stem
        txt_path = OUTPUT_TEXTS_DIR / f"{base}.txt"
        if txt_path.exists():
            log(f"[{i}] Already converted: {txt_path.name}")
            continue

        try:
            log(f"[{i}] Converting to text: {pdf_path.name}")
            txt = extract_text_from_pdf(pdf_path)
            # Minimal cleanup to aid word-cloud later
            txt = txt.replace("\x00", "")
            with open(txt_path, "w", encoding="utf-8") as f:
                f.write(txt)
        except Exception as e:
            log(f"[error] convert failed for {pdf_path.name}: {e}")
            

from wordcloud import WordCloud, STOPWORDS
import pandas as pd

def generate_word_cloud():
    all_text = ""
    for txt_path in OUTPUT_TEXTS_DIR.glob("*.txt"):
        with open(txt_path, "r", encoding="utf-8") as f:
            all_text += '\n' + f.read()
            
    wordcloud = WordCloud(
        background_color=None,
        width=480,
        height=360,
        mode='RGBA',
        min_word_length=2,
        font_path="../public/FiraCodeNerdFont-Medium.ttf",
        stopwords = STOPWORDS.union({
            "propose",
            "model",
            "models",
            "existing",
            "data",
            "method",
            "methods",
            "task",
            "training",
            "et", "al",
            "based",
            "arxiv",
            "preprint",
            "table",
            "dataset",
            "univ",
            "cid",
            "figure",
            "number",
            "using",
            "use", 
            "one",
            "two",
            "three",
            "four",
            "proceeding",
            "given",
            "zhang",
            "may",
            "appendix",
            "used",
            "well",
            "will",
            "fig",
            "end",
            "follow",
            "chen"
        })
        ).generate(all_text)
    image = wordcloud.to_image()
    image.show()
    svg = wordcloud.to_svg()
    with open("../public/wordcloud.svg", "w", encoding="utf-8") as f:
        f.write(svg)
# -------------------------
# Main
# -------------------------
def main():
    parser = argparse.ArgumentParser(description="Download PDFs from a Google Scholar profile, then convert to text.")
    parser.add_argument("--download", action="store_true", help="Download PDFs and write metadata.jsonl")
    parser.add_argument("--convert", action="store_true", help="Convert previously downloaded PDFs to text")
    parser.add_argument("--wordcloud", action="store_true", help="Generate word cloud from text")
    parser.add_argument("--url", type=str, default="https://scholar.google.com/citations?user=6fqNXooAAAAJ&hl=en")
    args = parser.parse_args()
    
    # cleanup()
    
    if args.download == args.convert == args.wordcloud:
        raise ValueError("You must choose exactly one mode: --download OR --convert OR --wordcloud")

    if args.download:
        do_download(args.url)
    elif args.convert:
        do_convert()
    elif args.wordcloud:
        generate_word_cloud()

if __name__ == "__main__":
    main()
