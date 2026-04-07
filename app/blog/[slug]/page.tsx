import { getEssayBySlug, getEssaySlugs } from "@/utils/markdown";
import { notFound } from "next/navigation";
import PageTransition from "@/components/PageTransition";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";

export async function generateStaticParams() {
  const slugs = getEssaySlugs();
  return slugs.map((slug) => ({
    slug: slug.replace(/\.md$/, ""),
  }));
}

export default async function EssayPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const essay = getEssayBySlug(resolvedParams.slug);

  if (!essay) {
    notFound();
  }

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto py-12 md:py-20 relative">
        <div className="mb-12">
          <Link 
            href="/blog" 
            className="inline-flex items-center text-ink hover:text-time-red transition-colors small-caps font-bold text-sm tracking-widest gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Directory
          </Link>
        </div>

        <header className="mb-16 pb-8 border-b-2 border-time-red">
          <p className="text-time-red small-caps font-bold text-sm mb-4">{essay.date}</p>
          <h1 className="text-5xl md:text-7xl font-display leading-tight mb-6">{essay.title}</h1>
          <p className="font-body text-xl md:text-2xl text-ink-light leading-relaxed max-w-3xl">
            {essay.excerpt}
          </p>
        </header>

        {/* Global typography lock: Standard Markdown mapping to TIME Editorial style */}
        <article className="prose prose-lg md:prose-xl prose-headings:font-display prose-headings:font-bold prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-p:font-body prose-p:leading-relaxed prose-a:text-time-red hover:prose-a:underline prose-strong:font-bold prose-blockquote:border-l-4 prose-blockquote:border-time-red prose-blockquote:pl-6 prose-blockquote:font-display prose-blockquote:italic prose-blockquote:text-2xl prose-li:font-body text-ink max-w-none">
          <ReactMarkdown>{essay.content}</ReactMarkdown>
        </article>
      </div>
    </PageTransition>
  );
}
