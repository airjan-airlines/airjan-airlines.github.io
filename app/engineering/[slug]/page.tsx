import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import "katex/dist/katex.min.css";
import PageTransition from "@/components/PageTransition";
import { StackList } from "@/components/Editorial";
import { getWriteupBySlug, getWriteupSlugs } from "@/utils/markdown";

// Static export: only writeups present at build time exist.
export const dynamicParams = false;

export function generateStaticParams() {
  return getWriteupSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/engineering/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const writeup = getWriteupBySlug(slug);
  if (!writeup) return { title: "Not found" };
  return { title: writeup.title, description: writeup.excerpt };
}

function readingTime(content: string) {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

export default async function WriteupPage({
  params,
}: PageProps<"/engineering/[slug]">) {
  const { slug } = await params;
  const writeup = getWriteupBySlug(slug);

  if (!writeup) notFound();

  return (
    <PageTransition>
      <article className="grid grid-cols-1 md:grid-cols-12 gap-x-10">
        <div className="md:col-span-8 md:col-start-3 min-w-0">
          <Link
            href={`/engineering#${writeup.slug}`}
            className="label link-rule inline-block mb-12"
          >
            ← Back to Engineering
          </Link>

          <header className="mb-14 pb-7 border-b-2 border-accent">
            <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1 mb-5">
              <p className="label text-accent">Project writeup</p>
              <p className="label">{writeup.date}</p>
              <p className="label tabular">
                {readingTime(writeup.content)} min read
              </p>
            </div>
            <h1 className="text-4xl leading-[1.04] mb-6">{writeup.title}</h1>
            <p className="font-body text-xl leading-relaxed text-ink-light measure">
              {writeup.excerpt}
            </p>
            {writeup.link && (
              <a
                href={writeup.link}
                target="_blank"
                rel="noreferrer"
                className="label link-rule inline-block mt-6"
              >
                Visit {new URL(writeup.link).host}
              </a>
            )}
            {writeup.stack.length > 0 && <StackList items={writeup.stack} />}
          </header>

          <div
            className="
              prose prose-lg max-w-none
              prose-headings:font-display prose-headings:font-bold prose-headings:tracking-tight
              prose-headings:scroll-mt-32
              prose-h2:text-2xl prose-h2:mt-16 prose-h3:text-xl
              prose-p:font-body prose-p:leading-[1.75] prose-p:text-ink
              prose-li:font-body prose-li:text-ink
              prose-a:text-accent prose-a:no-underline hover:prose-a:underline
              prose-strong:font-bold prose-strong:text-ink
              prose-blockquote:border-l-2 prose-blockquote:border-accent
              prose-blockquote:pl-6 prose-blockquote:not-italic
              prose-blockquote:font-display prose-blockquote:text-2xl
              prose-blockquote:leading-tight prose-blockquote:text-ink
              prose-code:font-normal prose-code:text-ink
              prose-code:before:content-none prose-code:after:content-none
              prose-th:font-sans prose-th:text-xs prose-th:uppercase prose-th:tracking-[0.14em] prose-th:text-ink-light
              prose-td:font-body
              writeup-body
            "
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm, remarkMath]}
              rehypePlugins={[rehypeSlug, rehypeKatex]}
            >
              {writeup.content}
            </ReactMarkdown>
          </div>

          <footer className="mt-20 pt-6 border-t border-ink">
            <Link href={`/engineering#${writeup.slug}`} className="label link-rule">
              ← Back to Engineering
            </Link>
          </footer>
        </div>
      </article>
    </PageTransition>
  );
}
