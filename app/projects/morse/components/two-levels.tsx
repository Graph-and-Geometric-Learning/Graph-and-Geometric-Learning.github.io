"use client";

import React, { useState } from "react";
import styles from "./morse.module.css";
import { ROUTER } from "./data";

type NodeId = 1 | 2 | 3 | 4;

interface DagNode {
  id: NodeId;
  x: number;
  y: number;
  subtask: string;
  parents: NodeId[];
  /** Subtask experts (1-4) picked by the router for this node's Executor. Illustrative. */
  routed: number[];
}

// An illustrative coding task. Expert 4 plays the shared generalist and the second
// slot switches with the subtask, which is the pattern the trained router shows.
const NODES: DagNode[] = [
  { id: 1, x: 180, y: 46, subtask: "Implement parser", parents: [], routed: [2, 4] },
  { id: 2, x: 92, y: 150, subtask: "Write tests", parents: [1], routed: [1, 4] },
  { id: 3, x: 268, y: 150, subtask: "Build evaluator", parents: [1], routed: [2, 4] },
  { id: 4, x: 180, y: 254, subtask: "Refine solution", parents: [2, 3], routed: [3, 4] },
];
const EXPERTS = [1, 2, 3, 4];
const W = 160;
const H = 54;

function nodeById(id: NodeId): DagNode {
  return NODES.find((n) => n.id === id)!;
}

/** Subtask experts a join-node Merger inherits: the union over its parents' Executors. */
function inherited(n: DagNode): number[] {
  if (n.parents.length < 2) return [];
  return EXPERTS.filter((k) => n.parents.some((p) => nodeById(p).routed.indexOf(k) >= 0));
}

function ExpertChip({
  label,
  kind,
  active,
  dashed = false,
}: {
  label: string;
  kind: "role" | "subtask";
  active: boolean;
  dashed?: boolean;
}) {
  const color = kind === "role" ? "var(--m-accent)" : "var(--m-sub)";
  const wash = kind === "role" ? "var(--m-accent-wash)" : "var(--m-sub-wash)";
  return (
    <span
      className={`${active ? styles.ink : styles.muted} inline-flex items-center gap-1.5 rounded-lg px-2 py-[3px] text-xs font-medium transition-colors duration-200`}
      style={{
        background: active ? wash : "transparent",
        border: `1.5px ${dashed ? "dashed" : "solid"} ${active ? color : "var(--m-border)"}`,
      }}
    >
      <span
        aria-hidden
        className="h-[7px] w-[7px] rounded-full"
        style={{ background: active ? color : "var(--m-border)" }}
      />
      {label}
    </span>
  );
}

function CallRow({
  title,
  pair,
  role,
  experts,
  dashed,
  note,
  empty,
}: {
  title: string;
  pair: string;
  role: string;
  experts: number[];
  dashed?: boolean;
  note: string;
  empty?: boolean;
}) {
  return (
    <div className={`${styles.panel} p-3`}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-3">
        <span className="text-xs font-semibold">{title}</span>
        <span className={`${styles.muted} text-xs`}>{pair}</span>
      </div>
      {empty ? (
        <div className={`${styles.muted} mt-2 text-xs`}>{note}</div>
      ) : (
        <>
          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            <ExpertChip label={role} kind="role" active />
            <span className={`${styles.muted} px-0.5 text-xs`}>+</span>
            {EXPERTS.map((k) => (
              <ExpertChip key={k} label={`E${k}`} kind="subtask" active={experts.indexOf(k) >= 0} dashed={dashed} />
            ))}
          </div>
          <div className={`${styles.muted} mt-2 text-xs`}>{note}</div>
        </>
      )}
    </div>
  );
}

