import Link from 'next/link';
import Image from 'next/image';
import { format, isValid } from 'date-fns';
import { Calendar, Clock, ChevronRight, ArrowUpRight } from 'lucide-react';

export default function RelatedPosts({ posts }: { posts: any[] }) {
  // Pastikan ada post, jika tidak return null
  if (!posts || posts.length === 0) return null;

  // Batasi hanya 3 artikel agar layout tetap rapi di footer
  const displayPosts = posts.slice(0, 3);

  return (
    <section className="mt-20 md:mt-32 px-4 max-w-[1200px] mx-auto mb-20">
      
      {/* --- HEADER SECTION --- */}
      <div className="flex items-end justify-between mb-10 border-b border-slate-100 dark:border-slate-800/60 pb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-light tracking-tight text-slate-900 dark:text-slate-100">
            Keep <span className="font-semibold text-sky-500">Reading</span>
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            Artikel terkait yang mungkin menarik bagi Anda.
          </p>
        </div>
        <Link 
          href="/insight" 
          className="group flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-sky-500 transition-colors"
        >
          Lihat Semua
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </div>

      {/* --- GRID CARD (Style Disamakan dengan InsightPage) --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 md:gap-8">
        {displayPosts.map((post) => {
          // Safety Date Logic
          const dateObj = post.publishedAt ? new Date(post.publishedAt) : null;
          const formattedDate = dateObj && isValid(dateObj) 
            ? format(dateObj, "MMM d, yyyy") 
            : "Soon"; 

          return (
            <Link 
              key={post.slug} 
              href={`/insight/${post.slug}`}
              className="group h-full block"
            >
              <article className="h-full flex flex-col bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-sky-900/20 hover:-translate-y-1">
                
                {/* 1. Image Area (Aspect Video) */}
                <div className="relative w-full aspect-video overflow-hidden bg-slate-100 dark:bg-slate-800">
                  {post.image ? (
                    <Image 
                      src={post.image} 
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-tr from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900">
                      <span className="text-slate-400 text-[10px] font-medium">No Image</span>
                    </div>
                  )}
                  
                  {/* Floating Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded text-[9px] font-black uppercase tracking-widest text-slate-900 dark:text-white shadow-sm border border-white/20">
                      {post.category || 'Insight'}
                    </span>
                  </div>
                </div>

                {/* 2. Content Area */}
                <div className="flex-1 p-5 flex flex-col">
                  {/* Meta Info */}
                  <div className="flex items-center gap-3 text-[10px] font-medium text-slate-400 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formattedDate}
                    </span>
                    <span className="w-0.5 h-0.5 rounded-full bg-slate-300 dark:bg-slate-700" />
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readingTime?.text || '3 min read'}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 leading-snug group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed line-clamp-2 mb-4 flex-grow">
                    {post.description}
                  </p>
                </div>

              </article>
            </Link>
          );
        })}
      </div>
    </section>
  );
}