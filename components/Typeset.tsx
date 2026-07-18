"use client";

import { motion, useReducedMotion } from "framer-motion";
import React from "react";

/**
 * Text that sets itself in real time, per planning_docs/ui.md.
 *
 * Two decisions worth stating, because the obvious implementation is worse:
 *
 * 1. Characters are rendered up front and revealed by opacity, rather than
 *    appended one at a time. Appending reflows the paragraph on every keystroke
 *    and shifts everything below it. Revealing costs one paint and no layout.
 *
 * 2. No blinking caret. A caret reads as a terminal, and ui.md is explicit that
 *    this is not a dev portfolio that looks like a terminal. Without it the
 *    effect reads as type being set, which is the actual reference.
 *
 * The real string is exposed to assistive tech via aria-label; the split spans
 * are hidden from it, so screen readers get one clean sentence.
 */

type Granularity = "char" | "word";

export default function Typeset({
  text,
  play,
  granularity = "char",
  stagger,
  delay = 0,
  className,
  as: Tag = "p",
}: {
  text: string;
  /** Only true on first load. Repeat views render instantly. */
  play: boolean;
  granularity?: Granularity;
  stagger?: number;
  delay?: number;
  className?: string;
  as?: "p" | "h1" | "h2";
}) {
  const reduced = useReducedMotion();

  if (reduced || !play) {
    return <Tag className={className}>{text}</Tag>;
  }

  // Per-character on short display lines; per-word on running copy, where
  // per-character would take several seconds to finish and nobody waits.
  const step = stagger ?? (granularity === "char" ? 0.016 : 0.022);
  const words = text.split(" ");
  let index = 0;

  return (
    <Tag className={className} aria-label={text}>
      <span aria-hidden>
        {words.map((word, w) => {
          const units = granularity === "char" ? Array.from(word) : [word];
          const node = (
            // Words stay whole so the reveal never breaks mid-word at a wrap.
            <span key={w} className="inline-block whitespace-pre">
              {units.map((unit, u) => {
                const at = delay + index * step;
                index += 1;
                return (
                  <motion.span
                    key={u}
                    className="inline-block whitespace-pre"
                    initial={{ opacity: 0, filter: "blur(4px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{
                      duration: 0.34,
                      ease: [0.22, 1, 0.36, 1],
                      delay: at,
                    }}
                  >
                    {unit}
                  </motion.span>
                );
              })}
            </span>
          );
          return (
            <React.Fragment key={w}>
              {node}
              {w < words.length - 1 ? " " : null}
            </React.Fragment>
          );
        })}
      </span>
    </Tag>
  );
}
