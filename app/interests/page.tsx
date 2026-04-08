import PageTransition from "@/components/PageTransition";

export default function Interests() {
  const interests = [
    {
      topic: "Badminton",
      detail: "I spent much of my highschool years playing competitive badminton, and I continue to play recreationally. Hit me up if you're ever trying to play."
    },
    {
      topic: "Quizbowl",
      detail: "I love studying trivia, particularly art history, philosophy, and social science. More recently I've been interested in theoretical physics and its connections to CS and AI."
    },
    {
      topic: "Tennis",
      detail: "More recently I've been playing a ton of tennis with friends. I'm trying to learn to actually backhand (help. please)."
    }
  ];

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto py-12">
        <h1 className="text-6xl md:text-8xl font-display mb-4">Interests</h1>
        <div className="editorial-rule-thin"></div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="md:col-span-1 border-r border-ink/20 pr-8">
            <h3 className="text-3xl font-display mb-6">My Offline Life</h3>
            <p className="font-body text-lg leading-relaxed drop-cap">
              The best way to understand the world is to engage with it directly.
              Pursuing various activities, particularly sports, has helped me develop a better understanding of the problems people engage with and intuition for buiding.
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
