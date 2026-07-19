"use client";

import { useState, useSyncExternalStore } from "react";
import Cover from "@/components/Cover";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { navItems } from "@/components/nav";
import Typeset from "@/components/Typeset";
import {
  profile,
  thesis,
  standfirst,
  appointments,
  projects,
} from "@/data/resume";

/** Server renders nothing cover-related; the client takes over after hydration. */
const noopSubscribe = () => () => {};

export default function Home() {
  const isClient = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
  const [dismissed, setDismissed] = useState(false);
  // The cover is a first-impression moment, not a toll booth on every visit.
  // Read once during render — the gate above keeps this off the server pass.
  const [alreadySeen] = useState(
    () =>
      typeof window !== "undefined" &&
      window.sessionStorage.getItem("hasSeenCover") === "true",
  );
  const coverOpened = dismissed || alreadySeen;
  const reduced = useReducedMotion();

  const lead = appointments[0];
  const leadProject = projects[0];

  return (
    <>
      {isClient && !coverOpened && (
        <Cover
          onOpen={() => {
            window.sessionStorage.setItem("hasSeenCover", "true");
            setDismissed(true);
          }}
        />
      )}

      <motion.div
        initial={false}
        animate={{ opacity: coverOpened || reduced ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-[1440px] mx-auto"
      >
        {/* Interior masthead */}
        <div className="border-b-2 border-accent pb-5 mb-14 flex flex-wrap items-end justify-between gap-4">
          <Typeset
            as="h1"
            text={profile.name}
            play={dismissed}
            className="text-6xl uppercase leading-[0.85]"
          />
          <p className="label pb-1">
            {profile.issueLine} · {profile.issueName}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-16 gap-x-10">
          {/* --- Lead feature ------------------------------------------ */}
          <div className="lg:col-span-7 xl:col-span-8">
            {/* Both blocks start at the same moment rather than in sequence,
                so the page sets itself all at once. */}
            <Typeset
              as="h2"
              text={thesis}
              play={dismissed}
                className="text-3xl measure mb-8"
            />
            <Typeset
              text={standfirst}
              play={dismissed}
              className="font-body text-lg leading-relaxed measure"
            />

            <div className="rule mt-14 mb-8" />

            <h3 className="label mb-8">In this issue</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-12">
              <article>
                <p className="label mb-3">Currently</p>
                <Link
                  href={`/research#${lead.slug}`}
                  className="group block"
                >
                  <h4 className="text-xl mb-2">
                    <span className="entry-title">{lead.organization}</span>
                  </h4>
                  <p className="font-body text-base text-ink-light measure-tight">
                    {lead.deck}
                  </p>
                </Link>
              </article>

              <article>
                <p className="label mb-3">Selected project</p>
                <Link
                  href={`/engineering#${leadProject.slug}`}
                  className="group block"
                >
                  <h4 className="text-xl mb-2">
                    <span className="entry-title">{leadProject.title}</span>
                  </h4>
                  <p className="font-body text-base text-ink-light measure-tight">
                    {leadProject.deck}
                  </p>
                </Link>
              </article>
            </div>
          </div>

          {/* --- Directory rail ---------------------------------------- */}
          <aside className="lg:col-span-5 xl:col-span-4 lg:pl-10 lg:border-l border-rule">
            <h3 className="label mb-6">Contents</h3>
            <ul className="space-y-0">
              {navItems.map((item) => (
                <li key={item.href} className="border-t border-rule-faint">
                  <Link
                    href={item.href}
                    className="group flex items-baseline gap-4 py-3.5"
                  >
                    <span className="font-display text-sm text-ink-faint w-6 tabular">
                      {item.numeral}
                    </span>
                    <span className="text-lg group-hover:text-accent group-hover:translate-x-1 transition-all duration-200">
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
              <li className="border-t border-rule-faint">
                <Link
                  href="/archive"
                  className="group flex items-baseline gap-4 py-3.5"
                >
                  <span className="w-6" aria-hidden />
                  <span className="text-base text-ink-light group-hover:text-accent transition-colors duration-200">
                    Archive
                  </span>
                </Link>
              </li>
            </ul>

            <div className="mt-12 space-y-8">
              <section>
                <h3 className="label text-accent mb-2">Now</h3>
                <p className="font-body text-base italic text-ink-light measure-tight">
                  Stock embeddings at MIT CSAIL, tactile feedback models at
                  Johns Hopkins, and agent swarm intelligence inside the CSAIL
                  lab platform.
                </p>
              </section>

              <section>
                <h3 className="label mb-2">Open to</h3>
                <p className="font-body text-base text-ink-light measure-tight">
                  Research positions and internships in ML. I&apos;m still
                  figuring out what to specialize in, so I&apos;m open to a
                  fairly wide range.
                </p>
              </section>

              <section>
                <h3 className="label mb-2">Contact</h3>
                <ul className="space-y-1">
                  <li>
                    <a
                      href={`mailto:${profile.email}`}
                      className="text-sm link-rule"
                    >
                      Email
                    </a>
                  </li>
                  <li>
                    <a
                      href={profile.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm link-rule"
                    >
                      LinkedIn
                    </a>
                  </li>
                </ul>
              </section>
            </div>
          </aside>
        </div>
      </motion.div>
    </>
  );
}
