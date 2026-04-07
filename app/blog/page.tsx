import PageTransition from "@/components/PageTransition";
import Link from "next/link";
import { getAllEssays } from "@/utils/markdown";

export default function Blog() {
  const essays = getAllEssays();

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto py-12">
        <h1 className="text-6xl md:text-8xl font-display mb-4">Essays</h1>
        <p className="font-sans small-caps border-b border-ink/20 pb-4">Table of Contents</p>
        
        <div className="mt-16 space-y-16">
          {essays.map((essay, i) => (
            <div key={i} className="group border-t-2 border-time-red pt-4 relative">
              <span className="absolute right-0 top-6 text-sm font-sans small-caps text-ink-light">Pg. {(i+1) * 12}</span>
              <p className="text-time-red small-caps text-xs font-bold mb-2">{essay.date}</p>
              
              <Link href={`/blog/${essay.slug}`} className="block">
                <h2 className="text-3xl md:text-5xl font-display leading-tight mb-4 group-hover:text-time-red transition-colors">
                  {essay.title}
                </h2>
                
                <p className="font-body text-lg leading-relaxed text-ink-light max-w-2xl">
                  {essay.excerpt}
                </p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
