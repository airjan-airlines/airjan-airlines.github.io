import type { Metadata } from "next";
import PageTransition from "@/components/PageTransition";
import {
  SectionOpener,
  Reveal,
  StackList,
  PullQuote,
  Bullets,
} from "@/components/Editorial";
import { appointments } from "@/data/resume";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Research appointments in representation learning, scientific machine learning, AI safety, and computational biology.",
};

export default function Research() {
  const sorted = [...appointments].sort((a, b) => b.order - a.order);

  return (
    <PageTransition>
      <SectionOpener
        title="Research"
        deck="Four appointments across four fields, running concurrently."
      />

      <div className="space-y-24 md:space-y-32">
        {sorted.map((item, i) => (
          <Reveal key={item.slug}>
            <article id={item.slug} className="scroll-mt-32 group">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-y-6 gap-x-10">
                {/* Rail: numeral + metadata */}
                <div className="md:col-span-3">
                  <span className="folio text-5xl block mb-6">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="label text-ink">{item.duration}</p>
                  <p className="label mt-1">{item.location}</p>
                  {item.unit && (
                    <p className="font-body text-sm italic text-ink-light mt-3">
                      {item.unit}
                    </p>
                  )}
                </div>

                {/* Body */}
                <div className="md:col-span-9">
                  <h2 className="text-3xl mb-3">
                    <span className="entry-title">{item.organization}</span>
                  </h2>
                  <p className="font-body italic text-lg text-ink-light mb-8">
                    {item.role}
                  </p>

                  <PullQuote>{item.deck}</PullQuote>

                  <p className="font-body text-lg leading-relaxed measure mb-10">
                    {item.narrative}
                  </p>

                  <div className="rule-faint pt-6">
                    <h3 className="label mb-4">The work</h3>
                    <Bullets items={item.bullets} />
                    <StackList items={item.stack} />
                  </div>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </PageTransition>
  );
}
