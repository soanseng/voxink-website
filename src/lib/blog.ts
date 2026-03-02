import { parseFrontmatter, type Frontmatter } from "./frontmatter";

export interface BlogPost {
  slug: string;
  frontmatter: Frontmatter;
  content: string;
}

const zhTwFiles = import.meta.glob("/content/blog/zh-tw/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const enFiles = import.meta.glob("/content/blog/en/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

function parseFiles(files: Record<string, string>): BlogPost[] {
  return Object.entries(files).map(([path, raw]) => {
    const slug = path.split("/").pop()!.replace(/\.md$/, "");
    const { frontmatter, content } = parseFrontmatter(raw);
    return { slug, frontmatter, content };
  });
}

const zhTwPosts = parseFiles(zhTwFiles);
const enPosts = parseFiles(enFiles);

function getPostsForLang(lang: string): BlogPost[] {
  if (lang === "en") {
    const enSlugs = new Set(enPosts.map((p) => p.slug));
    const fallbacks = zhTwPosts.filter((p) => !enSlugs.has(p.slug));
    return [...enPosts, ...fallbacks];
  }
  return zhTwPosts;
}

export function getBlogPosts(lang: string): BlogPost[] {
  return getPostsForLang(lang).sort(
    (a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
  );
}

export function getBlogPost(lang: string, slug: string): BlogPost | undefined {
  return getPostsForLang(lang).find((p) => p.slug === slug);
}
