"use client";

import { motion, useReducedMotion } from "framer-motion";
import React from "react";

/**
 * Page-turn: a short horizontal slide. Fast (per planning_docs/ui.md, 200–300ms)
 * so navigation never feels like it's waiting on the animation.
 */
export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className="max-w-[1440px] mx-auto">{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", duration: 0.4, bounce: 0 }}
      className="max-w-[1440px] mx-auto"
    >
      {children}
    </motion.div>
  );
}
