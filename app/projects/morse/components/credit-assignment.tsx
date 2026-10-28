"use client";

import React, { useState } from "react";
import styles from "./morse.module.css";
import { Segmented, Swatch } from "./ui";

type Mode = "grpo" | "within" | "cross";

// Illustrative step rewards for one node: B = 4 routes x M = 4 candidates.
const ROUTES = [
  { experts: "E2 + E4", rewards: [0.74, 0.78, 0.82, 0.9] },
  { experts: "E1 + E4", rewards: [0.48, 0.55, 0.59, 0.62] },
  { experts: "E3 + E4", rewards: [0.3, 0.35, 0.42, 0.45] },
  { experts: "E1 + E2", rewards: [0.6, 0.66, 0.71, 0.75] },
];
const mean = (xs: number[]) => xs.reduce((a, b) => a + b, 0) / xs.length;
const ROUTE_MEANS = ROUTES.map((r) => mean(r.rewards));
const GLOBAL_MEAN = mean(ROUTE_MEANS);
// The two answers the readout follows: the weakest answer of the best route and
// the best answer of the weakest route.
const FOCUS: [number, number][] = [
  [0, 0],
  [2, 3],
];

// Plot geometry (SVG user units)
const L = 52;
const R = 596;
const T = 18;
const B = 232;
const Y_MIN = 0.2;
const Y_MAX = 1.0;
const y = (v: number) => B - ((v - Y_MIN) / (Y_MAX - Y_MIN)) * (B - T);
const COL = (R - L) / ROUTES.length;
const cx = (b: number) => L + COL / 2 + COL * b;
const OFFSETS = [-36, -12, 12, 36];

const signed = (v: number) => `${v < 0 ? "−" : "+"}${Math.abs(v).toFixed(2)}`;
const tone = (v: number) => (v >= 0 ? "var(--m-accent)" : "var(--m-neg)");

const COPY: Record<Mode, { title: string; body: string }> = {
  grpo: {
    title: "Standard GRPO: one shared baseline",
    body: "Every answer is scored against one mean over all 16 answers, and that advantage updates both the experts and the router. The weakest answer of a strong route still earns credit, and the best answer of a weak route is penalized, so expert credit absorbs the router's choice.",
  },
  within: {
    title: "HGRPO, within-route advantage → LoRA experts",
    body: "Each answer is compared only with the answers produced by the same expert combination. The advantage now reflects how well the experts did, no matter which route was sampled, and it is the only signal the LoRA experts receive.",
  },
  cross: {
    title: "HGRPO, cross-route advantage → router",
    body: "Each route's average reward is compared with the mean over routes. This advantage updates only the router, teaching it which expert combinations work for this subtask.",
  },
};

