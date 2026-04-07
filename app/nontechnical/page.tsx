import { nonTechnicalRoles, type Experience } from "@/data/resume";
import PageTransition from "@/components/PageTransition";

export default function NonTechnicalWork() {
  return (
    <PageTransition>
      <div className="mb-12">
        <h1 className="text-6xl md:text-8xl font-display mb-4">Leadership</h1>
        <p className="font-sans small-caps border-b border-ink/20 pb-4">Non-Technical Pursuits & Organizations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
        <div className="md:col-span-8 md:col-start-3 relative">
          <div className="editorial-rule-thin mb-8"></div>
          
          <div className="space-y-16">
            {nonTechnicalRoles.map((role: Experience, i: number) => (
              <div key={i} className="group relative">
                <span className="absolute -left-12 top-1 font-display text-4xl text-ink/10 group-hover:text-time-red transition-colors">0{i+1}</span>
                <h3 className="text-3xl font-bold mb-2">{role.organization}</h3>
                <p className="text-sm font-sans italic text-ink-light mb-6">{role.role}</p>
                
                <div className="font-body text-base leading-relaxed space-y-4 text-ink/80">
                  {role.description.map((p: string, j: number) => (
                    <p key={j}>{p}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
