import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const essaysDirectory = path.join(process.cwd(), 'content/essays');

export interface EssayMetadata {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
}

export interface Essay extends EssayMetadata {
  content: string;
}

export function getEssaySlugs() {
  if (!fs.existsSync(essaysDirectory)) {
    return [];
  }
  return fs.readdirSync(essaysDirectory).filter((file) => file.endsWith('.md'));
}

export function getEssayBySlug(slug: string): Essay | null {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = path.join(essaysDirectory, `${realSlug}.md`);
  
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug: realSlug,
    title: data.title || realSlug,
    date: data.date || "Unknown Date",
    excerpt: data.excerpt || "",
    content,
  };
}

export function getAllEssays(): EssayMetadata[] {
  const slugs = getEssaySlugs();
  const essays = slugs
    .map((slug) => getEssayBySlug(slug))
    .filter((essay): essay is Essay => essay !== null)
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  
  return essays.map(({ slug, title, date, excerpt }) => ({
    slug,
    title,
    date,
    excerpt
  }));
}

// Project writeups live apart from essays: they are technical reports linked
// from the Engineering page, not entries in Writing.
const writeupsDirectory = path.join(process.cwd(), 'content/projects');

export interface Writeup {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  link?: string;
  stack: string[];
  content: string;
}

export function getWriteupSlugs(): string[] {
  if (!fs.existsSync(writeupsDirectory)) return [];
  return fs
    .readdirSync(writeupsDirectory)
    .filter((file) => file.endsWith('.md'))
    .map((file) => file.replace(/\.md$/, ''));
}

export function getWriteupBySlug(slug: string): Writeup | null {
  const fullPath = path.join(writeupsDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const { data, content } = matter(fs.readFileSync(fullPath, 'utf8'));

  return {
    slug,
    title: data.title || slug,
    date: data.date || "",
    excerpt: data.excerpt || "",
    link: data.link,
    stack: data.stack || [],
    content,
  };
}
