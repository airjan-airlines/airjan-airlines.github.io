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

/**
 * The masthead is SVG rather than styled text because a vw font-size cannot
 * know how wide eight Bodoni capitals actually are: at any size that filled a
 * narrow screen it overflowed a wide one. Here `textLength` forces the word to
 * span the viewBox exactly, so it fits by construction at every width, and
 * `lengthAdjust="spacing"` absorbs the difference in letter-spacing rather than
 * stretching the glyphs, which would wreck Bodoni's thick-thin contrast.
 */
function Masthead() {
  return (
    <svg
      viewBox="0 0 1000 140"
      className="block w-screen"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <text
        x="500"
        y="112"
        textAnchor="middle"
        textLength="964"
        lengthAdjust="spacing"
        className="fill-accent"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: "128px",
        }}
      >
        TIMELESS
      </text>
    </svg>
  );
}

/**
 * The portrait is a 3:4 frame with the subject small and centred, sky across
 * the top third and water across the bottom. A wide viewport crops to the
 * middle band, which is precisely where he is, so `object-center` guarantees a
 * collision with anything set over it.
 *
 * Biasing the crop upward keeps the sky in frame for the masthead and drops the
 * figure into the lower middle, which is how a cover is actually composed:
 * logo in the empty sky, subject below it, cover lines down the margins.
 */
const PHOTO_POSITION = "50% 22%";

export default function Cover({ onOpen }: { onOpen: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showTeasers, setShowTeasers] = useState(false);
  const reduced = useReducedMotion();

  const open = useCallback(() => {
    setIsOpen((already) => {
      if (already) return true;
      setTimeout(onOpen, reduced ? 0 : 900);
      return true;
    });
  }, [onOpen, reduced]);

  useEffect(() => {
    if (reduced) onOpen();
  }, [reduced, onOpen]);

  useEffect(() => {
    if (reduced) return;
    const teasers = setTimeout(() => setShowTeasers(true), 450);
    const auto = setTimeout(open, 5200);
    return () => {
      clearTimeout(teasers);
      clearTimeout(auto);
    };
  }, [open, reduced]);

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
    left: {
      x: "-101%",
      transition: { duration: 0.9, ease: [0.77, 0, 0.175, 1] as const },
    },
    right: {
      x: "101%",
      transition: { duration: 0.9, ease: [0.77, 0, 0.175, 1] as const },
    },
  };

  const photo =
    "object-cover grayscale contrast-[1.1] opacity-[0.88] mix-blend-multiply";

  return (
    <AnimatePresence>
      {!isOpen && (
        <div className="fixed inset-0 z-[100] flex overflow-hidden">
          {/* Left half, showing "TIME" */}
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
                className={photo}
                style={{ objectPosition: PHOTO_POSITION }}
              />
            </div>

            <div className="absolute top-[5vh] left-0 w-screen">
              <Masthead />
            </div>

            {/* Cover lines run down the left margin, clear of the centred
                figure, over the quiet water at the bottom of the frame. */}
            <ul className="absolute left-6 md:left-10 bottom-[12vh] w-44 md:w-56 z-20 space-y-6">
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
                  className="font-sans text-sm font-medium leading-snug bg-base/80 px-1.5 py-0.5"
                >
                  {stat}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Right half: same content, shifted left by half a viewport */}
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
                alt={`${profile.name} on a bridge`}
                fill
                priority
                sizes="100vw"
                className={photo}
                style={{ objectPosition: PHOTO_POSITION }}
              />
            </div>

            <div className="absolute top-[5vh] left-[-50vw] w-screen">
              <Masthead />
            </div>

            <div className="absolute bottom-[12vh] right-6 md:right-10 text-right z-20">
              <p className="label bg-base/80 px-1.5">{profile.issueLine}</p>
              <p className="label text-ink bg-base/80 px-1.5">
                {profile.issueName}
              </p>
            </div>
          </motion.div>

          <button
            type="button"
            onClick={open}
            className="absolute inset-0 z-30 flex items-end justify-center pb-8 cursor-pointer group"
            aria-label="Open the issue"
          >
            <motion.span
              className="label text-ink bg-base/80 px-2 py-1 group-hover:text-accent transition-colors"
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
