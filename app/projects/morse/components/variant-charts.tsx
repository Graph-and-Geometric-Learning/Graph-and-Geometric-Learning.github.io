"use client";

import React, { useState } from "react";
import styles from "./morse.module.css";
import { ABLATION, METRICS, OOD, OOD_METRICS, backboneLabel, fmt, niceMax, signedAbs } from "./data";
import { Chip, Swatch } from "./ui";

type Group = "qwen" | "llama";
/** Variant rows; position p of a row holds the value of METRICS[metricIdx[p]]. */
type Data = Record<Group, Record<string, number[]>>;

interface Variant {
  key: string;
  letter: string;
  name: string;
  color: string;
}

const ABLATION_VARIANTS: Variant[] = [
  { key: "A", letter: "A", name: "untrained", color: "var(--m-accent-soft)" },
  { key: "B", letter: "B", name: "fixed LoRA + GRPO", color: "var(--m-gray)" },
  { key: "C", letter: "C", name: "MoLE + GRPO", color: "var(--m-gray)" },
  { key: "D", letter: "D", name: "MoLE + HGRPO", color: "var(--m-accent)" },
];

const OOD_VARIANTS: Variant[] = [
  { key: "A", letter: "A", name: "untrained", color: "var(--m-accent-soft)" },
  { key: "B", letter: "B", name: "fixed LoRA + GRPO", color: "var(--m-gray)" },
  { key: "D", letter: "D", name: "MoRSE", color: "var(--m-accent)" },
];

const GROUPS: Group[] = ["qwen", "llama"];
const ALL_METRICS = METRICS.map((_, i) => i);

/** Count positions (over both backbones) where variant `a` scores above `b`. */
function wins(data: Data, positions: number, a: string, b: string) {
  let above = 0;
  let total = 0;
  GROUPS.forEach((g) => {
    for (let p = 0; p < positions; p++) {
      total += 1;
      if (data[g][a][p] > data[g][b][p]) above += 1;
    }
  });
  return { above, total };
}

