import * as React from "react";
import Image from "next/image";
import { GetStaticPaths, GetStaticProps } from "next";
import { getMDXComponent } from "mdx-bundler/client";
import { motion, useScroll, useSpring } from "framer-motion";
import { ParsedUrlQuery } from 'querystring';

// Components
import { mdxComponents } from "@/components/ui/mdx";
import TableOfContents from "@/components/ui/TableOfContents";
import Layout from "@/components/layout";
import HeadMeta from "@/components/headMeta";
import MobileTOC from "@/components/ui/MobileTOC";
import { PostHeader } from "@/components/insight/PostHeader";
import RelatedPosts from "@/components/insight/RelatedPosts";

// Hooks & Lib
import useScrollSpy from "@/hooks/useScrollSpy";
import { getFileBySlug, getFileSlugs, getRelatedPosts } from "@/lib/mdx-clients";

// --- INTERFACES ---
interface TocItem {
  text: string;
  level: number;
  id: string;
}

interface PostFrontmatter {
  title: string;
  description: string;
  image?: string;
  category: string;
  tags: string[];
  publishedAt: string;
  readingTime?: { text: string };
}

interface RelatedPost {
  slug: string;
  title: string;
  description: string;
  image?: string;
  category?: string;
  publishedAt: string;
  readingTime?: { text: string };
}

interface SingleInsightProps {
  code: string;
  frontmatter: PostFrontmatter;
  toc: TocItem[];
  slug: string;
  minLevel: number;
  relatedPosts: RelatedPost[]; 
}

interface ContextParams extends ParsedUrlQuery {
  slug: string;
}

// --- HELPER COMPONENT ---
const MDXRenderer = ({ code }: { code: string }) => {
  const [Component, setComponent] = React.useState<React.ComponentType<{
    components: typeof mdxComponents;
  }> | null>(null);

  React.useEffect(() => {
    const MdxComponent = getMDXComponent(code) as React.ComponentType<{
      components: typeof mdxComponents;
    }>;
    setComponent(() => MdxComponent);
  }, [code]);

  if (!Component) return null;

  return <Component components={mdxComponents} />;
};

// --- MAIN PAGE ---
export default function SingleInsightPage({ 
  code, 
  frontmatter, 
  toc, 
  slug, 
  minLevel, 
  relatedPosts 
}: SingleInsightProps) {
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });



const activeSection = useScrollSpy("h2, .mdx h3", code);  
  if (!frontmatter) {
    return (
      <Layout key="error-layout">
         <div className="flex h-screen items-center justify-center text-slate-500">
            Mempersiapkan data artikel... (Atau frontmatter tidak ditemukan di file MDX ini)
         </div>
      </Layout>
    );
  }

  return (
    <Layout key={slug}>
      {/* 2. OPTIONAL CHAINING & FALLBACK: Pastikan property dibaca dengan aman */}
      <HeadMeta 
        templateTitle={frontmatter?.title || "Artikel Tanpa Judul"} 
        description={frontmatter?.description || ""} 
        ogImage={frontmatter?.image} 
      />

      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-sky-500 origin-left z-[60]"
        style={{ scaleX }}
      />

      <section className="relative w-full">
        <div>
          <figure className="pointer-events-none absolute left-0 top-0 z-[-1] h-[16rem] w-full overflow-hidden">
            {frontmatter?.image && (
               <Image fill
                 src={frontmatter.image} 
                 alt={frontmatter?.title || "Banner image"} // <-- Amankan bagian ini
                 className="w-full h-full object-cover opacity-70 md:-translate-y-1/4"
               />
            )}
          </figure>
          <div className="absolute left-0 top-0 z-[-1] h-[16rem] w-full bg-gradient-to-b from-sky-400/20 to-white dark:to-neutral-950" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8  pt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <PostHeader 
              {...frontmatter}
              readingTime={frontmatter?.readingTime?.text}
            />
          </motion.div>
        </div>
      </section>

      {/* 3. MAIN CONTENT & SIDEBAR GRID */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 lg:grid lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-8">
        
        {/* Kolom Kiri: Artikel MDX */}
        <main className="w-full">
          <article className="
            mdx prose mx-auto mt-4 w-full transition-colors 
            prose-slate dark:prose-invert max-w-none 
            prose-img:rounded-3xl prose-figure:my-12
            prose-headings:scroll-mt-32
            prose-p:text-slate-600 dark:prose-p:text-slate-300
            prose-strong:text-slate-900 dark:prose-strong:text-white
          ">
            <MDXRenderer code={code} />
          </article>

          {/* Area Interaksi & Related Posts di bawah artikel */}
          <div className="mt-24">
             {/* Jika kamu ingin menambahkan tombol 'Like/Kudos' seperti di HTML referensi, taruh di sini */}
             <div className="border-t border-slate-200 dark:border-neutral-800">
               <RelatedPosts posts={relatedPosts} />
             </div>
          </div>
        </main>
        
        {/* Kolom Kanan: Sticky Sidebar (TOC) */}
        <aside className="hidden lg:block">
          <div className="sticky top-20">
            <div className="max-h-[calc(100vh-9rem-113px)] overflow-auto  hidden lg:block">
              <TableOfContents 
                toc={toc} 
                minLevel={minLevel} 
                activeSection={activeSection} 
              />
            </div>
            
            {/* Share Widget Option (Sama seperti referensi HTML) */}
            <div className="mt-8 p-6 rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-900/50">
              <h4 className="text-sm font-bold mb-2">Share this article</h4>
              <p className="text-xs text-slate-500 mb-4">Jika artikel ini membantumu, silakan bagikan ke rekan developer lainnya!</p>
              {/* Tempatkan tombol share-mu di sini */}
            </div>
          </div>
        </aside>

      </section>

      <MobileTOC toc={toc} activeSection={activeSection} minLevel={minLevel} />
    </Layout>
  );
}

// --- DATA FETCHING ---
export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await getFileSlugs("insight"); 
  
  return {
    paths: slugs.map((slug) => ({ 
      params: { slug } 
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<SingleInsightProps, ContextParams> = async ({ params }) => {
  try {
    const slug = params?.slug as string;
    const post = await getFileBySlug("insight", slug);
    
    const relatedPosts = await getRelatedPosts("insight", {
      slug,
      category: post.frontmatter.category,
      tags: post.frontmatter.tags
    }, 2);
  
    return { 
      props: { 
        ...post,
        relatedPosts,
        slug 
      } 
    };
  } catch (error) {
    console.error("Error in getStaticProps:", error);
    return { notFound: true };
  }
};