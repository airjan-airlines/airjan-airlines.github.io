"use client";

import { motion, useReducedMotion } from "framer-motion";
import React from "react";

/** Page shell. The 12-column grid lives here so pages don't re-declare it. */
export function Shell({ children }: { children: React.ReactNode }) {
  return <div className="max-w-[1440px] mx-auto">{children}</div>;
}

/**
 * Section opener, per planning_docs/ui.md: large title, editorial descriptor,
 * a thin rule, then content below.
 */
export function SectionOpener({
  title,
  deck,
}: {
  title: string;
  deck: string;
}) {
  return (
    <header className="mb-16 md:mb-24">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-y-4 gap-x-8 items-end">
        <div className="md:col-span-8">
          <h1 className="text-5xl">{title}</h1>
        </div>
        <p className="md:col-span-4 font-body italic text-lg text-ink-light measure-tight md:pb-2">
          {deck}
        </p>
      </div>
      <div className="rule mt-8" />
    </header>
  );
}

/**
 * Staggered entry on scroll. Translation is small and the easing is a settled
 * spring — the motion should register as "typeset", not "animated".
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ type: "spring", duration: 0.55, bounce: 0, delay }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Resume bullets. Real list markers in the accent colour, rather than a dash
 * glyph faked with a span.
 */
export function Bullets({ items }: { items: readonly string[] }) {
  return (
    <ul className="space-y-3 measure list-disc pl-5 marker:text-accent">
      {items.map((item) => (
        <li
          key={item}
          className="font-body text-base leading-relaxed text-ink-light pl-1"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

/** Tech stack, set as tracked metadata rather than pill badges. */
export function StackList({ items }: { items: readonly string[] }) {
  return (
    <p className="label mt-6 text-ink-faint leading-relaxed">
      {items.join(", ")}
    </p>
  );
}

/** Figures that need to align in a row. Tabular numerals, no invented data. */
export function StatRow({
  stats,
}: {
  stats: { value: string; label: string }[];
}) {
  return (
    <dl className="flex flex-wrap gap-x-12 gap-y-5 mt-8 pt-5 border-t border-rule-faint">
      {stats.map((stat) => (
        <div key={stat.label}>
          <dd className="font-display text-3xl tabular leading-none">
            {stat.value}
          </dd>
          <dt className="label mt-2">{stat.label}</dt>
        </div>
      ))}
    </dl>
  );
}

/**
 * Advances to the next entry. This is real navigation on a long page, not a
 * decorative control: it gives the visitor a way through the section and it
 * triggers the same page turn that scrolling does.
 *
 * Uses an anchor rather than a scroll handler so it works without JS, is
 * focusable and keyboard-operable for free, and honours the reduced-motion
 * override on `scroll-behavior`.
 */
export function NextEntry({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <a href={href} className="group/next mt-10 inline-flex items-baseline gap-3">
      <span className="label group-hover/next:text-accent transition-colors duration-200">
        Next
      </span>
      <span className="font-body italic text-ink-light group-hover/next:text-accent transition-colors duration-200">
        {label}
      </span>
    </a>
  );
}

/** Pull quote — the one place display type spans the measure. */
export function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="my-10 pl-6 border-l-2 border-accent">
      <p className="font-display text-2xl leading-tight measure">{children}</p>
    </blockquote>
  );
}
