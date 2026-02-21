import * as React from "react";
import Image from "next/image";
import { GetStaticPaths, GetStaticProps } from "next";
import { getMDXComponent } from "mdx-bundler/client";
import { motion } from "framer-motion";
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

const MDXRenderer = ({ code }: { code: string }) => {
  const Component = React.useMemo(() => getMDXComponent(code), [code]);
  return React.useMemo(() => (
    React.createElement(Component, { components: mdxComponents })
  ), [Component]);
};

// --- MAIN PAGE ---
export default function SingleInsightPage({ 
  code, frontmatter, toc, slug, minLevel, relatedPosts 
}: SingleInsightProps) {
  


const activeSection = useScrollSpy( "h2, h3", code,{ offset: 120 } );


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
      <HeadMeta 
        templateTitle={frontmatter?.title} 
        description={frontmatter?.description} 
        ogImage={frontmatter?.image} 
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

<section className="mx-auto max-w-7xl px-4 lg:grid lg:grid-cols-[1fr_300px] lg:gap-12">
        <main className="min-w-0">
          <article className="prose prose-slate dark:prose-invert max-w-none">
            <MDXRenderer code={code} />
          </article>
          
          <div className="mt-16 pt-8 border-t dark:border-slate-800">
            <RelatedPosts posts={relatedPosts} />
          </div>
        </main>

        <aside className="hidden lg:block">
          <div className="sticky top-24 pt-12">
            <TableOfContents 
              toc={toc} 
              minLevel={minLevel} 
              activeSection={activeSection} 
            />
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