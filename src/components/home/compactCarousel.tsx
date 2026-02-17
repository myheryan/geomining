'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default function CompactCarousel({ articles = [] }: { articles?: any[] }) {
  const [index, setIndex] = React.useState(0);

  // Navigasi Otomatis
  const next = React.useCallback(() => setIndex((prev) => (prev + 1) % articles.length), [articles.length]);
  const prev = React.useCallback(() => setIndex((prev) => (prev - 1 + articles.length) % articles.length), [articles.length]);

  if (!articles.length) return null;

  return (
    <section className="py-12 bg-white dark:bg-slate-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-8 flex justify-between items-end">
        <div>
          <h2 className="text-sky-500 text-[9px] font-black uppercase tracking-[0.3em] mb-1">Featured</h2>
          <h3 className="text-2xl font-black dark:text-white tracking-tighter">Mining Insights</h3>
        </div>
        {/* Progress Counter Mini */}
        <div className="text-[10px] font-mono font-bold text-slate-400">
          {String(index + 1).padStart(2, '0')} / {String(articles.length).padStart(2, '0')}
        </div>
      </div>

      {/* Slider Area */}
      <div className="relative flex items-center">
        <motion.div 
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={(_, info) => {
            if (info.offset.x < -50) next();
            if (info.offset.x > 50) prev();
          }}
          className="flex cursor-grab active:cursor-grabbing"
          // x: -85vw (lebar kartu) + 12px (setengah gap) untuk memposisikan kartu di tengah
          animate={{ x: `calc(-${index * 85}vw - ${index * 16}px + 7.5vw)` }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
        >
          {articles.map((item, i) => {
            const isActive = i === index;
            return (
              <motion.div
                key={item.slug}
                animate={{ 
                  scale: isActive ? 1 : 0.9, 
                  opacity: isActive ? 1 : 0.3,
                  y: isActive ? 0 : 10
                }}
                className="min-w-[85vw] md:min-w-[400px] bg-slate-50 dark:bg-slate-900/50 rounded-[2rem] p-6 border border-slate-100 dark:border-slate-800 flex flex-col justify-between h-[280px] md:h-[320px] mx-2"
              >
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[9px] font-black text-sky-500 uppercase tracking-widest bg-sky-500/10 px-2 py-0.5 rounded">
                      {item.category}
                    </span>
                    <Link href={`/insight/${item.slug}`} className="h-8 w-8 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center text-slate-400">
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
                    <div className="w-1 h-1 rounded-full bg-sky-500" />
                    {item.publishedAt}
                  </div>
                  <span>{item.readingTime?.text || item.readingTime}</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Modern Slim Progress Bar */}
      <div className="max-w-[100px] mx-auto mt-8 flex gap-1.5 h-1">
        {articles.map((_, i) => (
          <div 
            key={i} 
            className={`flex-1 rounded-full transition-all duration-500 ${
              i === index ? 'bg-sky-500' : 'bg-slate-200 dark:bg-slate-800'
            }`} 
          />
        ))}
      </div>
    </section>
  );
}