function Plot({ mode }: { mode: Mode }) {
  const grid = [0.2, 0.4, 0.6, 0.8, 1.0];
  return (
    <svg viewBox="0 0 688 292" className="h-auto w-full" role="img" aria-label={COPY[mode].title}>
      {grid.map((g) => (
        <g key={g}>
          <line x1={L} x2={R} y1={y(g)} y2={y(g)} strokeWidth={1} style={{ stroke: "var(--m-grid)" }} />
          <text x={L - 10} y={y(g) + 4} textAnchor="end" fontSize={11} className={styles.tnum} style={{ fill: "var(--m-muted)" }}>
            {g.toFixed(1)}
          </text>
        </g>
      ))}
      <text x={14} y={(T + B) / 2} fontSize={11} textAnchor="middle" transform={`rotate(-90 14 ${(T + B) / 2})`} style={{ fill: "var(--m-muted)" }}>
        step reward
      </text>

      {/* baselines */}
      {mode !== "within" && (
        <g>
          <line x1={L} x2={R} y1={y(GLOBAL_MEAN)} y2={y(GLOBAL_MEAN)} strokeWidth={1.5} style={{ stroke: "var(--m-ink-2)" }} />
          <text x={R + 10} y={y(GLOBAL_MEAN) - 3} fontSize={11} style={{ fill: "var(--m-ink-2)" }}>
            <tspan x={R + 10}>{mode === "grpo" ? "shared mean" : "mean over"}</tspan>
            <tspan x={R + 10} dy={14}>{mode === "grpo" ? GLOBAL_MEAN.toFixed(2) : `routes ${GLOBAL_MEAN.toFixed(2)}`}</tspan>
          </text>
        </g>
      )}
      {ROUTES.map((r, b) => (
        <line
          key={`m${b}`}
          x1={cx(b) - 52}
          x2={cx(b) + 52}
          y1={y(ROUTE_MEANS[b])}
          y2={y(ROUTE_MEANS[b])}
          strokeWidth={1.5}
          style={{ stroke: "var(--m-ink-2)", opacity: mode === "within" ? 1 : mode === "cross" ? 0.35 : 0, transition: "opacity 250ms ease" }}
        />
      ))}

      {/* stems + candidate dots */}
      {ROUTES.map((r, b) =>
        r.rewards.map((u, m) => {
          const base = mode === "within" ? ROUTE_MEANS[b] : GLOBAL_MEAN;
          const adv = u - base;
          const x = cx(b) + OFFSETS[m];
          const dim = mode === "cross";
          return (
            <g key={`${b}-${m}`} style={{ opacity: dim ? 0.22 : 1, transition: "opacity 250ms ease" }}>
              <line x1={x} x2={x} y1={y(base)} y2={y(u)} strokeWidth={2} strokeLinecap="round" style={{ stroke: tone(adv) }} />
              <circle cx={x} cy={y(u)} r={5} strokeWidth={2} style={{ fill: tone(adv), stroke: "var(--m-card)" }} />
            </g>
          );
        }),
      )}

      {/* cross-route: route means against the mean over routes */}
      {mode === "cross" &&
        ROUTES.map((r, b) => {
          const adv = ROUTE_MEANS[b] - GLOBAL_MEAN;
          return (
            <g key={`c${b}`}>
              <line x1={cx(b)} x2={cx(b)} y1={y(GLOBAL_MEAN)} y2={y(ROUTE_MEANS[b])} strokeWidth={3} strokeLinecap="round" style={{ stroke: tone(adv) }} />
              <rect
                x={cx(b) - 7}
                y={y(ROUTE_MEANS[b]) - 7}
                width={14}
                height={14}
                rx={2}
                transform={`rotate(45 ${cx(b)} ${y(ROUTE_MEANS[b])})`}
                strokeWidth={2}
                style={{ fill: tone(adv), stroke: "var(--m-card)" }}
              />
              <text x={cx(b) + 14} y={y(ROUTE_MEANS[b]) + 4} fontSize={12} fontWeight={600} style={{ fill: "var(--m-ink)" }}>
                {signed(adv)}
              </text>
            </g>
          );
        })}

      {/* the two followed answers */}
      {mode !== "cross" &&
        FOCUS.map(([b, m]) => {
          const u = ROUTES[b].rewards[m];
          const base = mode === "within" ? ROUTE_MEANS[b] : GLOBAL_MEAN;
          const x = cx(b) + OFFSETS[m];
          const labelLeft = m === 0;
          return (
            <g key={`f${b}`}>
              <circle cx={x} cy={y(u)} r={10} fill="none" strokeWidth={1.5} style={{ stroke: "var(--m-ink)" }} />
              <text
                x={labelLeft ? x - 15 : x + 15}
                y={y(u) + 4}
                textAnchor={labelLeft ? "end" : "start"}
                fontSize={12}
                fontWeight={600}
                style={{ fill: "var(--m-ink)" }}
              >
                {signed(u - base)}
              </text>
            </g>
          );
        })}

      {ROUTES.map((r, b) => (
        <g key={`l${b}`}>
          <text x={cx(b)} y={254} textAnchor="middle" fontSize={12} fontWeight={600} style={{ fill: "var(--m-ink-2)" }}>
            {`Route ${b + 1}`}
          </text>
          <text x={cx(b)} y={270} textAnchor="middle" fontSize={11} style={{ fill: "var(--m-muted)" }}>
            {r.experts}
          </text>
        </g>
      ))}
    </svg>
  );
}

