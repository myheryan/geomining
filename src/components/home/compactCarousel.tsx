'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

// 1. Perbarui Interface agar kompatibel dengan data yang mungkin null
interface CarouselArticle {
  slug: string;
  category: string;
  title: string;
  description: string;
  publishedAt: string | null; // Izinkan null di sini agar tidak error
  readingTime?: string | { text: string };
}

interface CompactCarouselProps {
  articles?: CarouselArticle[];
}

export default function CompactCarousel({ articles = [] }: CompactCarouselProps) {
  const [index, setIndex] = React.useState(0);

  const next = React.useCallback(() => {
    if (articles.length > 0) {
      setIndex((prev) => (prev + 1) % articles.length);
    }
  }, [articles.length]);

  const prev = React.useCallback(() => {
    if (articles.length > 0) {
      setIndex((prev) => (prev - 1 + articles.length) % articles.length);
    }
  }, [articles.length]);

  if (!articles || articles.length === 0) return null;

  return (
    <section className="py-12 bg-white dark:bg-slate-950 overflow-hidden">
      {/* ... (Header Section Tetap Sama) */}

      <div className="relative flex items-center">
        <motion.div 
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={(_, info) => {
            if (info.offset.x < -50) next();
            if (info.offset.x > 50) prev();
          }}
          className="flex cursor-grab active:cursor-grabbing"
          animate={{ x: `calc(-${index * 85}vw - ${index * 16}px + 7.5vw)` }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
        >
          {articles.map((item, i) => {
            const isActive = i === index;
            
            // Helper 1: Pastikan readingTime selalu ada string-nya
            const readingTimeText = typeof item.readingTime === 'object' 
              ? item.readingTime.text 
              : item.readingTime || "3 min read"; // Fallback jika undefined

            // Helper 2: Berikan fallback jika publishedAt bernilai null
            const displayDate = item.publishedAt ?? "No Date";

            return (
              <motion.div
                key={item.slug}
                animate={{ 
                  scale: isActive ? 1 : 0.9, 
                  opacity: isActive ? 1 : 0.3,
                  y: isActive ? 0 : 10
                }}
                className="min-w-[85vw] md:min-w-[400px] bg-slate-50 dark:bg-slate-900/50 rounded-[2rem] p-6 border border-slate-100 dark:border-slate-800 flex flex-col justify-between h-[280px] md:h-[320px] mx-2 shadow-sm"
              >
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[9px] font-black text-sky-500 uppercase tracking-widest bg-sky-500/10 px-2 py-0.5 rounded">
                      {item.category}
                    </span>
                    <Link href={`/insight/${item.slug}`} className="h-8 w-8 rounded-full bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center text-slate-400 hover:text-sky-500 transition-all shadow-sm">
                      <ArrowUpRight size={16} />
                    </Link>
                  </div>
                  
                  <h4 className="text-lg font-bold dark:text-white mb-2 line-clamp-2 tracking-tight">
                    {item.title}
                  </h4>
                  
                  <p className="text-[13px] text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200/50 dark:border-slate-800 flex justify-between items-center text-[9px] font-bold text-slate-400">
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${item.publishedAt ? 'bg-sky-500' : 'bg-slate-300'}`} />
                    {displayDate}
                  </div>
                  <span className="uppercase tracking-tighter">{readingTimeText}</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* ... (Dots Indicator Tetap Sama) */}
    </section>
  );
}