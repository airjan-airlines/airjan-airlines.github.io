import type { Metadata } from "next";
import Link from "next/link";
import PageTransition from "@/components/PageTransition";
import { SectionOpener } from "@/components/Editorial";
import { archive } from "@/data/resume";

export const metadata: Metadata = {
  title: "Archive",
  description: "Leadership and organizing work from before Berkeley.",
};

export default function Archive() {
  return (
    <PageTransition>
      <SectionOpener
        title="Archive"
        deck="Back issues. Leadership and organizing work from before Berkeley."
      />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-x-10">
        <div className="md:col-span-8 md:col-start-3 space-y-14">
          {archive.map((entry) => (
            <article key={entry.organization} className="border-t border-rule-faint pt-5">
              <div className="flex flex-wrap items-baseline justify-between gap-3 mb-2">
                <h2 className="text-xl">{entry.organization}</h2>
                <p className="label">{entry.duration}</p>
              </div>
              <p className="font-body italic text-ink-light mb-4">{entry.role}</p>
              <ul className="space-y-2 measure">
                {entry.description.map((line) => (
                  <li
                    key={line}
                    className="font-body text-base leading-relaxed text-ink-light"
                  >
                    {line}
                  </li>
                ))}
              </ul>
            </article>
          ))}

          <p className="label pt-6 border-t border-rule-faint">
            <Link href="/" className="link-rule">
              Return to cover
            </Link>
          </p>
        </div>
      </div>
    </PageTransition>
  );
}
