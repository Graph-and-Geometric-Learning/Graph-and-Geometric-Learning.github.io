// Numbers come from the arXiv version of the paper (2608.09251): Table 1
// (held-out test split), Table 2 (ablation), the OOD tables, and the
// router-utilization paragraph. Every value was cross-checked against the
// LaTeX source.
import raw from "../data/results.json";

export type BackboneKey = "qwen" | "llama" | "gemma";
export type MethodKey = "single" | "chatchain" | "macnet" | "aflow" | "morse";
type Row = number[];

export interface Metric {
  key: string;
  bench: "SRDD" | "SciCode";
  label: string;
  unit: string;
  digits: number;
  desc: string;
}
export interface Method {
  key: MethodKey;
  label: string;
  kind: "baseline" | "ours";
}
export interface Backbone {
  key: BackboneKey;
  label: string;
  full: string;
}

export const METRICS = raw.metrics as Metric[];
export const METHODS = raw.methods as Method[];
export const BACKBONES = raw.backbones as Backbone[];
/** Held-out test split, one six-metric row per method. */
export const MAIN = raw.main as unknown as Record<BackboneKey, Record<MethodKey, Row>>;
export const ABLATION = raw.ablation as unknown as Record<"qwen" | "llama", Record<string, Row>>;
/** Held-out categories; rows follow OOD_METRICS. */
export const OOD = raw.ood as unknown as Record<"qwen" | "llama", Record<string, Row>> & { metrics: string[] };
export const OOD_METRICS: number[] = raw.ood.metrics.map((k) => METRICS.findIndex((m) => m.key === k));
export const ROUTER = raw.router;

export const BASELINES: MethodKey[] = ["single", "chatchain", "macnet", "aflow"];

export function methodLabel(key: MethodKey): string {
  return METHODS.find((m) => m.key === key)?.label ?? key;
}

export function backboneLabel(key: BackboneKey): string {
  return BACKBONES.find((b) => b.key === key)?.label ?? key;
}

/** The strongest of the four baselines on one metric (first one wins a tie). */
export function strongestBaseline(bb: BackboneKey, i: number) {
  let best = { key: BASELINES[0], value: -Infinity };
  BASELINES.forEach((k) => {
    const v = MAIN[bb][k][i];
    if (v > best.value) best = { key: k, value: v };
  });
  return best;
}

export function fmt(v: number, digits: number): string {
  return v.toFixed(digits);
}

/** Signed relative change, e.g. "+32.7%". Uses a true minus sign. */
export function signedPct(x: number): string {
  const s = (Math.abs(x) * 100).toFixed(1);
  return `${x < 0 ? "−" : "+"}${s}%`;
}

/** Signed absolute change in the metric's own units, e.g. "+6.25". */
export function signedAbs(x: number, digits: number): string {
  const s = Math.abs(x).toFixed(digits);
  if (Number(s) === 0) return `±${s}`;
  return `${x < 0 ? "−" : "+"}${s}`;
}

/** Round an axis maximum up to 1, 2, 2.5, 5 or 10 times a power of ten. */
export function niceMax(v: number): number {
  if (v <= 0) return 1;
  const target = v * 1.04;
  const p = Math.pow(10, Math.floor(Math.log10(target)));
  const steps = [1, 2, 2.5, 5, 10];
  for (let i = 0; i < steps.length; i++) {
    if (steps[i] * p >= target) return steps[i] * p;
  }
  return 10 * p;
}
