import { technicalExperience, type Experience } from "@/data/resume";
import PageTransition from "@/components/PageTransition";

export default function ProfessionalExperience() {
  return (
    <PageTransition>
      <div className="mb-12">
        <h1 className="text-6xl md:text-8xl font-display mb-4">Professional Experience</h1>
        <p className="font-sans small-caps border-b border-ink/20 pb-4">Data Science, Research, and AI Engineering</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
        <div className="md:col-span-8 md:col-start-3 relative">
          <div className="editorial-rule-thin mb-8"></div>

          <div className="space-y-16 mt-16">
            {technicalExperience.map((exp: Experience, i: number) => (
              <div key={i} className="relative group">
                <span className="absolute -left-12 top-1 font-display text-4xl text-ink/10 group-hover:text-time-red transition-colors">0{i + 1}</span>
                <h3 className="text-3xl font-bold mb-1">{exp.role}</h3>
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-6">
                  <p className="font-sans small-caps text-time-red">{exp.organization}</p>
                  <p className="font-sans small-caps text-xs text-ink-light mt-1 md:mt-0 font-bold">{exp.duration}</p>
                </div>
                <ul className="space-y-3 mt-4">
                  {exp.description.map((desc: string, j: number) => (
                    <li key={j} className="font-body text-base text-ink/80 leading-relaxed">• {desc}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
