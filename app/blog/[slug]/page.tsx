import type { Metadata } from "next";
import { getEssayBySlug, getEssaySlugs } from "@/utils/markdown";
import { notFound } from "next/navigation";
import PageTransition from "@/components/PageTransition";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

export async function generateStaticParams() {
  return getEssaySlugs().map((slug) => ({ slug: slug.replace(/\.md$/, "") }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const essay = getEssayBySlug(slug);
  if (!essay) return { title: "Not found" };
  return { title: essay.title, description: essay.excerpt };
}

function readingTime(content: string) {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

export default async function EssayPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const essay = getEssayBySlug(slug);

  if (!essay) notFound();

  return (
    <PageTransition>
      <article className="grid grid-cols-1 md:grid-cols-12 gap-x-10">
        <div className="md:col-span-8 md:col-start-3">
          <Link href="/blog" className="label link-rule inline-block mb-12">
            ← Back to Writing
          </Link>

          <header className="mb-14 pb-7 border-b-2 border-accent">
            <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1 mb-5">
              <p className="label text-accent">{essay.date}</p>
              <p className="label tabular">
                {readingTime(essay.content)} min read
              </p>
            </div>
            <h1 className="text-5xl leading-[1.02] mb-6">{essay.title}</h1>
            <p className="font-body text-xl leading-relaxed text-ink-light measure">
              {essay.excerpt}
            </p>
          </header>

          {/* Markdown mapped onto the editorial type system. */}
          <div
            className="
              prose prose-lg max-w-none
              prose-headings:font-display prose-headings:font-bold prose-headings:tracking-tight
              prose-h2:text-3xl prose-h3:text-2xl
              prose-p:font-body prose-p:leading-[1.75] prose-p:text-ink
              prose-li:font-body prose-li:text-ink
              prose-a:text-accent prose-a:no-underline hover:prose-a:underline
              prose-strong:font-bold prose-strong:text-ink
              prose-em:italic
              prose-blockquote:border-l-2 prose-blockquote:border-accent
              prose-blockquote:pl-6 prose-blockquote:not-italic
              prose-blockquote:font-display prose-blockquote:text-2xl
              prose-blockquote:leading-tight prose-blockquote:text-ink
              essay-body
            "
          >
            <ReactMarkdown>{essay.content}</ReactMarkdown>
          </div>

          <footer className="mt-20 pt-6 border-t border-ink">
            <Link href="/blog" className="label link-rule">
              ← More writing
            </Link>
          </footer>
        </div>
      </article>
    </PageTransition>
  );
}