function BarTable({
  data,
  group,
  variants,
  metricIdx,
  deltaRef,
}: {
  data: Data;
  group: Group;
  variants: Variant[];
  metricIdx: number[];
  deltaRef?: string;
}) {
  const [hover, setHover] = useState<number | null>(null);
  const benches = ["SRDD", "SciCode"] as const;
  // Equal-width variant columns, so bar lengths compare across columns.
  const metricW = deltaRef ? 30 : 31;
  const deltaW = deltaRef ? 14 : 0;
  const colW = (100 - metricW - deltaW) / variants.length;
  return (
    <div className={`${styles.panel} min-w-0 overflow-x-auto p-4`}>
      <div className="text-sm font-semibold">{backboneLabel(group)}</div>
      <table className="mt-2 w-full border-collapse text-left" style={{ minWidth: 400, tableLayout: "fixed" }}>
        <colgroup>
          <col style={{ width: `${metricW}%` }} />
          {variants.map((v) => (
            <col key={v.key} style={{ width: `${colW}%` }} />
          ))}
          {deltaRef && <col style={{ width: `${deltaW}%` }} />}
        </colgroup>
        <thead>
          <tr>
            <th className="pb-2 align-bottom" />
            {variants.map((v) => (
              <th key={v.key} className="px-2 pb-2 align-bottom font-normal">
                <div className="flex items-center gap-1.5">
                  <Swatch color={v.color} />
                  <span className={`text-xs font-semibold ${v.key === "D" ? styles.ink : styles.ink2}`}>{v.letter}</span>
                </div>
                <div className={`${styles.muted} mt-0.5 text-[11px] leading-tight`}>{v.name}</div>
              </th>
            ))}
            {deltaRef && (
              <th className={`${styles.muted} pb-2 pl-2 text-right align-bottom text-[11px] font-normal`}>
                {`D − ${deltaRef}`}
              </th>
            )}
          </tr>
        </thead>
        {benches.map((bench) => {
          const positions = metricIdx.map((mi, p) => ({ mi, p })).filter(({ mi }) => METRICS[mi].bench === bench);
          if (positions.length === 0) return null;
          return (
            <tbody key={bench}>
              <tr>
                <td colSpan={variants.length + (deltaRef ? 2 : 1)} className="pt-2">
                  <span className={styles.label}>{bench}</span>
                </td>
              </tr>
              {positions.map(({ mi, p }) => {
                const m = METRICS[mi];
                const values = variants.map((v) => data[group][v.key][p]);
                const max = niceMax(Math.max(...values));
                const delta = deltaRef ? data[group].D[p] - data[group][deltaRef][p] : 0;
                return (
                  <tr
                    key={m.key}
                    tabIndex={0}
                    className={`${styles.focusable} transition-colors`}
                    style={{ background: hover === p ? "var(--m-gray-wash)" : "transparent" }}
                    onMouseEnter={() => setHover(p)}
                    onMouseLeave={() => setHover(null)}
                    onFocus={() => setHover(p)}
                    onBlur={() => setHover(null)}
                  >
                    <td className="border-t py-2 pr-2 text-[13px]" style={{ borderColor: "var(--m-grid)" }}>
                      {m.label}
                      {m.unit && <span className={styles.muted}>{` (${m.unit})`}</span>}
                    </td>
                    {variants.map((v, k) => (
                      <td key={v.key} className="border-t px-2 py-2" style={{ borderColor: "var(--m-grid)" }}>
                        <div className={`${styles.tnum} text-[13px] ${v.key === "D" ? `${styles.ink} font-semibold` : styles.ink2}`}>
                          {fmt(values[k], m.digits)}
                        </div>
                        <div className="mt-1 h-[4px] w-full rounded-full" style={{ background: "var(--m-grid)" }}>
                          <div className="h-full rounded-full" style={{ width: `${(values[k] / max) * 100}%`, background: v.color }} />
                        </div>
                      </td>
                    ))}
                    {deltaRef && (
                      <td className="border-t py-2 pl-2 text-right" style={{ borderColor: "var(--m-grid)" }}>
                        <Chip tone="up">{signedAbs(delta, m.digits)}</Chip>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          );
        })}
      </table>
    </div>
  );
}

function Takeaways({ items }: { items: [string, string][] }) {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {items.map(([k, v]) => (
        <div key={k} className={`${styles.panel} p-4`}>
          <div className="text-[15px] font-semibold">{k}</div>
          <p className={`${styles.ink2} mt-1.5 text-sm leading-relaxed`}>{v}</p>
        </div>
      ))}
    </div>
  );
}

function Section({
  label,
  data,
  variants,
  metricIdx,
  deltaRef,
  takeaways,
  note,
}: {
  label: string;
  data: Data;
  variants: Variant[];
  metricIdx: number[];
  deltaRef?: string;
  takeaways: [string, string][];
  note: string;
}) {
  return (
    <section className={`${styles.root} w-full my-6`} aria-label={label}>
      <Takeaways items={takeaways} />
      <details className={`${styles.details} mt-3`}>
        <summary>Show the full numbers</summary>
        <div className="mt-3 grid gap-4 lg:grid-cols-2">
          {GROUPS.map((g) => (
            <BarTable key={g} data={data} group={g} variants={variants} metricIdx={metricIdx} deltaRef={deltaRef} />
          ))}
        </div>
        <p className={`${styles.muted} mt-3 text-xs leading-relaxed`}>{note}</p>
      </details>
    </section>
  );
}

export function Ablation() {
  const data = ABLATION as Data;
  const n = ALL_METRICS.length;
  const dc = wins(data, n, "D", "C");
  const db = wins(data, n, "D", "B");
  const da = wins(data, n, "D", "A");
  return (
    <Section
      label="Ablation study"
      data={data}
      variants={ABLATION_VARIANTS}
      metricIdx={ALL_METRICS}
      takeaways={[
        [
          "HGRPO makes MoLE work",
          `With MoLE fixed, switching standard GRPO to HGRPO (C → D) improves ${dc.above} of ${dc.total} metrics.`,
        ],
        [
          "More than extra parameters",
          `MoRSE (D) beats a fixed LoRA (B) whose rank matches MoRSE's activated parameters per call (3.24M on Qwen3-4B) on ${db.above} of ${db.total} metrics.`,
        ],
        [
          "Training adds on top of the framework",
          `MoRSE (D) improves on the untrained framework (A) on ${da.above} of ${da.total} metrics across both backbones.`,
        ],
      ]}
      note="Held-out test split. A is the untrained framework (MoRSE without MoLE and HGRPO); B, C, and D are trained with the same data, reward, rollout budget, and schedule. Bars are scaled per row."
    />
  );
}

export function Generalization() {
  const data = OOD as unknown as Data;
  const n = OOD_METRICS.length;
  const da = wins(data, n, "D", "A");
  const db = wins(data, n, "D", "B");
  let best = { delta: -Infinity, group: GROUPS[0], p: 0 };
  GROUPS.forEach((g) => {
    for (let p = 0; p < n; p++) {
      if (METRICS[OOD_METRICS[p]].key !== "sci_step") continue;
      const d = data[g].D[p] - data[g].A[p];
      if (d > best.delta) best = { delta: d, group: g, p };
    }
  });
  const bestMetric = METRICS[OOD_METRICS[best.p]];
  // Name the scope explicitly, since the table starts collapsed.
  const srddAll = METRICS.every((m, i) => m.bench !== "SRDD" || OOD_METRICS.indexOf(i) >= 0);
  const sciShown = OOD_METRICS.filter((i) => METRICS[i].bench === "SciCode").map((i) => METRICS[i].label.toLowerCase());
  const scope = `${srddAll ? "every SRDD metric" : "the SRDD metrics shown"}${sciShown.length ? ` and on SciCode ${sciShown.join(" and ")}` : ""}`;
  const share = (w: { above: number; total: number }) =>
    w.above === w.total ? scope : `${w.above} of ${w.total} held-out results`;
  return (
    <Section
      label="Generalization to held-out categories"
      data={data}
      variants={OOD_VARIANTS}
      metricIdx={OOD_METRICS}
      deltaRef="A"
      takeaways={[
        [
          "Training transfers",
          `On categories never seen in training, MoRSE beats its untrained version on ${share(da)}, for both backbones.`,
        ],
        [
          "Routing beats a fixed adapter",
          `Against standard fine-tuning with one fixed LoRA, MoRSE is higher on ${share(db)}: dynamic role-subtask routing generalizes better.`,
        ],
        [
          "Unseen scientific domains",
          `${signedAbs(best.delta, bestMetric.digits)} points of ${bestMetric.label.toLowerCase()} over the untrained framework on Chemistry and Biology (${backboneLabel(best.group)}), after training only on Physics, Math, and Material Science.`,
        ],
      ]}
      note="SRDD withholds 8 of its 40 categories from training; SciCode trains on Physics, Math, and Material Science and tests on Chemistry and Biology. The last column is D minus A in each metric's units. Bars are scaled per row."
    />
  );
}
