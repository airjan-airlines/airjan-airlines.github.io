"use client";

import { useState, useEffect } from "react";
import Cover from "@/components/Cover";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  const [coverOpened, setCoverOpened] = useState<boolean>(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (sessionStorage.getItem("hasSeenCover") === "true") {
      setCoverOpened(true);
    }
  }, []);

  return (
    <>
      {(!isClient || !coverOpened) && (
        <Cover onOpen={() => {
          sessionStorage.setItem("hasSeenCover", "true");
          setCoverOpened(true);
        }} />
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: coverOpened ? 1 : 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto pt-24"
        style={{ pointerEvents: coverOpened ? "auto" : "none" }}
      >
        {/* Masthead Interior */}
        <div className="border-b-2 border-time-red pb-4 mb-12 flex justify-between items-end">
          <h1 className="text-5xl md:text-8xl tracking-tight leading-none uppercase">Arjun Desikan</h1>
          <p className="small-caps text-sm mb-2 text-ink-light">The Builder Edition</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-8">
            <h2 className="text-3xl md:text-5xl mb-6">I build for the communities I'm actually part of.</h2>
            <p className="text-lg md:text-xl font-body leading-relaxed mb-8 drop-cap">
              Founder, data scientist, engineer.
              The domains change: epidemiology, education, genomics.
              The approach doesn't: find the problem, build the solution, ship it to real people.
            </p>

            <div className="editorial-rule"></div>

            <h3 className="small-caps text-xl mb-4 font-bold">Featured Selections</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <Link href="/technical" className="group block">
                <h4 className="text-2xl mb-2 group-hover:-translate-y-1 transition-transform duration-300">Technical Work</h4>
                <p className="text-sm border-l-2 border-time-red pl-4 text-ink-light">
                  Machine learning, data science, and AI engineering applied to full-stack.
                </p>
              </Link>
              <Link href="/experience" className="group block">
                <h4 className="text-2xl mb-2 group-hover:-translate-y-1 transition-transform duration-300">Professional Experience</h4>
                <p className="text-sm border-l-2 border-time-red pl-4 text-ink-light">
                  Data science, research, and AI engineering roles.
                </p>
              </Link>
              <Link href="/nontechnical" className="group block">
                <h4 className="text-2xl mb-2 group-hover:-translate-y-1 transition-transform duration-300">Leadership</h4>
                <p className="text-sm border-l-2 border-time-red pl-4 text-ink-light">
                  Organizational roles and non-technical pursuits.
                </p>
              </Link>
              <Link href="/blog" className="group block">
                <h4 className="text-2xl mb-2 group-hover:-translate-y-1 transition-transform duration-300">Essays</h4>
                <p className="text-sm border-l-2 border-time-red pl-4 text-ink-light">
                  Long-form thoughts as a passion.
                </p>
              </Link>
            </div>
          </div>

          <div className="md:col-span-4 pl-0 md:pl-8 md:border-l border-ink/20">
            <h3 className="small-caps text-xl mb-4 font-bold">Directory</h3>
            <ul className="space-y-4">
              <li><Link href="/technical" className="hover:text-time-red transition-colors text-lg">I. Technical Work</Link></li>
              <li><Link href="/experience" className="hover:text-time-red transition-colors text-lg">II. Professional Experience</Link></li>
              <li><Link href="/nontechnical" className="hover:text-time-red transition-colors text-lg">III. Leadership</Link></li>
              <li><Link href="/blog" className="hover:text-time-red transition-colors text-lg">IV. Essays & Blog</Link></li>
              <li><Link href="/interests" className="hover:text-time-red transition-colors text-lg">V. Personal Interests</Link></li>
            </ul>

            <div className="editorial-rule-thin"></div>

            <h3 className="small-caps text-sm mb-2 text-time-red font-bold">Status: Now</h3>
            <p className="text-sm text-ink-light font-body italic mb-6">
              Prototyping skateboarding video analysis pipeline and wrapping up AP exams.
            </p>

            <h3 className="small-caps text-sm mb-2 text-time-red font-bold">Open To</h3>
            <p className="text-sm text-ink-light font-body">
              Interested in co-founder opportunities and internships or research positions across MLE, DS, and AI engineering.
            </p>
          </div>
        </div>
      </motion.div>
    </>
  );
}
