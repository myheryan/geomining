
import Image from 'next/image';
import { format, isValid } from 'date-fns';
import { Calendar, Clock, RotateCcw, Hash, Layers, User } from 'lucide-react';
import { motion } from 'framer-motion';

// --- Komponen Pembantu ---

export const CategoryBadge = ({ children }: { children: string }) => (
  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-sky-400 text-[10px] sm:text-xs font-black uppercase tracking-widest hover:bg-sky-500 hover:text-white transition-all duration-300 cursor-pointer group">
    <Layers size={12} className="group-hover:rotate-12 transition-transform" />
    {children}
  </span>
);

export const TagPill = ({ children }: { children: string }) => (
  <span className="inline-flex items-center px-3 py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-lg hover:border-sky-500/50 hover:text-sky-500 transition-colors cursor-default">
    <Hash size={10} className="mr-1.5 opacity-50" />
    {children}
  </span>
);

// --- Main Component ---

interface PostHeaderProps {
  title: string;
  category?: string;
  tags?: string[];
  publishedAt: string;
  lastUpdated?: string;
  readingTime?: string;
  author?: string;
  authorAvatar?: string;
}

export const PostHeader = ({ 
  title, 
  category, 
  publishedAt, 
  lastUpdated, 
  readingTime,
  author = "Heryan", 
  authorAvatar = "/img/avatar-admin-geo.png" 
}: PostHeaderProps) => {
  
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return isValid(date) ? format(date, "MMMM dd, yyyy") : null;
  };

  const pubDate = formatDate(publishedAt);
  const upDate = formatDate(lastUpdated);

  return (
    <header className="relative py-8 md:py-12 mx-auto">
      
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-start gap-6 md:gap-8"
      >
        
        {/* 1. Category */}
        <div className="flex flex-wrap items-center gap-4">
          {category && <CategoryBadge>{category}</CategoryBadge>}
        </div>

        {/* 2. The Title (Responsive text size) */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.2] md:leading-[1.15] text-slate-900 dark:text-white">
          {title}
        </h1>

        {/* 3. Meta Info Bar (Responsive Flexbox) */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 w-full pb-8 border-b border-slate-200 dark:border-slate-800/80">
          
          {/* GRUP KIRI: Author & Date */}
          <div className="flex items-center gap-4">
            <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-slate-100 dark:border-slate-800 shrink-0 shadow-sm">
              {authorAvatar ? (
                <Image 
                  src={authorAvatar} 
                  alt={author} 
                  fill
                  sizes="(max-width: 768px) 40px, 48px"
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                  <User size={18} className="text-slate-400" />
                </div>
              )}
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-sm md:text-base font-bold text-slate-900 dark:text-slate-100">{author}</span>
              {pubDate && (
                <div className="flex items-center gap-1.5 mt-0.5 text-slate-500 dark:text-slate-400">
                  <Calendar size={12} className="hidden sm:block opacity-70" />
                  <time className="text-[11px] md:text-xs font-medium uppercase tracking-wider">{pubDate}</time>
                </div>
              )}
            </div>
          </div>

          {/* GRUP KANAN: Reading Time & Updated Date */}
          <div className="flex flex-wrap items-center gap-3 md:gap-4 md:justify-end">
            {readingTime && (
              <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/40 px-3 py-1.5 md:px-4 md:py-2 rounded-lg border border-slate-200 dark:border-slate-700/50">
                <Clock size={14} className="text-slate-400 dark:text-slate-500" />
                <span className="text-[11px] md:text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  {readingTime}
                </span>
              </div>
            )}

            {upDate && (
              <div className="flex items-center gap-2 bg-sky-50 dark:bg-sky-500/10 px-3 py-1.5 md:px-4 md:py-2 rounded-lg border border-sky-100 dark:border-sky-500/20">
                <RotateCcw size={14} className="text-sky-500" />
                <span className="text-[11px] md:text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                  Updated {upDate}
                </span>
              </div>
            )}
          </div>

        </div>

        
      </motion.div>
    </header>
  );
};