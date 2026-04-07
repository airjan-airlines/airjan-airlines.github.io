import { research } from "@/data/resume";
import PageTransition from "@/components/PageTransition";

export default function Research() {
  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto py-12">
        <h1 className="text-5xl md:text-7xl font-display mb-4">Research</h1>
        <div className="editorial-rule"></div>
        
        <div className="mt-12">
          <h2 className="text-3xl font-display mb-2">{research.title}</h2>
          <p className="font-sans small-caps text-ink-light mb-8">{research.role} | {research.duration}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <h3 className="small-caps font-bold text-time-red mb-2">Abstract</h3>
            </div>
            <div className="md:col-span-3">
              <p className="font-body text-xl leading-relaxed drop-cap">
                {research.abstract}
              </p>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <blockquote className="text-4xl font-display italic tracking-tight text-ink-light leading-snug">
              &quot;{research.pullQuote}&quot;
            </blockquote>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
