"use client";

import React, { useState } from "react";
import { fontMono } from "@/config/fonts";
import styles from "./morse.module.css";

const BIBTEX = `@article{li2026morse,
  title   = {{MoRSE}: Task-Oriented Multi-Agent System with Mixture of Role-Subtask Experts},
  author  = {Li, Peiwen and Zhang, Shiyang and Zhang, Yangtian and
             He, Sizhuang and van Dijk, David and Ying, Rex},
  journal = {arXiv preprint arXiv:2608.09251},
  year    = {2026}
}`;

export default function Bibtex() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(BIBTEX);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };
  return (
    <div className={`${styles.root} relative w-full my-4`}>
      <pre
        className={`${fontMono.variable} overflow-x-auto rounded-xl p-5 pr-24 font-mono text-[13px] leading-6 text-[#adbac7]`}
        style={{ background: "var(--m-code)" }}
      >
        {BIBTEX}
      </pre>
      <button
        type="button"
        onClick={copy}
        className={`${styles.focusable} absolute right-3 top-3 rounded-lg border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-[#cdd9e5] transition-colors hover:bg-white/10`}
        aria-live="polite"
      >
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}
