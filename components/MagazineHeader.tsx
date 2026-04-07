"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MagazineHeader() {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(true);
  const pathname = usePathname();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 100) {
      setVisible(false); // scrolling down
    } else {
      setVisible(true); // scrolling up
    }
  });

  if (pathname === "/") return null; // Don't show on the cover page

  const sectionName = pathname.split('/')[1]?.toUpperCase() || 'DIRECTORY';

  return (
    <motion.header
      className="fixed top-6 left-8 right-8 z-[60] flex justify-between items-center bg-base/90 backdrop-blur-sm py-2 border-b border-ink/20"
      initial={{ y: -100 }}
      animate={{ y: visible ? 0 : -100 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex gap-4 items-center">
        <Link href="/" className="font-display font-bold text-xl hover:text-time-red transition-colors">TIME</Link>
        <span className="small-caps text-xs text-ink-light">Vol. 1 — 2026</span>
      </div>
      <div>
        <span className="small-caps text-xs font-bold">{sectionName}</span>
      </div>
    </motion.header>
  );
}
