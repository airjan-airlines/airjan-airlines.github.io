import type { Metadata } from "next";
import PageTransition from "@/components/PageTransition";
import Link from "next/link";
import { getAllEssays } from "@/utils/markdown";
import { SectionOpener, Reveal } from "@/components/Editorial";

export const metadata: Metadata = {
  title: "Writing",
  description: "Essays on philosophy, country, and the things worth arguing about.",
};

export default function Writing() {
  const essays = getAllEssays();

  return (
    <PageTransition>
      <SectionOpener
        title="Writing"
        deck="Essays written mostly under time pressure, kept mostly unedited."
      />

      {essays.length === 0 ? (
        <p className="font-body text-lg text-ink-light measure">
          Nothing published yet. Check back.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-10">
          <div className="md:col-span-9 lg:col-span-8">
            {essays.map((essay, i) => (
              <Reveal key={essay.slug} delay={i * 0.06}>
                <article className="group border-t border-ink pt-5 pb-12">
                  <div className="flex items-baseline justify-between gap-6 mb-3">
                    <p className="label text-accent">{essay.date}</p>
                    <p className="label tabular">
                      Pg. {(i + 1) * 12}
                    </p>
                  </div>

                  <Link href={`/blog/${essay.slug}`} className="block">
                    <h2 className="text-4xl leading-tight mb-4">
                      <span className="entry-title">{essay.title}</span>
                    </h2>
                    <p className="font-body text-lg leading-relaxed text-ink-light measure">
                      {essay.excerpt}
                    </p>
                    <span className="label mt-5 inline-block group-hover:text-accent transition-colors duration-200">
                      Read the essay
                    </span>
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      )}
    </PageTransition>
  );
}
