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
