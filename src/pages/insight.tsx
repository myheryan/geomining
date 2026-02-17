import * as React from 'react';
import { GetStaticProps } from 'next';
import { motion, AnimatePresence } from 'framer-motion';
import { format, isValid } from 'date-fns';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Calendar, Clock, X } from 'lucide-react'; 
import { getAllFilesFrontmatter } from "@/lib/mdx-clients";
import Layout from '@/components/layout';
import HeadMeta from '@/components/headMeta';

type InsightPageProps = {
  posts: Array<{
    slug: string;
    title: string;
    description: string;
    category: string;
    publishedAt: string;
    image?: string;
    content?: string;
    readingTime: { text: string };
    tags?: string[];
  }>;
};

export default function InsightPage({ posts = [] }: InsightPageProps) {
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const [searchQuery, setSearchQuery] = React.useState('');

  const categories = React.useMemo(() => {
    const cats = posts.map((p) => p.category).filter((c) => c);
    return ['All', ...Array.from(new Set(cats))];
  }, [posts]);

  const filteredPosts = posts.filter((post) => {
    const isCategoryMatch = selectedCategory === 'All' || post.category === selectedCategory;
    const query = searchQuery.toLowerCase();
    const titleMatch = (post.title || "").toLowerCase().includes(query);
    const descMatch = (post.description || "").toLowerCase().includes(query);
    const contentMatch = (post.content || "").toLowerCase().includes(query);
    return isCategoryMatch && (titleMatch || descMatch || contentMatch);
  });

  return (
    <Layout>
      <HeadMeta templateTitle="Insight" description="Explore technical insights." />

      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-sky-500/10 blur-[120px]" />
        <div className="absolute bottom-[20%] right-[-10%] w-[400px] h-[400px] rounded-full bg-indigo-500/10 blur-[100px]" />
      </div>

      <section className="fixed-content mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-light tracking-tight text-slate-900 dark:text-white mb-4">
            Insight <span className="font-serif italic font-semibold text-sky-600 dark:text-sky-400">&</span> Thoughts
          </h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-lg mx-auto md:mx-0 text-sm md:text-base">
            Exploring the future of web development, design patterns, and technical deep dives.
          </p>
        </div>

        {/* --- FILTER BAR --- */}
        <div className="sticky top-4 z-40 mb-12">
          <div className="relative p-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-white/10 shadow-xl shadow-slate-200/20 dark:shadow-none ring-1 ring-slate-900/5">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="relative w-full md:w-64 shrink-0 group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-slate-400 group-focus-within:text-sky-500 transition-colors" />
                </div>
                <input
                  type="text"
                  placeholder="Find articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full rounded-xl border-0 py-2.5 pl-10 pr-8 text-slate-900 dark:text-white bg-slate-100/50 dark:bg-slate-800/50 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-sky-500/20 text-xs sm:leading-6 transition-all"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-red-500">
                    <X size={14} />
                  </button>
                )}
              </div>
              <div className="hidden md:block w-px h-6 bg-slate-200 dark:bg-slate-700 mx-2" />
              <div className="flex-1 overflow-x-auto scrollbar-hide pb-1 md:pb-0 -mx-1 px-1">
                <div className="flex items-center gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`relative px-4 py-2 rounded-lg text-[10px] font-bold tracking-wide uppercase whitespace-nowrap transition-all duration-300 ${
                        selectedCategory === cat ? 'text-white' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span className="relative z-10">{cat}</span>
                      {selectedCategory === cat && (
                        <motion.div layoutId="activePill" className="absolute inset-0 rounded-lg bg-slate-900 dark:bg-sky-500" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- GRID RESPONSIVE --- 
            Mobile (<640px): 1 kolom
            Tablet Kecil (sm >640px): 2 kolom
            Tablet/Laptop Kecil (md >768px): 3 kolom  <-- PERUBAHAN DISINI
            Desktop Besar (lg >1024px): 4 kolom      <-- PERUBAHAN DISINI
        */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 min-h-[50vh]">
          <AnimatePresence mode='popLayout'>
            {filteredPosts.map((post, i) => {
              const dateObj = post.publishedAt ? new Date(post.publishedAt) : null;
              const formattedDate = dateObj && isValid(dateObj) ? format(dateObj, 'MMM d, yyyy') : 'Soon';

              return (
                <motion.div
                  key={post.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                >
                  <Link href={`/insight/${post.slug}`} className="group h-full block">
                    <article className="h-full flex flex-col bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-sky-900/20 hover:-translate-y-1">
                      
                      <div className="relative w-full aspect-video overflow-hidden bg-slate-100 dark:bg-slate-800">
                        {post.image ? (
                          <Image src={post.image} alt={post.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-tr from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900">
                            <span className="text-slate-400 text-[10px] font-medium">No Image</span>
                          </div>
                        )}
                        <div className="absolute top-3 left-3">
                          <span className="px-2 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded text-[9px] font-black uppercase tracking-widest text-slate-900 dark:text-white shadow-sm border border-white/20">
                            {post.category}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex-1 p-5 flex flex-col">
                        <div className="flex items-center gap-3 text-[10px] font-medium text-slate-400 mb-3">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formattedDate}
                          </span>
                          <span className="w-0.5 h-0.5 rounded-full bg-slate-300 dark:bg-slate-700" />
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.readingTime?.text}
                          </span>
                        </div>
                        
                        <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white mb-2 leading-snug group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        
                        <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed line-clamp-3 mb-4 flex-grow">
                          {post.description}
                        </p>
                        
                      {/*  <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800/50">
                          <div className="flex items-center gap-1 text-[10px] font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors uppercase tracking-wider">
                            Read <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                          </div>
                        </div>*/}
                      </div>
                    </article>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {filteredPosts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 text-slate-400">
               <Search className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Tidak ada artikel ditemukan</h3>
            <button onClick={() => {setSearchQuery(''); setSelectedCategory('All');}} className="mt-4 text-xs font-bold text-sky-500 hover:underline">
                Clear Filters
            </button>
          </div>
        )}
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const posts = await getAllFilesFrontmatter('insight');
    return { props: { posts } };
  } catch (error) {
    console.error("Error fetching insights:", error);
    return { props: { posts: [] } };
  }
};