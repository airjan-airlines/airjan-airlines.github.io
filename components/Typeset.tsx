"use client";

import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useReducedMotion,
  animate,
} from "framer-motion";
import { useEffect } from "react";
import React from "react";

/**
 * Text that sets itself in real time, per planning_docs/ui.md.
 *
 * This used to split the string into per-character inline-block spans. That is
 * the usual way to do it and it is why the copy stacked vertically before
 * snapping back: once every character is its own inline-block, the element's
 * min-content width collapses to the width of one letter, so any parent that
 * can shrink to fit (the masthead is a flex item) lays the characters out one
 * per line until fonts and flex sizing settle, then reflows.
 *
 * So nothing is split any more. The text stays a single ordinary text node and
 * a gradient mask sweeps across it. Layout is byte-for-byte identical to static
 * text at every frame, which makes the reflow impossible rather than merely
 * unlikely, and it works at any length without a per-character delay budget.
 */
export default function Typeset({
  text,
  play,
  duration = 1.1,
  delay = 0,
  className,
  as: Tag = "p",
}: {
  text: string;
  /** Only true on first load. Repeat views render instantly. */
  play: boolean;
  duration?: number;
  delay?: number;
  className?: string;
  as?: "p" | "h1" | "h2";
}) {
  const reduced = useReducedMotion();
  const progress = useMotionValue(play && !reduced ? 0 : 120);

  // The soft trailing edge is what reads as ink arriving rather than a wipe.
  const mask = useMotionTemplate`linear-gradient(90deg, #000 0%, #000 ${progress}%, transparent calc(${progress}% + 9%))`;

  useEffect(() => {
    if (!play || reduced) {
      progress.set(120);
      return;
    }
    const controls = animate(progress, 120, {
      duration,
      delay,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [play, reduced, duration, delay, progress]);

  if (reduced || !play) {
    return <Tag className={className}>{text}</Tag>;
  }

  const MotionTag = motion[Tag];

  return (
    <MotionTag
      className={className}
      style={{ WebkitMaskImage: mask, maskImage: mask }}
    >
      {text}
    </MotionTag>
  );
}