type ReadoutRow = { name: string; grpo: number; hgrpo: number };

function Readout({ mode }: { mode: Mode }) {
  const rows: ReadoutRow[] =
    mode === "cross"
      ? [0, 2].map((b) => ({
          name: `Route ${b + 1}, ${ROUTES[b].experts}`,
          grpo: 0,
          hgrpo: ROUTE_MEANS[b] - GLOBAL_MEAN,
        }))
      : FOCUS.map(([b, m]) => {
          const u = ROUTES[b].rewards[m];
          return {
            name: b === 0 ? "Route 1, weakest" : "Route 3, best",
            grpo: u - GLOBAL_MEAN,
            hgrpo: u - ROUTE_MEANS[b],
          };
        });
  return (
    <div className={`${styles.panel} p-4`}>
      <div className="text-sm font-semibold">{COPY[mode].title}</div>
      <p className={`${styles.ink2} mt-2 text-sm leading-relaxed`}>{COPY[mode].body}</p>
      <table className={`${styles.table} mt-3`}>
        <thead>
          <tr>
            <th>{mode === "cross" ? "Route" : "Answer"}</th>
            {mode !== "cross" && <th>Standard GRPO</th>}
            <th>{mode === "cross" ? "Router advantage" : "HGRPO (experts)"}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.name}>
              <td>{r.name}</td>
              {mode !== "cross" && <td className={mode === "grpo" ? "font-semibold" : ""}>{signed(r.grpo)}</td>}
              <td className={mode !== "grpo" ? "font-semibold" : ""}>{signed(r.hgrpo)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const STATS: [string, string][] = [
  ["≈ −11.5", "standard-GRPO training surrogate at epochs 7–8, where it destabilizes"],
  ["within ±0.05", "HGRPO training surrogate across all 10 epochs"],
  ["≈21% → ≈28%", "SRDD evaluation step pass from epoch 1 to epoch 10 with HGRPO"],
];

export default function CreditAssignment() {
  const [mode, setMode] = useState<Mode>("grpo");
  return (
    <section className={`${styles.root} ${styles.card} w-full my-6 p-4 sm:p-6`} aria-label="Two-layer credit assignment">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Segmented<Mode>
          label="Credit assignment view"
          value={mode}
          onChange={setMode}
          options={[
            { value: "grpo", label: "Standard GRPO" },
            { value: "within", label: "HGRPO: expert credit" },
            { value: "cross", label: "HGRPO: router credit" },
          ]}
        />
        <div className={`${styles.muted} flex items-center gap-4 text-xs`}>
          <span className="inline-flex items-center gap-1.5">
            <Swatch color="var(--m-accent)" /> positive advantage
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Swatch color="var(--m-neg)" /> negative advantage
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span aria-hidden className="inline-block h-[2px] w-[14px]" style={{ background: "var(--m-ink-2)" }} /> baseline
          </span>
        </div>
      </div>
      <div className="mt-4 grid gap-4 lg:grid-cols-[1.6fr_1fr] lg:items-center">
        <div className="min-w-0 overflow-x-auto">
          <div className="min-w-[520px]">
            <Plot mode={mode} />
          </div>
        </div>
        <div className="min-w-0">
          <Readout mode={mode} />
        </div>
      </div>
      <p className={`${styles.muted} mt-2 text-xs`}>
        Illustrative rewards for one node with B = 4 routes and M = 4 candidates per route; advantages are shown before
        normalization.
      </p>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {STATS.map(([v, l]) => (
          <div key={l} className={`${styles.panel} p-4`}>
            <div className="text-[22px] font-semibold leading-none tracking-tight">{v}</div>
            <div className={`${styles.muted} mt-2 text-xs leading-snug`}>{l}</div>
          </div>
        ))}
      </div>
      <p className={`${styles.muted} mt-2 text-xs`}>Measured training dynamics: Qwen3-4B on SRDD, from the paper&apos;s appendix.</p>
    </section>
  );
}
