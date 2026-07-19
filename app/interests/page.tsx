import type { Metadata } from "next";
import Link from "next/link";
import PageTransition from "@/components/PageTransition";
import { Reveal, SectionCover } from "@/components/Editorial";
import { interests, researchInterests } from "@/data/resume";

export const metadata: Metadata = {
  title: "Interests",
  description: "Offline life, and the tools that carry across every project.",
};

export default function Interests() {
  return (
    <PageTransition>
      <SectionCover
        src="/pool.jpg"
        alt="Arjun lining up a shot at a pool table"
        title="Interests"
        deck="What I do when I'm not at a terminal, and what I reach for when I am."
        position="56% 46%"
        tone="colour"
        align="bottom"
        ink="cream"
      />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-y-16 gap-x-10">
        <div className="md:col-span-5">
          <h2 className="text-2xl mb-6">Offline</h2>
          <p className="font-body text-lg leading-relaxed measure drop-cap">
            Most of what I know about building things for other people, I
            learned from sport. Being visibly bad at something in front of other
            people, for long enough to get good at it, turns out to be decent
            training for shipping software.
          </p>
        </div>

        <div className="md:col-span-6 md:col-start-7 space-y-10">
          {interests.map((item, i) => (
            <Reveal key={item.topic} delay={i * 0.06}>
              <div className="border-t border-rule-faint pt-4">
                <h3 className="label text-accent mb-2">{item.topic}</h3>
                <p className="font-body text-base leading-relaxed text-ink-light measure">
                  {item.detail}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Each domain is a link to the work that backs it, not a keyword. */}
      <section className="mt-32 pt-10 border-t-2 border-accent">
        <h2 className="text-2xl mb-10">Research interests</h2>
        <ul>
          {researchInterests.map((item) => (
            <li key={item.domain} className="border-t border-rule-faint">
              <Link
                href={item.href}
                className="group flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 py-5"
              >
                <span className="text-2xl">
                  <span className="entry-title">{item.domain}</span>
                </span>
                <span className="label group-hover:text-accent transition-colors duration-200">
                  {item.where}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </PageTransition>
  );
}
