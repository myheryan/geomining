'use client';

import * as React from 'react';
import { format, isValid } from 'date-fns';
import { Calendar, Clock, RotateCcw, Hash, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

// --- Komponen Pembantu (Refined) ---

export const CategoryBadge = ({ children }: { children: string }) => (
  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-sky-400 text-[10px] font-black uppercase tracking-widest hover:bg-sky-500 hover:text-white transition-all duration-300 cursor-pointer group">
    <Layers size={10} className="group-hover:rotate-12 transition-transform" />
    {children}
  </span>
);

export const TagPill = ({ children }: { children: string }) => (
  <span className="inline-flex items-center px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-md hover:border-sky-500/50 hover:text-sky-500 transition-colors cursor-default">
    <Hash size={9} className="mr-1 opacity-50" />
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
}

export const PostHeader = ({ 
  title, 
  category, 
  tags, 
  publishedAt, 
  lastUpdated, 
  readingTime 
}: PostHeaderProps) => {
  
  // Helper Format Tanggal
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return isValid(date) ? format(date, "MMMM dd, yyyy") : null;
  };

  const pubDate = formatDate(publishedAt);
  const upDate = formatDate(lastUpdated);

  return (
    <header className="relative py-8 md:py-10 max-w-4xl mx-auto">
      
      {/* Animasi Masuk Halus */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-start gap-6"
      >
        
        {/* 1. Category & Date Line */}
        <div className="flex flex-wrap items-center gap-4">
          {category && <CategoryBadge>{category}</CategoryBadge>}
          
          {pubDate && (
            <div className="flex items-center gap-2 text-xs font-medium text-slate-400 dark:text-slate-500 pl-4 border-l border-slate-200 dark:border-slate-800">
              <Calendar size={12} className="text-sky-500" />
              <time className="uppercase tracking-wide text-[10px]">{pubDate}</time>
            </div>
          )}
        </div>

        {/* 2. The Title (Besar & Elegan) */}
        <h1 className="tracking-tighter leading-[1.15]">
          {title}
        </h1>

        {/* 3. Meta Info Bar (Reading Time & Updates) */}
        <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 dark:text-slate-400 w-full pb-6 border-b border-slate-100 dark:border-slate-800/60">
          
          {readingTime && (
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-slate-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                {readingTime}
              </span>
            </div>
          )}

          {upDate && (
            <div className="flex items-center gap-2 bg-sky-50 dark:bg-sky-900/10 px-3 py-1 rounded-full border border-sky-100 dark:border-sky-900/30">
              <RotateCcw size={12} className="text-sky-500" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                Updated {upDate}
              </span>
            </div>
          )}
        </div>

        {/* 4. Tags Section */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <TagPill key={tag}>{tag}</TagPill>
            ))}
          </div>
        )}
        
      </motion.div>
    </header>
  );
};