import { readdir, readFile } from "fs/promises";
import { join } from "path";
import matter from "gray-matter";
import { bundleMDX } from "mdx-bundler";
import readingTime from "reading-time";
import remarkGfm from "remark-gfm"; // Tambahkan ini untuk tabel & tasklist
import { ContentType, PickFrontmatter, PostContent } from "@/types/insight";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkUnwrapImages from 'remark-unwrap-images'; // 1. Import plugin

// ... (import lainnya tetap sama)


const ROOT = process.cwd();
const CONTENT_PATH = join(ROOT, "src", "contents");

/**
 * Mendapatkan semua SLUG (tanpa ekstensi .mdx)
 */
export async function getFileSlugs(type: ContentType): Promise<string[]> {
  try {
    const folderPath = join(CONTENT_PATH, type);
    const files = await readdir(folderPath);
    
    // Filter hanya .mdx dan hapus ekstensinya untuk jadi slug
    return files
      .filter((f) => f.endsWith(".mdx"))
      .map((f) => f.replace(/\.mdx$/, ""));
  } catch (error) {
    console.error(` Error reading slugs for ${type}:`, error);
    return [];
  }
}

/**
 * Mendapatkan metadata semua file
 */
// src/lib/mdx-clients.ts

export async function getAllFilesFrontmatter<T extends ContentType>(
  type: T
): Promise<Array<PickFrontmatter<T> & { slug: string; readingTime: any; content: string }>> {
  const slugs = await getFileSlugs(type);

  const posts = await Promise.all(
    slugs.map(async (slug) => {
      // Baca file
      const source = await readFile(join(CONTENT_PATH, type, `${slug}.mdx`), "utf8");
      
      // PENTING: Ambil 'content' disini
      const { data, content } = matter(source); 

      return {
        ...(data as PickFrontmatter<T>),
        slug,
        readingTime: readingTime(source),
        content: content || "", // Pastikan selalu string, jangan undefined
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
): Promise<PostContent<T> & { toc: any[], minLevel: number }> {
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
        // 2. Tambahkan remarkUnwrapImages di sini
        options.remarkPlugins = [
          ...(options.remarkPlugins ?? []), 
          remarkGfm, 
          remarkUnwrapImages 
        ];
        
        options.rehypePlugins = [
          ...(options.rehypePlugins ?? []),
          rehypeSlug,
          [
            rehypePrettyCode,
            {
              theme: "one-dark-pro",
              onVisitLine(node: any) {
                if (node.children.length === 0) {
                  node.children = [{ type: "text", value: " " }];
                }
              },
              onVisitHighlightedLine(node: any) {
                if (!node.properties.className) {
                  node.properties.className = [];
                }
                node.properties.className.push("line--highlighted");
              },
              onVisitHighlightedWord(node: any) {
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
    const toc = lines
      .filter((line) => line.match(/^###?\s/))
      .map((line) => {
        const text = line.replace(/^###?\s/, "").trim();
        const level = line.split(" ")[0].length;
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
      } as any,
      toc,
      minLevel,
    };
  } catch (error) {
    console.error(`Error fetching slug "${slug}":`, error);
    throw new Error(`File not found: ${slug}`);
  }
}
// src/lib/mdx.provider.ts

export async function getRelatedPosts<T extends ContentType>(
  type: T,
  currentPost: { slug: string; category: string; tags: string[] },
  maxCount: number = 2
) {
  const allPosts = await getAllFilesFrontmatter(type);

  return allPosts
    .filter((post) => post.slug !== currentPost.slug) // Jangan sertakan diri sendiri
    .map((post) => {
      let score = 0;
      // Berikan skor jika kategori sama
      if (post.category === currentPost.category) score += 5;
      
      // Berikan skor untuk setiap tag yang sama
      const sharedTags = post.tags?.filter((tag: string) => 
        currentPost.tags.includes(tag)
      );
      score += (sharedTags?.length || 0) * 2;

      return { ...post, score };
    })
    .sort((a, b) => b.score - a.score) // Urutkan berdasarkan skor tertinggi
    .slice(0, maxCount);
}