import type { Metadata } from "next";
import PageTransition from "@/components/PageTransition";
import { SectionOpener, Reveal } from "@/components/Editorial";
import { interests, skills } from "@/data/resume";

export const metadata: Metadata = {
  title: "Interests",
  description: "Offline life, and the tools that carry across every project.",
};

export default function Interests() {
  return (
    <PageTransition>
      <SectionOpener
        title="Interests"
        deck="What I do when I'm not at a terminal, and what I reach for when I am."
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

      {/* Skills as an editorial index, not bars or badges. */}
      <section className="mt-32 pt-10 border-t-2 border-accent">
        <h2 className="label mb-10">Index of tools</h2>
        <dl className="grid grid-cols-1 md:grid-cols-12 gap-y-8 gap-x-10">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className="md:col-span-4">
              <dt className="label text-ink mb-3">{category}</dt>
              <dd className="font-body text-base leading-relaxed text-ink-light">
                {items.join(", ")}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </PageTransition>
  );
}
