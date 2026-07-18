"use client";

import { motion, useReducedMotion } from "framer-motion";
import React from "react";

/**
 * A page turning in from the spine.
 *
 * Triggered on enter at a scroll position, with a fixed duration, rather than
 * scrubbed to scroll progress. Scrubbing ties the animation to scroll speed, so
 * a slow scroll plays a slow, mushy turn; a position trigger always turns at
 * the same rate no matter how the visitor scrolls.
 *
 * The rotation is deliberately shallow (14deg, not 90). A literal 90deg page
 * flip is a vestibular trigger and would obscure the text mid-turn, which on a
 * page someone is trying to read is hostile.
 */
export default function PageTurn({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    // Perspective must sit on the parent; on the animated element itself it
    // flattens the rotation into a shear.
    <div className={className} style={{ perspective: "1400px" }}>
      <motion.div
        initial={{ opacity: 0, rotateY: -14, y: 12, filter: "blur(3px)" }}
        whileInView={{ opacity: 1, rotateY: 0, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-90px" }}
        transition={{ type: "spring", duration: 0.62, bounce: 0 }}
        style={{ transformOrigin: "left center", transformStyle: "preserve-3d" }}
      >
        {children}
      </motion.div>
    </div>
  );
}
