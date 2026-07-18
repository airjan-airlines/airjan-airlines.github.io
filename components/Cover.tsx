"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { statsHighlights, profile } from "@/data/resume";

/**
 * The cover tears down the middle and the halves slide apart, splitting the
 * masthead into TIME | LESS.
 *
 * The word is rendered at full viewport width inside both panels, with the
 * right panel's copy offset by -50vw. The two halves line up across the seam
 * and read as one continuous word until the split.
 */
export default function Cover({ onOpen }: { onOpen: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showTeasers, setShowTeasers] = useState(false);
  const reduced = useReducedMotion();

  const open = useCallback(() => {
    setIsOpen((already) => {
      if (already) return true;
      // Let the split play out before unmounting.
      setTimeout(onOpen, reduced ? 0 : 900);
      return true;
    });
  }, [onOpen, reduced]);

  // Reduced motion: skip the full-screen split entirely.
  useEffect(() => {
    if (reduced) onOpen();
  }, [reduced, onOpen]);

  useEffect(() => {
    if (reduced) return;
    const teasers = setTimeout(() => setShowTeasers(true), 450);
    // Auto-advance is a fallback, not the primary path — any input beats it.
    const auto = setTimeout(open, 5200);
    return () => {
      clearTimeout(teasers);
      clearTimeout(auto);
    };
  }, [open, reduced]);

  // Any intent to proceed opens the issue.
  useEffect(() => {
    if (reduced) return;
    const onKey = (e: KeyboardEvent) => {
      if (["Enter", " ", "ArrowDown", "PageDown", "Escape"].includes(e.key)) {
        e.preventDefault();
        open();
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("wheel", open, { passive: true, once: true });
    window.addEventListener("touchmove", open, { passive: true, once: true });
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("wheel", open);
      window.removeEventListener("touchmove", open);
    };
  }, [open, reduced]);

  if (reduced) return null;

  const panel = {
    initial: { x: 0 },
    left: { x: "-101%", transition: { duration: 0.9, ease: [0.77, 0, 0.175, 1] as const } },
    right: { x: "101%", transition: { duration: 0.9, ease: [0.77, 0, 0.175, 1] as const } },
  };

  const masthead =
    "font-display font-bold text-accent leading-[0.82] tracking-[-0.03em] text-center text-[22vw] w-screen";

  return (
    <AnimatePresence>
      {!isOpen && (
        <div className="fixed inset-0 z-[100] flex overflow-hidden">
          {/* Left half — shows "TIME" */}
          <motion.div
            className="w-1/2 h-full bg-base relative overflow-hidden"
            variants={panel}
            initial="initial"
            animate="initial"
            exit="left"
          >
            <div className="absolute inset-y-0 left-0 w-screen">
              <Image
                src="/arjun_image.jpg"
                alt=""
                fill
                priority
                sizes="100vw"
                className="object-cover object-center grayscale contrast-[1.15] opacity-[0.55] mix-blend-multiply"
              />
            </div>
            <div className="absolute top-[16vh] left-0 w-screen">
              <h1 className={masthead} aria-label={`${profile.name}. Timeless`}>
                TIMELESS
              </h1>
            </div>
          </motion.div>

          {/* Right half — same content, shifted left by half a viewport */}
          <motion.div
            className="w-1/2 h-full bg-base relative overflow-hidden"
            variants={panel}
            initial="initial"
            animate="initial"
            exit="right"
          >
            <div className="absolute inset-y-0 left-[-50vw] w-screen">
              <Image
                src="/arjun_image.jpg"
                alt="Arjun Desikan"
                fill
                priority
                sizes="100vw"
                className="object-cover object-center grayscale contrast-[1.15] opacity-[0.55] mix-blend-multiply"
              />
            </div>
            <div className="absolute top-[16vh] left-[-50vw] w-screen">
              <p className={masthead} aria-hidden>
                TIMELESS
              </p>
            </div>

            <div className="absolute top-8 right-8 text-right z-20">
              <p className="label">{profile.issueLine}</p>
              <p className="label text-ink">{profile.issueName}</p>
            </div>

            {/* Cover lines typeset in sequentially */}
            <ul className="absolute right-8 md:right-12 top-[46vh] w-44 md:w-56 z-20 space-y-7">
              {statsHighlights.map((stat, i) => (
                <motion.li
                  key={stat}
                  initial={{ opacity: 0, y: 8 }}
                  animate={showTeasers ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    type: "spring",
                    duration: 0.6,
                    bounce: 0,
                    delay: i * 0.28,
                  }}
                  className="font-sans text-sm font-medium leading-snug bg-base/75 px-1"
                >
                  {stat}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* The affordance. Covers should invite opening, not just wait. */}
          <button
            type="button"
            onClick={open}
            className="absolute inset-0 z-30 flex items-end justify-center pb-10 cursor-pointer group"
            aria-label="Open the issue"
          >
            <motion.span
              className="label text-ink group-hover:text-accent transition-colors"
              initial={{ opacity: 0 }}
              animate={showTeasers ? { opacity: 1 } : {}}
              transition={{ delay: 1.1, duration: 0.6 }}
            >
              Open the issue
            </motion.span>
          </button>
        </div>
      )}
    </AnimatePresence>
  );
}
