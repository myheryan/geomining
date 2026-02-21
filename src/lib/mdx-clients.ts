import { readdir, readFile } from "fs/promises";
import { join } from "path";
import matter from "gray-matter";
import { bundleMDX } from "mdx-bundler";
import readingTime from "reading-time";
import remarkGfm from "remark-gfm";
import remarkUnwrapImages from 'remark-unwrap-images';
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

import { ContentType, PickFrontmatter, PostContent } from "@/types/insight";

// --- INTERFACES UNTUK MENGHILANGKAN ERROR 'ANY' ---
interface TocItem {
  text: string;
  level: number;
  id: string;
}

interface RehypeNode {
  children: Array<{ type: string; value: string }>;
  properties: {
    className?: string[];
  };
}

const ROOT = process.cwd();
const CONTENT_PATH = join(ROOT, "src", "contents");

/**
 * Mendapatkan semua SLUG (tanpa ekstensi .mdx)
 */
export async function getFileSlugs(type: ContentType): Promise<string[]> {
  try {
    const folderPath = join(CONTENT_PATH, type);
    const files = await readdir(folderPath);
    
    return files
      .filter((f) => f.endsWith(".mdx"))
      .map((f) => f.replace(/\.mdx$/, ""));
  } catch (error) {
    console.error(`Error reading slugs for ${type}:`, error);
    return [];
  }
}

/**
 * Mendapatkan metadata semua file
 */
export async function getAllFilesFrontmatter<T extends ContentType>(
  type: T
): Promise<Array<PickFrontmatter<T> & { slug: string; readingTime: ReturnType<typeof readingTime>; content: string }>> {
  const slugs = await getFileSlugs(type);

  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const source = await readFile(join(CONTENT_PATH, type, `${slug}.mdx`), "utf8");
      const { data, content } = matter(source); 

      return {
        ...(data as PickFrontmatter<T>),
        slug,
        readingTime: readingTime(source),
        content: content || "",
      };
    })
  );

  return posts.sort((a, b) => {
    if (!a.publishedAt || !b.publishedAt) return 0;
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });
}

/**
 * Mendapatkan konten penuh dengan MDX Bundler
 */
export async function getFileBySlug<T extends ContentType>(
  type: T,
  slug: string
): Promise<PostContent<T> & { toc: TocItem[], minLevel: number }> {
  try {
    const filePath = join(CONTENT_PATH, type, `${slug}.mdx`);
    const source = await readFile(filePath, "utf8");

    if (process.platform === "win32") {
      process.env.ESBUILD_BINARY_PATH = join(ROOT, "node_modules", "esbuild", "esbuild.exe");
    } else {
      process.env.ESBUILD_BINARY_PATH = join(ROOT, "node_modules", "esbuild", "bin", "esbuild");
    }

    const { code, frontmatter } = await bundleMDX({
      source,
      cwd: join(CONTENT_PATH, type),
      mdxOptions(options) {
        options.remarkPlugins = [
          ...(options.remarkPlugins ?? []), remarkGfm, remarkUnwrapImages, remarkMath,
          remarkUnwrapImages 
        ];
        
        options.rehypePlugins = [
          ...(options.rehypePlugins ?? []),
          rehypeSlug, rehypeKatex,
          [
            rehypePrettyCode,
            {
              theme: "one-dark-pro",
              onVisitLine(node: RehypeNode) {
                if (node.children.length === 0) {
                  node.children = [{ type: "text", value: " " }];
                }
              },
              onVisitHighlightedLine(node: RehypeNode) {
                node.properties.className = [...(node.properties.className ?? []), "line--highlighted"];
              },
              onVisitHighlightedWord(node: RehypeNode) {
                node.properties.className = ["word--highlighted"];
              },
            },
          ],
        ];
        return options;
      },
    });

    // --- LOGIKA EXTRAKSI TOC ---
    const lines = source.split("\n");
    const toc: TocItem[] = lines
      .filter((line) => line.match(/^###?\s/))
      .map((line) => {
        const text = line.replace(/^###?\s/, "").trim();
        const level = (line.match(/^#+/) || [""])[0].length;
        const id = text
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-");
        return { text, level, id };
      });

    const minLevel = toc.length > 0 ? Math.min(...toc.map((t) => t.level)) : 2;

    return {
      slug,
      code,
      frontmatter: {
        ...(frontmatter as PickFrontmatter<T>),
        readingTime: readingTime(source),
        wordCount: source.split(/\s+/gu).length,
      } as PostContent<T>["frontmatter"], // Cast ke tipe yang benar
      toc,
      minLevel,
    };
  } catch (error) {
    console.error(`Error fetching slug "${slug}":`, error);
    throw new Error(`File not found: ${slug}`);
  }
}

/**
 * Mendapatkan Related Posts
 */
export async function getRelatedPosts<T extends ContentType>(
  type: T,
  currentPost: { slug: string; category: string; tags: string[] },
  maxCount = 2
) {
  const allPosts = await getAllFilesFrontmatter(type);

  return allPosts
    .filter((post) => post.slug !== currentPost.slug)
    .map((post) => {
      let score = 0;
      if (post.category === currentPost.category) score += 5;
      
      const sharedTags = post.tags?.filter((tag: string) => 
        currentPost.tags.includes(tag)
      );
      score += (sharedTags?.length || 0) * 2;

      return { ...post, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, maxCount);
}