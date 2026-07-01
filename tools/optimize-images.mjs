#!/usr/bin/env node
// Build-time image optimizer.
//
// The site is a Next.js static export (`output: "export"`) deployed to GitHub
// Pages, which forces `images.unoptimized: true` — there is no server to resize
// or recompress images on the fly, so every asset is shipped at its original
// resolution. Source figures/photos are often huge (e.g. a 5474x5401, 25 MB PNG
// used as a ~256px avatar), which makes pages slow to load.
//
// This script downsizes + recompresses oversized images IN PLACE, preserving the
// file path and extension so no `import`/`src`/MDX reference needs to change.
// It is idempotent: a manifest records the content hash of every file it has
// already handled, so committed-and-optimized sources are skipped on later runs
// (and there is no cumulative generation loss). Originals remain recoverable via
// git history.
//
// Run manually with `npm run optimize-images`; it also runs before `next build`.

import { createHash } from "node:crypto";
import { readdir, readFile, writeFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

// Directories to scan for images.
const SCAN_DIRS = ["public", "app"];
// Directories to never descend into.
const IGNORE_DIRS = new Set(["node_modules", ".next", ".git", "out", ".vercel"]);
const EXTS = new Set([".png", ".jpg", ".jpeg", ".webp"]);

const MANIFEST_PATH = path.join(__dirname, ".image-optim-cache.json");

// Per-path rules. First match wins. `maxDim` caps the longest edge (px).
// `palette` uses lossy palette quantization for PNGs (great for photos/avatars,
// avoid for detailed scientific figures where it can cause banding).
const RULES = [
  { test: /[/\\]people[/\\]/, maxDim: 512, palette: true }, // avatars
  { test: /.*/, maxDim: 2000, palette: false }, // everything else (figures)
];

// Also re-process anything larger than this even if its dimensions are already
// within `maxDim` (catches under-compressed small images). Idempotency is still
// guaranteed by the manifest hash check.
const ALWAYS_CONSIDER_BYTES = 500 * 1024;

const JPEG_QUALITY = 82;
const WEBP_QUALITY = 80;
const PALETTE_QUALITY = 80;

function ruleFor(relPath) {
  return RULES.find((r) => r.test.test(relPath)) ?? RULES[RULES.length - 1];
}

function sha1(buf) {
  return createHash("sha1").update(buf).digest("hex");
}

async function walk(dir) {
  const out = [];
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (IGNORE_DIRS.has(entry.name)) continue;
      out.push(...(await walk(full)));
    } else if (EXTS.has(path.extname(entry.name).toLowerCase())) {
      out.push(full);
    }
  }
  return out;
}

async function loadManifest() {
  try {
    return JSON.parse(await readFile(MANIFEST_PATH, "utf8"));
  } catch {
    return { version: 1, files: {} };
  }
}

async function encode(pipeline, ext, rule) {
  switch (ext) {
    case ".png":
      return rule.palette
        ? pipeline.png({ palette: true, quality: PALETTE_QUALITY, effort: 8 }).toBuffer()
        : pipeline.png({ compressionLevel: 9, effort: 8 }).toBuffer();
    case ".jpg":
    case ".jpeg":
      return pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toBuffer();
    case ".webp":
      return pipeline.webp({ quality: WEBP_QUALITY }).toBuffer();
    default:
      return pipeline.toBuffer();
  }
}

function fmtBytes(n) {
  if (n >= 1024 * 1024) return `${(n / 1024 / 1024).toFixed(1)}MB`;
  if (n >= 1024) return `${(n / 1024).toFixed(0)}KB`;
  return `${n}B`;
}

async function run() {
  const manifest = await loadManifest();
  const files = (await Promise.all(SCAN_DIRS.map((d) => walk(path.join(ROOT, d))))).flat();

  let processed = 0;
  let savedBytes = 0;
  const changes = [];

  for (const file of files) {
    const rel = path.relative(ROOT, file).split(path.sep).join("/");
    const buf = await readFile(file);
    const hash = sha1(buf);

    // Skip files we've already handled and that haven't changed since.
    if (manifest.files[rel] === hash) continue;

    const ext = path.extname(file).toLowerCase();
    const rule = ruleFor(rel);

    let meta;
    try {
      meta = await sharp(buf).metadata();
    } catch (err) {
      console.warn(`  ! skipping ${rel} (cannot read: ${err.message})`);
      continue;
    }

    const longest = Math.max(meta.width || 0, meta.height || 0);
    const oversized = longest > rule.maxDim;
    const heavy = buf.length > ALWAYS_CONSIDER_BYTES;

    if (!oversized && !heavy) {
      // Nothing to do; record so we don't re-check next run.
      manifest.files[rel] = hash;
      continue;
    }

    let pipeline = sharp(buf, { animated: ext === ".webp" }).rotate(); // respect EXIF orientation
    if (oversized) {
      pipeline = pipeline.resize({
        width: rule.maxDim,
        height: rule.maxDim,
        fit: "inside",
        withoutEnlargement: true,
      });
    }

    let outBuf;
    try {
      outBuf = await encode(pipeline, ext, rule);
    } catch (err) {
      console.warn(`  ! skipping ${rel} (encode failed: ${err.message})`);
      manifest.files[rel] = hash;
      continue;
    }

    // Only rewrite if we actually made it meaningfully smaller.
    if (outBuf.length < buf.length * 0.98) {
      await writeFile(file, outBuf);
      const newHash = sha1(outBuf);
      manifest.files[rel] = newHash;
      savedBytes += buf.length - outBuf.length;
      processed++;
      changes.push({ rel, before: buf.length, after: outBuf.length });
    } else {
      // Already optimal — remember the original so we skip it next time.
      manifest.files[rel] = hash;
    }
  }

  // Prune manifest entries for files that no longer exist.
  const alive = new Set(
    files.map((f) => path.relative(ROOT, f).split(path.sep).join("/")),
  );
  for (const key of Object.keys(manifest.files)) {
    if (!alive.has(key)) delete manifest.files[key];
  }

  await writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + "\n");

  if (changes.length) {
    changes.sort((a, b) => b.before - b.after - (a.before - a.after));
    console.log(`\nOptimized ${processed} image(s):`);
    for (const c of changes) {
      console.log(
        `  ${c.rel}\n    ${fmtBytes(c.before)} -> ${fmtBytes(c.after)} ` +
          `(-${Math.round((1 - c.after / c.before) * 100)}%)`,
      );
    }
    console.log(`\nTotal saved: ${fmtBytes(savedBytes)}\n`);
  } else {
    console.log("Images already optimized — nothing to do.");
  }
}

run().catch((err) => {
  console.error("optimize-images failed:", err);
  process.exit(1);
});
