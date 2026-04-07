import PageTransition from "@/components/PageTransition";

export default function Interests() {
  const interests = [
    {
      topic: "Skateboarding",
      detail: "Currently building Skate-Tracker, an AI coach. Beyond the code, I spend hours refining kickflips and analyzing trick progression as a physical physics engine."
    },
    {
      topic: "Competitive Quizbowl",
      detail: "Co-President of the Quizbowl club. It's a game of rapid knowledge retrieval that mirrors the exact problem space of RAG systems I build."
    },
    {
      topic: "Epidemiology data",
      detail: "My work at the Fort Bend County Health Department showed me how data literally saves lives. I stay up-to-date with predictive modeling literature in the space."
    }
  ];

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto py-12">
        <h1 className="text-6xl md:text-8xl font-display mb-4">Interests</h1>
        <div className="editorial-rule-thin"></div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="md:col-span-1 border-r border-ink/20 pr-8">
                <h3 className="text-3xl font-display mb-6">The Analog Context</h3>
                <p className="font-body text-lg leading-relaxed drop-cap">
                    Systems thinking doesn&apos;t stop at the editor. The algorithms and architectures I build on a screen have roots in the structural problem-solving I engage with offline. From the balance mechanics of a skateboard to the pyramidal knowledge structures of Quizbowl, the analog informs the digital.
                </p>
            </div>
            
            <div className="md:col-span-1 space-y-12">
                {interests.map((item, i) => (
                    <div key={i}>
                        <h4 className="small-caps text-time-red font-bold mb-2">{item.topic}</h4>
                        <p className="font-body text-ink-light">{item.detail}</p>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </PageTransition>
  );
}
