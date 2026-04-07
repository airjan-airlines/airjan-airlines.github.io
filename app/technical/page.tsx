import { technicalProjects, type Project } from "@/data/resume";
import PageTransition from "@/components/PageTransition";
import Link from "next/link";

export default function TechnicalWork() {
  return (
    <PageTransition>
      <div className="mb-12">
        <h1 className="text-6xl md:text-8xl font-display mb-4">Technical Work</h1>
        <p className="font-sans small-caps border-b border-ink/20 pb-4">Machine learning, data science, and AI engineering applied to full-stack.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
        <div className="md:col-span-8 md:col-start-3 relative">
          <div className="editorial-rule-thin mb-8"></div>

          <div className="space-y-16">
            {technicalProjects.map((proj: Project, i: number) => (
              <div key={proj.slug} className="group relative hover:-translate-y-1 transition-transform cursor-pointer">
                <span className="absolute -left-12 top-1 font-display text-4xl text-ink/10 group-hover:text-time-red transition-colors">0{i + 1}</span>
                <Link href={`/technical/${proj.slug}`} className="block">
                  <h3 className="text-3xl font-bold mb-2">{proj.title}</h3>
                  <p className="text-sm font-sans small-caps text-ink-light mb-4">{proj.subtitle}</p>

                  {proj.pullQuote && (
                    <blockquote className="border-l-2 border-time-red pl-6 py-2 italic font-body text-xl text-ink-light my-6">
                      &quot;{proj.pullQuote}&quot;
                    </blockquote>
                  )}

                  <p className="font-body text-base leading-relaxed mt-4 text-ink/80">
                    {proj.bullets[0]}
                  </p>
                </Link>
              </div>
            ))}
          </div>

        </div>
      </div>
    </PageTransition>
  );
}
