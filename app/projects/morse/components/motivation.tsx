import React from "react";
import styles from "./morse.module.css";

const ink = "var(--m-ink-2)";
const muted = "var(--m-muted)";

/** Three agents feeding near-identical outputs. */
function EchoGlyph() {
  return (
    <svg viewBox="0 0 220 84" className="h-[84px] w-full" aria-hidden>
      {[18, 42, 66].map((y) => (
        <g key={y}>
          <circle cx={26} cy={y} r={8} style={{ fill: "var(--m-gray-wash)", stroke: muted }} strokeWidth={1.5} />
          <path d={`M38 ${y} C 90 ${y}, 110 42, 146 42`} fill="none" style={{ stroke: muted }} strokeWidth={1.25} />
        </g>
      ))}
      {[8, 4, 0].map((d, k) => (
        <rect
          key={d}
          x={152 + d}
          y={28 - d}
          width={44}
          height={28}
          rx={6}
          style={{ fill: "var(--m-accent-soft)", stroke: "var(--m-card)", opacity: 0.55 + 0.2 * k }}
          strokeWidth={2}
        />
      ))}
    </svg>
  );
}

/** A small DAG whose outputs fan out but still overlap. */
function SpreadGlyph() {
  const nodes: [number, number][] = [
    [22, 42],
    [60, 20],
    [60, 64],
    [98, 42],
  ];
  const edges: [number, number][] = [
    [0, 1],
    [0, 2],
    [1, 3],
    [2, 3],
  ];
  return (
    <svg viewBox="0 0 220 84" className="h-[84px] w-full" aria-hidden>
      {edges.map(([a, b]) => (
        <line
          key={`${a}${b}`}
          x1={nodes[a][0]}
          y1={nodes[a][1]}
          x2={nodes[b][0]}
          y2={nodes[b][1]}
          style={{ stroke: muted }}
          strokeWidth={1.25}
        />
      ))}
      {nodes.map(([x, y], k) => (
        <circle key={k} cx={x} cy={y} r={7} style={{ fill: "var(--m-card)", stroke: ink }} strokeWidth={1.5} />
      ))}
      {[10, 30, 50].map((y, k) => (
        <g key={y}>
          <path d={`M108 42 C 128 42, 132 ${y + 12}, 150 ${y + 12}`} fill="none" style={{ stroke: muted }} strokeWidth={1.25} />
          <rect
            x={154 + k * 10}
            y={y}
            width={44}
            height={24}
            rx={6}
            style={{ fill: "var(--m-accent-soft)", stroke: "var(--m-card)", opacity: 0.6 + 0.15 * k }}
            strokeWidth={2}
          />
        </g>
      ))}
    </svg>
  );
}

/** Two low-rank subspaces fanning out from a shared origin, one per role. */
function SubspaceGlyph() {
  return (
    <svg viewBox="0 0 220 84" className="h-[84px] w-full" aria-hidden>
      <polygon points="30,62 128,72 150,48 52,38" style={{ fill: "var(--m-gray-wash)", stroke: muted }} strokeWidth={1.25} />
      <polygon points="30,62 112,30 150,8 68,40" style={{ fill: "var(--m-accent-wash)", stroke: "var(--m-accent)" }} strokeWidth={1.5} />
      <path d="M 70 66 A 40 40 0 0 0 66 48" fill="none" style={{ stroke: ink }} strokeWidth={1.25} />
      <circle cx={30} cy={62} r={2.5} style={{ fill: ink }} />
      <text x={158} y={14} fontSize={10} style={{ fill: ink }}>execute</text>
      <text x={158} y={62} fontSize={10} style={{ fill: muted }}>merge</text>
    </svg>
  );
}

const FINDINGS: {
  eyebrow: string;
  title: string;
  stat: string;
  statNote: string;
  body: string;
  glyph: React.ReactNode;
}[] = [
  {
    eyebrow: "Finding 1 · role prompts",
    title: "Role prompts make agents echo each other",
    stat: "+0.14",
    statNote: "median shift from prompt to output similarity, MacNet",
    body: "With or without its review stage, MacNet's agents produce outputs that are more alike than the prompts that produced them.",
    glyph: <EchoGlyph />,
  },
  {
    eyebrow: "Finding 2 · task decomposition",
    title: "Giving each agent a subtask spreads agents apart",
    stat: "−0.15",
    statNote: "median shift from prompt to output similarity, MoRSE's (role, subtask) DAG",
    body: "A dependency-aware DAG of (role, subtask) nodes reverses the trend of role prompts. MoRSE's role and subtask experts then lower output similarity even further.",
    glyph: <SpreadGlyph />,
  },
  {
    eyebrow: "Finding 3 · the base model",
    title: "Roles and subtasks pull the base model in different directions",
    stat: "≈0.40",
    statNote: "extra rank-8 subspace divergence between two roles, over a shuffled baseline",
    body: "Subtask clusters diverge too (≈0.75 vs. ≈0.45 when labels are shuffled), so no single shared low-rank LoRA can provide all of these adaptations at once.",
    glyph: <SubspaceGlyph />,
  },
];

export default function Motivation() {
  return (
    <section className={`${styles.root} w-full my-6`} aria-label="Preliminary findings">
      <div className="grid gap-3 md:grid-cols-3">
        {FINDINGS.map((f) => (
          <div key={f.eyebrow} className={`${styles.card} flex flex-col p-5`}>
            <div className={styles.eyebrow}>{f.eyebrow}</div>
            <div className="my-3">{f.glyph}</div>
            <h3 className="text-[15px] font-semibold leading-snug">{f.title}</h3>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-[28px] font-semibold leading-none tracking-tight">{f.stat}</span>
              <span className={`${styles.muted} text-xs leading-snug`}>{f.statNote}</span>
            </div>
            <p className={`${styles.ink2} mt-3 text-sm leading-relaxed`}>{f.body}</p>
          </div>
        ))}
      </div>
      <p className={`${styles.muted} mt-3 text-xs`}>
        Both studies use SRDD with Qwen3-4B. Similarity is the mean pairwise cosine between agents&apos; prompts or
        outputs under a frozen text encoder; lower means less redundant.
      </p>
    </section>
  );
}