function Dag({ selected, onSelect }: { selected: NodeId; onSelect: (id: NodeId) => void }) {
  return (
    <svg viewBox="0 0 360 286" className="h-auto w-full" role="group" aria-label="Example task DAG; select a node">
      <defs>
        {(["idle", "active"] as const).map((m) => (
          <marker key={m} id={`morse-arrow-${m}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,1 L9,5 L0,9 z" style={{ fill: m === "active" ? "var(--m-accent)" : "var(--m-muted)" }} />
          </marker>
        ))}
      </defs>
      {NODES.flatMap((child) =>
        child.parents.map((pid) => {
          const p = nodeById(pid);
          const active = child.id === selected;
          const x1 = p.x;
          const y1 = p.y + H / 2;
          const x2 = child.x;
          const y2 = child.y - H / 2 - 2;
          return (
            <path
              key={`${pid}-${child.id}`}
              d={`M${x1} ${y1} C ${x1} ${y1 + 34}, ${x2} ${y2 - 34}, ${x2} ${y2}`}
              fill="none"
              strokeWidth={active ? 2 : 1.25}
              markerEnd={`url(#morse-arrow-${active ? "active" : "idle"})`}
              style={{ stroke: active ? "var(--m-accent)" : "var(--m-muted)", opacity: active ? 1 : 0.55, transition: "all 200ms ease" }}
            />
          );
        }),
      )}
      {NODES.map((n) => {
        const active = n.id === selected;
        return (
          <g
            key={n.id}
            role="button"
            tabIndex={0}
            aria-pressed={active}
            aria-label={`Node ${n.id}: ${n.subtask}`}
            className={styles.focusable}
            style={{ cursor: "pointer", outline: "none" }}
            onClick={() => onSelect(n.id)}
            onMouseEnter={() => onSelect(n.id)}
            onFocus={() => onSelect(n.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelect(n.id);
              }
            }}
          >
            <rect
              x={n.x - W / 2}
              y={n.y - H / 2}
              width={W}
              height={H}
              rx={12}
              strokeWidth={active ? 2 : 1.25}
              style={{
                fill: active ? "var(--m-accent-wash)" : "var(--m-card)",
                stroke: active ? "var(--m-accent)" : "var(--m-border)",
                transition: "all 200ms ease",
              }}
            />
            <circle
              cx={n.x - W / 2 + 22}
              cy={n.y}
              r={11}
              style={{ fill: active ? "var(--m-accent)" : "var(--m-panel)", stroke: active ? "var(--m-accent)" : "var(--m-border)" }}
            />
            <text
              x={n.x - W / 2 + 22}
              y={n.y + 4}
              textAnchor="middle"
              fontSize={11}
              fontWeight={600}
              style={{ fill: active ? "#ffffff" : "var(--m-ink-2)" }}
            >
              {n.id}
            </text>
            <text x={n.x - W / 2 + 41} y={n.y - 3} fontSize={12} fontWeight={600} style={{ fill: "var(--m-ink)" }}>
              {n.subtask}
            </text>
            <text x={n.x - W / 2 + 41} y={n.y + 13} fontSize={10} style={{ fill: "var(--m-muted)" }}>
              Merger → Executor
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function RouterUsage() {
  return (
    <div className={`${styles.panel} p-4`}>
      <div className="flex flex-wrap items-baseline gap-x-3">
        <span className="text-sm font-semibold">What the trained router does</span>
        <span className={`${styles.muted} text-xs`}>measured · Qwen3-4B · SRDD test</span>
      </div>
      <p className={`${styles.ink2} mt-2 text-sm leading-relaxed`}>
        {`E4 acts as a shared generalist and joins every subtask, while the second slot switches with the subtask. Every expert enters the top 2 for some subtasks, and the realized top-2 utilization entropy is ${ROUTER.top2Entropy.toFixed(3)} nats, well above the ${Math.LN2.toFixed(3)} of a fixed pair, so the router does not collapse to a nearly fixed route.`}
      </p>
    </div>
  );
}

export default function TwoLevels() {
  const [selected, setSelected] = useState<NodeId>(4);
  const node = nodeById(selected);
  const merged = inherited(node);
  const pair = (role: string) => `(${role}, “${node.subtask}”)`;

  return (
    <section className={`${styles.root} ${styles.card} w-full my-6 p-4 sm:p-6`} aria-label="Two levels of specialization">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <div className="flex items-center gap-2">
            <span aria-hidden className="h-2 w-2 rounded-full" style={{ background: "var(--m-accent)" }} />
            <span className="text-sm font-semibold">Level 1 · Task structure</span>
            <span className={styles.label}>ToMAS</span>
          </div>
          <p className={`${styles.ink2} mt-2 text-sm leading-relaxed`}>
            A planner turns the task into a dependency-aware DAG. At every node a Merger combines the upstream outputs and
            an Executor solves the subtask; a rule-based verifier checks each output before it moves downstream.
          </p>
          <div className={`${styles.muted} mt-3 flex flex-wrap items-center gap-2 text-xs`}>
            <span className={`${styles.panel} px-2 py-1`}>Task: build a small coding project</span>
            <span aria-hidden>→</span>
            <span className={`${styles.panel} px-2 py-1`}>Planner</span>
            <span aria-hidden>→</span>
            <span>per-instance DAG</span>
          </div>
          <div className="mt-2">
            <Dag selected={selected} onSelect={setSelected} />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span aria-hidden className="h-2 w-2 rounded-full" style={{ background: "var(--m-sub)" }} />
              <span className="text-sm font-semibold">Level 2 · Parameters</span>
              <span className={styles.label}>MoLE</span>
            </div>
            <p className={`${styles.ink2} mt-2 text-sm leading-relaxed`}>
              Every call runs the shared, frozen backbone plus one role expert and the subtask experts that a prototype-based
              router picks from the subtask description.
            </p>
          </div>

          <div className="text-sm font-semibold">{`Node ${node.id} · ${node.subtask}`}</div>

          <CallRow
            title="Executor call"
            pair={pair("execute")}
            role="execute"
            experts={node.routed}
            note="Role expert for execute, plus the top-2 subtask experts from the router."
          />
          {merged.length > 0 ? (
            <CallRow
              title="Merger call"
              pair={pair("merge")}
              role="merge"
              experts={merged}
              dashed
              note={`Join node: the Merger inherits the subtask experts of nodes ${node.parents.join(" and ")}, the ones that produced its inputs.`}
            />
          ) : (
            <CallRow
              title="Merger call"
              pair={pair("merge")}
              role="merge"
              experts={[]}
              empty
              note={node.parents.length === 1 ? `Single parent: node ${node.parents[0]}'s output passes straight through.` : "First node: there is no upstream output to merge."}
            />
          )}

          <div className={`${styles.panel} p-3`}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-3">
              <span className="text-xs font-semibold">Shared frozen backbone</span>
              <span className={`${styles.muted} text-xs`}>LoRA on q, v, o in the last 8 blocks · ρ = 8 · α = 16</span>
            </div>
            <div className={`${styles.ink} mt-2 font-serif text-[15px]`}>
              <i>W</i>
              <sup>(<i>i</i>)</sup> = <i>W</i> + <span className="text-[13px]">1/|ℰ<sub><i>i</i></sub>|</span>{" "}
              Σ<sub><i>k</i>∈ℰ<sub><i>i</i></sub></sub> (<i>α</i>/<i>ρ</i>) <i>B</i>
              <sub><i>k</i></sub>
              <i>A</i>
              <sub><i>k</i></sub>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {[
                ["3", "experts active per call"],
                ["3.24M / 6.49M", "LoRA params active / total (Qwen3-4B)"],
                ["0.170%", "of Qwen3-4B is trainable"],
              ].map(([v, l]) => (
                <div key={l}>
                  <div className="text-[15px] font-semibold leading-tight">{v}</div>
                  <div className={`${styles.muted} mt-0.5 text-[11px] leading-snug`}>{l}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
      <div className="mt-6">
        <RouterUsage />
      </div>
      <p className={`${styles.muted} mt-4 text-xs`}>
        Hover or select a node. The DAG and its per-node expert choices are an illustrative example; the router statistics
        are measured on the trained model.
      </p>
    </section>
  );
}
