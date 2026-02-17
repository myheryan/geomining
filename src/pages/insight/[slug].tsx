import * as React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { getMDXComponent } from "mdx-bundler/client";
import { motion, useScroll, useSpring } from "framer-motion";

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

export default function SingleInsightPage({ code, frontmatter, toc, slug, minLevel, relatedPosts }: any) {
  // Setup Progress Bar ala modern blog
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const activeSection = useScrollSpy("h2, h3", code);
  const Component = React.useMemo(() => getMDXComponent(code), [code]);

return (
    <Layout key={slug}>
      <HeadMeta 
        templateTitle={frontmatter.title} 
        description={frontmatter.description} 
        ogImage={frontmatter.image} 
      />

      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-sky-500 origin-left z-[60]"
        style={{ scaleX }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          
          <main className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <PostHeader 
                {...frontmatter}
                readingTime={frontmatter.readingTime?.text}
              />
            </motion.div>
            
            <article className="
              mt-10
              prose prose-slate dark:prose-invert 
              max-w-none 
              lg:prose-xl
              
              /* Menangani Gambar agar bisa breakout */
              prose-img:rounded-3xl 
              prose-figure:my-12
              
              /* Styling Typografi tambahan */
              prose-headings:scroll-mt-32
              prose-p:text-slate-600 dark:prose-p:text-slate-300
              prose-strong:text-slate-900 dark:prose-strong:text-white
            ">
              {/* Lewatkan mdxComponents yang sudah dimodifikasi tadi */}
              <Component components={mdxComponents} />
            </article>

            {/* Section Related Posts */}
            <div className="mt-24 pt-12 border-t border-slate-100 dark:border-slate-800">
               <RelatedPosts posts={relatedPosts} />
            </div>
          </main>
          
          <aside className="hidden lg:block lg:col-span-4">
            <div className="sticky top-32 pl-10">
              <TableOfContents 
                toc={toc} 
                minLevel={minLevel} 
                activeSection={activeSection} 
              />
              
              {/* Info Card di Sidebar */}
              <div className="mt-12 p-8 rounded-3xl bg-gradient-to-br from-slate-50 to-white dark:from-slate-900/50 dark:to-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm">
                <h4 className="text-sm font-bold mb-2">Share this article</h4>
                <p className="text-xs text-slate-500 mb-4">Jika artikel ini membantumu, silakan bagikan ke rekan developer lainnya!</p>
                {/* Tombol Share bisa diletakkan di sini */}
              </div>
            </div>
          </aside>

        </div>
      </div>

      <MobileTOC toc={toc} activeSection={activeSection} minLevel={minLevel} />
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await getFileSlugs("insight"); 
  
  return {
    paths: slugs.map((slug) => ({ 
      params: { slug } 
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
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
        relatedPosts 
      } 
    };
  } catch (error) {
    return { notFound: true };
  }
};