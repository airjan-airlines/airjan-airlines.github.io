"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems, sectionNameFor } from "./nav";
import { profile } from "@/data/resume";

export default function MagazineHeader() {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(true);
  const pathname = usePathname();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    // Only hide well past the fold, so the header doesn't flicker at the top.
    setVisible(!(latest > previous && latest > 140));
  });

  // The cover is its own world; no running header over it.
  if (pathname === "/") return null;

  const section = sectionNameFor(pathname);

  return (
    <motion.header
      className="fixed top-4 left-6 right-6 md:top-7 md:left-14 md:right-14 z-50"
      initial={{ y: 0, opacity: 1 }}
      animate={{ y: visible ? 0 : -80, opacity: visible ? 1 : 0 }}
      // Spring, not ease-in-out. Bounce 0 — this is chrome, not a delighter.
      transition={{ type: "spring", duration: 0.4, bounce: 0 }}
    >
      <div className="bg-base/95 backdrop-blur-[3px] px-2 -mx-2 pb-2 pt-1 border-b border-rule flex items-baseline justify-between gap-6">
        <div className="flex items-baseline gap-4 min-w-0">
          <Link
            href="/"
            className="font-display font-bold text-xl leading-none link-rule shrink-0"
            aria-label={`${profile.name}, cover`}
          >
            TIME
          </Link>
          <span className="label hidden sm:inline shrink-0">
            {profile.issueLine}
          </span>
        </div>

        <nav aria-label="Sections" className="flex items-baseline gap-5 md:gap-7">
          {navItems.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`label transition-colors duration-200 hover:text-accent ${
                  active ? "text-accent" : ""
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <span className="label hidden lg:inline text-ink shrink-0">
          {section}
        </span>
      </div>
    </motion.header>
  );
}
