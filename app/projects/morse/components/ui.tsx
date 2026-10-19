import React from "react";
import styles from "./morse.module.css";

export function Segmented<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <div className={styles.seg} role="group" aria-label={label}>
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          className={styles.segBtn}
          aria-pressed={o.value === value}
          onClick={() => onChange(o.value)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function Chip({ tone, children }: { tone: "up" | "down" | "flat"; children: React.ReactNode }) {
  const toneClass = tone === "up" ? styles.chipUp : tone === "down" ? styles.chipDown : styles.chipFlat;
  return <span className={`${styles.chip} ${toneClass}`}>{children}</span>;
}

/** Legend swatch: a small rounded rectangle in a data color. */
export function Swatch({ color, dashed = false }: { color: string; dashed?: boolean }) {
  return (
    <span
      aria-hidden
      className="inline-block h-[10px] w-[14px] rounded-[3px]"
      style={dashed ? { border: `1.5px dashed ${color}` } : { background: color }}
    />
  );
}
