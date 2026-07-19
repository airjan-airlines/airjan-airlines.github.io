"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
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
    /*
     * A feature opening spread. Section titles are single words, which is the
     * one case where the display scale can run all the way up without the
     * headline wrapping to three lines.
     *
     * The deck sits below the rule in an offset column rather than beside the
     * title. Parked in the top right of a section header it reads as a floating
     * corner paragraph aligned to nothing; below the rule it belongs to a grid.
     */
    <header className="mb-20 md:mb-32">
      {/*
        Sized in vw rather than from the shared --text-6xl ramp. That ramp has a
        3.8rem floor for the home masthead, which wraps happily; a single-word
        section title cannot wrap, so at 390px "Engineering" ran 368px into
        342px of space and pushed the page sideways. 11vw keeps the longest
        title inside the measure at every width.
      */}
      <h1 className="text-[clamp(2.5rem,11vw,9rem)] leading-[0.82] -ml-[0.06em]">
        {title}
      </h1>
      <div className="rule mt-8 md:mt-10" />
      <div className="grid grid-cols-1 md:grid-cols-12 gap-x-10">
        <p className="md:col-span-5 md:col-start-8 font-body italic text-lg text-ink-light mt-5">
          {deck}
        </p>
      </div>
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
 * A section opening on a full-bleed photograph, with the title set on it.
 *
 * The title sits on the picture rather than above it, which is how a feature
 * actually opens. Legibility comes from a gradient wash, not a panel behind the
 * words: a box reads as a caption pasted onto a photograph, a wash reads as
 * printing over one, and it only touches the end of the frame the type occupies.
 *
 * Negative margins cancel the page padding, horizontally so the picture runs to
 * the trim, and vertically so it meets the running header instead of floating
 * below it on a strip of bare paper.
 *
 * `tone` exists because not every photograph survives desaturation. Images that
 * carry their weight in structure go grayscale with the rest of the system;
 * images whose whole appeal is colour keep it, which ui.md explicitly allows.
 */
export function SectionCover({
  src,
  alt,
  title,
  deck,
  position = "50% 50%",
  tone = "mono",
  align = "top",
  ink = "ink",
}: {
  src: string;
  alt: string;
  title: string;
  deck: string;
  position?: string;
  tone?: "mono" | "colour";
  /** Which end of the frame the type sits in. Pick the quiet one. */
  align?: "top" | "bottom";
  /** Type colour, chosen against the tone of that end of the picture. */
  ink?: "ink" | "cream";
}) {
  const cream = ink === "cream";

  return (
    <figure className="-mx-6 md:-mx-14 lg:-mx-20 -mt-28 md:-mt-36 mb-20 md:mb-28 relative">
      <div className="relative w-full aspect-[4/5] sm:aspect-[16/10] lg:aspect-[21/9] overflow-hidden bg-ink/5">
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="100vw"
          className={
            tone === "mono"
              ? "object-cover grayscale contrast-[1.05]"
              : "object-cover saturate-[0.92]"
          }
          style={{ objectPosition: position }}
        />

        <div
          aria-hidden
          className={`absolute inset-x-0 h-2/3 ${
            align === "top" ? "top-0" : "bottom-0"
          } ${
            cream
              ? align === "top"
                ? "bg-gradient-to-b from-ink/70 via-ink/25 to-transparent"
                : "bg-gradient-to-t from-ink/75 via-ink/30 to-transparent"
              : align === "top"
                ? "bg-gradient-to-b from-base/80 via-base/35 to-transparent"
                : "bg-gradient-to-t from-base/85 via-base/40 to-transparent"
          }`}
        />

        <div
          className={`absolute inset-x-0 px-6 md:px-14 lg:px-20 ${
            align === "top" ? "top-0 pt-24 md:pt-32" : "bottom-0 pb-8 md:pb-12"
          }`}
        >
          <h1
            className={`text-[clamp(2.5rem,11vw,9rem)] leading-[0.82] -ml-[0.06em] ${
              cream ? "text-base" : "text-ink"
            }`}
          >
            {title}
          </h1>
          <p
            className={`font-body italic text-lg mt-4 measure-tight ${
              cream ? "text-base/85" : "text-ink-light"
            }`}
          >
            {deck}
          </p>
        </div>
      </div>
    </figure>
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
