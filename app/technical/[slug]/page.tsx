import { technicalProjects, type Project } from "@/data/resume";
import PageTransition from "@/components/PageTransition";
import { notFound } from "next/navigation";
import Link from "next/link";

export function generateStaticParams() {
  return technicalProjects.map((p: Project) => ({ slug: p.slug }));
}

export default async function WorkDetail({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const project = technicalProjects.find((p: Project) => p.slug === resolvedParams.slug);
  
  if (!project) return notFound();

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto py-12">
        <Link href="/technical" className="small-caps text-xs text-time-red mb-12 inline-flex items-center hover:underline">
          <span className="mr-2">←</span> Back to Technical Work
        </Link>
        <div className="mt-8">
            <h1 className="text-5xl md:text-7xl font-display leading-none mb-4">{project.title}</h1>
            <p className="font-sans small-caps text-ink-light text-xl border-b border-ink/20 pb-4 mb-12">{project.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1 space-y-6">
            <div>
              <p className="small-caps text-xs text-ink-light font-bold">Timeline</p>
              <p className="font-sans">{project.duration}</p>
            </div>
            
            {project.link && (
              <div>
                <p className="small-caps text-xs text-ink-light font-bold">Link</p>
                <a href={`https://${project.link}`} target="_blank" rel="noreferrer" className="font-sans text-time-red hover:underline">
                  {project.link}
                </a>
              </div>
            )}
            
            {project.stats && (
              <div>
                <p className="small-caps text-xs text-ink-light font-bold">Key Figures</p>
                <ul className="mt-2 space-y-1">
                  {project.stats.map((stat: string, i: number) => (
                    <li key={i} className="font-body text-sm italic">{stat}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          <div className="md:col-span-3">
            <div className="prose prose-lg prose-headings:font-display prose-p:font-body text-ink max-w-none">
                <p className="drop-cap">{project.bullets[0]}</p>
                
                <ul className="mt-8 space-y-4 list-disc pl-5">
                    {project.bullets.slice(1).map((bullet: string, i: number) => (
                        <li key={i} className="font-body">{bullet}</li>
                    ))}
                </ul>
                
                {project.pullQuote && (
                    <blockquote className="my-12 text-3xl font-display leading-tight italic border-l-4 border-time-red pl-6 py-2 text-ink-light">
                        &quot;{project.pullQuote}&quot;
                    </blockquote>
                )}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
