import type { Metadata } from "next";
import PageTransition from "@/components/PageTransition";
import {
  SectionOpener,
  Reveal,
  StackList,
  StatRow,
  PullQuote,
  Bullets,
  NextEntry,
} from "@/components/Editorial";
import PageTurn from "@/components/PageTurn";
import { projects, internship } from "@/data/resume";

export const metadata: Metadata = {
  title: "Engineering",
  description:
    "Industry data science at a county health department, plus shipped software: adaptive-learning tools, recommendation engines, and backtesting platforms.",
};

export default function Engineering() {
  const sorted = [...projects].sort((a, b) => b.order - a.order);

  return (
    <PageTransition>
      <SectionOpener
        title="Engineering"
        deck="Things that shipped, and the people who actually used them."
      />

      {/* Industry experience leads. It is the only work here done inside an
          organisation with its own stakes. */}
      <Reveal>
        <section className="mb-28 md:mb-36">
          <h2 className="text-2xl mb-10">Industry</h2>
          <article id={internship.slug} className="scroll-mt-32">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-y-6 gap-x-10">
              <div className="md:col-span-3">
                <p className="label text-ink">{internship.duration}</p>
                <p className="label mt-1">{internship.location}</p>
                <p className="font-body text-sm italic text-ink-light mt-3">
                  {internship.unit}
                </p>
              </div>
              <div className="md:col-span-9">
                <h3 className="text-3xl mb-2">{internship.organization}</h3>
                <p className="font-body italic text-lg text-ink-light mb-8">
                  {internship.role}
                </p>
                <PullQuote>{internship.deck}</PullQuote>
                <p className="font-body text-lg leading-relaxed measure mb-10">
                  {internship.narrative}
                </p>
                <div className="rule-faint pt-6">
                  <Bullets items={internship.bullets} />
                  <StackList items={internship.stack} />
                  {sorted[0] && (
                    <NextEntry href={`#${sorted[0].slug}`} label={sorted[0].title} />
                  )}
                </div>
              </div>
            </div>
          </article>
        </section>
      </Reveal>

      <div className="border-t-2 border-accent pt-10">
        <h2 className="text-2xl mb-14">Projects</h2>

        <div className="space-y-24 md:space-y-32">
          {sorted.map((project, i) => (
            <PageTurn key={project.slug}>
              <article id={project.slug} className="scroll-mt-32 group">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-y-6 gap-x-10">
                  <div className="md:col-span-3">
                    <span className="folio block mb-6">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="label text-ink">{project.duration}</p>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        className="label mt-3 inline-block link-rule"
                      >
                        Visit the site
                      </a>
                    )}
                  </div>

                  <div className="md:col-span-9">
                    <h3 className="text-3xl mb-2">
                      <span className="entry-title">{project.title}</span>
                    </h3>
                    <p className="font-body italic text-lg text-ink-light mb-8">
                      {project.subtitle}
                    </p>

                    <p className="font-body text-lg leading-relaxed measure">
                      {project.deck}
                    </p>

                    {project.pullQuote && (
                      <PullQuote>{project.pullQuote}</PullQuote>
                    )}

                    <div className="rule-faint pt-6 mt-8">
                      <Bullets items={project.bullets} />
                      {project.stats && <StatRow stats={project.stats} />}
                      <StackList items={project.stack} />
                      {sorted[i + 1] && (
                        <NextEntry
                          href={`#${sorted[i + 1].slug}`}
                          label={sorted[i + 1].title}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </article>
            </PageTurn>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
