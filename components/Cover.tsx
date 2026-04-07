"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { statsHighlights } from "@/data/resume";
import Image from "next/image";

export default function Cover({ onOpen }: { onOpen: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showTeasers, setShowTeasers] = useState(false);

  useEffect(() => {
    const teaserTimeout = setTimeout(() => setShowTeasers(true), 500);
    const openTimeout = setTimeout(() => {
      setIsOpen(true);
      setTimeout(onOpen, 1000); // Trigger the unmount of this full-page cover
    }, 3500); // Wait 3.5s before opening

    return () => {
      clearTimeout(teaserTimeout);
      clearTimeout(openTimeout);
    };
  }, [onOpen]);

  const panelVariants = {
    initial: { x: 0 },
    openedLeft: { x: "-100%", transition: { duration: 1, ease: "easeInOut" as const } },
    openedRight: { x: "100%", transition: { duration: 1, ease: "easeInOut" as const } }
  };

  return (
    <AnimatePresence>
      {!isOpen && (
        <div className="fixed inset-0 z-[100] flex overflow-hidden pointer-events-none">
          {/* Left Panel */}
          <motion.div
            className="w-1/2 h-full bg-base border-r border-time-red/30 relative overflow-hidden"
            variants={panelVariants}
            initial="initial"
            animate="initial"
            exit="openedLeft"
          >
            <div className="absolute top-0 left-0 w-[200%] h-full z-0">
              <Image src="/arjun_image.jpg" alt="Cover Image" fill priority className="object-cover object-center grayscale contrast-125 opacity-70 mix-blend-multiply" />
            </div>

            {/* The Masthead - Left half (we fake the clipping by making the container 50% width and overflowing it relative to a wider absolutely positioned inner) */}
            <div className="absolute top-8 left-8 right-[-100%] z-10">
              <h1 className="text-8xl md:text-[12rem] tracking-tighter text-time-red leading-none pb-4 inline-block relative">
                TIME
                <div className="absolute bottom-0 left-0 w-full editorial-rule-red mt-0 mb-0"></div>
              </h1>
            </div>
          </motion.div>

          {/* Right Panel */}
          <motion.div
            className="w-1/2 h-full bg-base border-l border-time-red/30 relative overflow-hidden"
            variants={panelVariants}
            initial="initial"
            animate="initial"
            exit="openedRight"
          >
            <div className="absolute top-0 left-[-100%] w-[200%] h-full z-0">
              <Image src="/arjun_image.jpg" alt="Cover Image" fill priority className="object-cover object-center grayscale contrast-125 opacity-70 mix-blend-multiply" />
            </div>

            <div className="absolute top-8 left-[-100%] right-8 z-10">
              <h1 className="text-8xl md:text-[12rem] tracking-tighter text-time-red leading-none pb-4 inline-block relative ml-8">
                LESS
                <div className="absolute bottom-0 left-0 w-full editorial-rule-red mt-0 mb-0"></div>
              </h1>
            </div>

            <div className="absolute top-8 right-8 z-10">
              <p className="small-caps text-xs text-ink-light">Vol. 1 — 2026</p>
              <p className="small-caps text-xs text-ink-light font-bold">The Builder Issue</p>
            </div>

            {/* Cover Lines right side */}
            <div className="absolute right-8 top-1/4 w-48 z-20">
              {statsHighlights.map((stat: string, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: showTeasers ? 1 : 0, y: showTeasers ? 0 : 10 }}
                  transition={{ delay: idx * 0.4, duration: 0.8 }}
                  className="mb-8"
                >
                  <p className="text-sm font-bold font-sans tracking-tight text-ink bg-base/80 p-1">
                    {stat}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
