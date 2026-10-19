"use client";

import React, { useState } from "react";
import styles from "./morse.module.css";
import {
  BACKBONES,
  BASELINES,
  MAIN,
  METHODS,
  METRICS,
  BackboneKey,
  Method,
  MethodKey,
  fmt,
  methodLabel,
  niceMax,
  signedPct,
  strongestBaseline,
} from "./data";
import { Chip, Segmented, Swatch } from "./ui";

const COLOR: Record<Method["kind"], string> = {
  baseline: "var(--m-gray)",
  ours: "var(--m-accent)",
};

const BENCH_NOTE: Record<string, string> = {
  SRDD: "software requirements → runnable codebases",
  SciCode: "scientific computing, unit-tested step by step",
};

function shortName(key: MethodKey): string {
  return key === "single" ? "single agent" : methodLabel(key);
}

type Hover = { i: number; key: MethodKey } | null;

function MetricBlock({
  bb,
  i,
  hover,
  setHover,
}: {
  bb: BackboneKey;
  i: number;
  hover: Hover;
  setHover: (h: Hover) => void;
}) {
  const m = METRICS[i];
  const table = MAIN[bb];
  const rows = METHODS.map((meth) => ({ ...meth, value: table[meth.key][i] }));
  const max = niceMax(Math.max(...rows.map((r) => r.value)));
  const ours = table.morse[i];
  const ref = strongestBaseline(bb, i);

  let chip: React.ReactNode = null;
  if (ref.value === 0 && ours > 0) chip = <Chip tone="up">every baseline at 0</Chip>;
  else if (ours > ref.value) chip = <Chip tone="up">{`${signedPct((ours - ref.value) / ref.value)} vs ${shortName(ref.key)}`}</Chip>;

  const hovered = hover && hover.i === i ? rows.find((r) => r.key === hover.key) : undefined;
  let footer = m.desc;
  if (hovered && hovered.key !== "morse" && ours > hovered.value) {
    footer =
      hovered.value > 0
        ? `MoRSE vs ${shortName(hovered.key)}: ${signedPct((ours - hovered.value) / hovered.value)}`
        : `MoRSE: ${fmt(ours, m.digits)}${m.unit} vs 0 for ${shortName(hovered.key)}`;
  }

  return (
    <div className="py-3 first:pt-1 last:pb-1">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-[13px] font-semibold">
          {m.label}
          {m.unit && <span className={`${styles.muted} font-normal`}>{` (${m.unit})`}</span>}
        </span>
        {chip}
      </div>
      <div className="mt-2 space-y-[5px]" onMouseLeave={() => setHover(null)}>
        {rows.map((r) => {
          const isHover = hovered?.key === r.key;
          return (
            <div
              key={r.key}
              tabIndex={0}
              className={`${styles.focusable} grid grid-cols-[96px_1fr] items-center gap-2 rounded-md px-1 py-[1px] transition-colors`}
              style={{ background: isHover ? "var(--m-gray-wash)" : "transparent" }}
              onMouseEnter={() => setHover({ i, key: r.key })}
              onFocus={() => setHover({ i, key: r.key })}
              onBlur={() => setHover(null)}
              aria-label={`${r.label}: ${fmt(r.value, m.digits)}`}
            >
              <span className={`truncate text-xs ${r.kind === "ours" ? `${styles.ink} font-semibold` : styles.muted}`}>
                {r.label}
              </span>
              <div className="flex h-[14px] items-center gap-2">
                <div
                  className="h-[12px] rounded-r-[4px] transition-[width] duration-500 ease-out"
                  style={{ width: `${(r.value / max) * 84}%`, minWidth: r.value > 0 ? 2 : 0, background: COLOR[r.kind] }}
                />
                <span className={`${styles.tnum} text-xs ${r.kind === "ours" ? "font-semibold" : styles.muted}`}>
                  {fmt(r.value, m.digits)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <div className={`${styles.muted} mt-1.5 min-h-[16px] text-[11px] leading-4`}>{footer}</div>
    </div>
  );
}

export default function ResultsExplorer() {
  const [bb, setBb] = useState<BackboneKey>("qwen");
  const [hover, setHover] = useState<Hover>(null);
  const table = MAIN[bb];
  const onlySolver = table.morse[5] > 0 && BASELINES.every((k) => table[k][5] === 0);
  const insight = onlySolver
    ? "MoRSE has the top score on all 6 held-out metrics, and it is the only method that fully solves any held-out SciCode problem with this backbone."
    : "MoRSE has the top score on all 6 held-out metrics on the strongest backbone as well.";

  return (
    <section className={`${styles.root} ${styles.card} w-full my-6 p-4 sm:p-6`} aria-label="Main results">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Segmented<BackboneKey>
          label="Backbone"
          value={bb}
          onChange={(v) => {
            setBb(v);
            setHover(null);
          }}
          options={BACKBONES.map((b) => ({ value: b.key, label: b.label }))}
        />
        <div className={`${styles.muted} flex flex-wrap items-center gap-x-4 gap-y-1 text-xs`}>
          <span className="inline-flex items-center gap-1.5">
            <Swatch color={COLOR.ours} /> MoRSE
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Swatch color={COLOR.baseline} /> baselines
          </span>
        </div>
      </div>
      <p className={`${styles.ink2} mt-3 text-sm`}>{insight}</p>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {(["SRDD", "SciCode"] as const).map((bench) => (
          <div key={bench} className={`${styles.panel} min-w-0 px-4 py-3`}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-3 pb-1">
              <span className="text-sm font-semibold">{bench}</span>
              <span className={`${styles.muted} text-xs`}>{BENCH_NOTE[bench]}</span>
            </div>
            <div className="divide-y">
              {METRICS.map((m, i) =>
                m.bench === bench ? (
                  <div key={m.key} style={{ borderColor: "var(--m-grid)" }}>
                    <MetricBlock bb={bb} i={i} hover={hover} setHover={setHover} />
                  </div>
                ) : null,
              )}
            </div>
          </div>
        ))}
      </div>

      <p className={`${styles.muted} mt-3 text-xs leading-relaxed`}>
        Held-out test split, excluded from MoRSE&apos;s training. Chips compare MoRSE with the strongest of the four
        baselines on the same backbone.
      </p>
    </section>
  );
}
