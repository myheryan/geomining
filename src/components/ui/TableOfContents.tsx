'use client';

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import { ChevronRight, Hash } from "lucide-react";

interface TOCItem {
  id: string;
  level: number;
  text: string;
}

interface TableOfContentsProps {
  toc: TOCItem[];
  activeSection: string | null;
  minLevel: number;
}

export default function TableOfContents({
  toc,
  activeSection,
  minLevel,
}: TableOfContentsProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const itemRefs = React.useRef<Map<string, HTMLAnchorElement>>(new Map());

  // 1. STATE UNTUK POSISI GARIS (Agar tidak baca ref saat render)
  const [lineStyle, setLineStyle] = React.useState({ height: 0, top: 0 });

  const activeIndex = toc.findIndex((item) => item.id === activeSection);
  const progress = toc.length > 0 ? Math.max(0, ((activeIndex + 1) / toc.length) * 100) : 0;

  // 2. KALKULASI POSISI DI DALAM EFFECT
  React.useLayoutEffect(() => {
    if (activeSection) {
      const activeElement = itemRefs.current.get(activeSection);
      if (activeElement) {
        setLineStyle({
          height: activeElement.offsetHeight,
          top: activeElement.offsetTop,
        });

        // Auto-scroll sidebar
        if (containerRef.current) {
          const container = containerRef.current;
          const scrollOffset = activeElement.offsetTop - container.offsetHeight / 2;
          container.scrollTo({ top: scrollOffset, behavior: "smooth" });
        }
      }
    }
  }, [activeSection, toc]);

  if (!toc || toc.length === 0) return null;

  return (
    <div className="flex flex-col space-y-6">
      <div className="px-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">
            On This Page
          </h3>
          <span className="text-[10px] font-mono font-bold text-sky-500 bg-sky-500/10 px-2 py-0.5 rounded">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="h-[2px] w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-sky-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          />
        </div>
      </div>

      <div
        ref={containerRef}
        className="relative max-h-[calc(100vh-25rem)] overflow-y-auto scrollbar-hide px-2"
      >
        <nav className="relative flex flex-col border-l border-slate-100 dark:border-slate-800 ml-4">
          <AnimatePresence>
            {activeSection && (
              <motion.div
                layoutId="active-line"
                className="absolute left-[-1.5px] w-[2px] bg-sky-500 z-10 shadow-[0_0_8px_rgba(14,165,233,0.5)]"
                initial={false}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                // 3. GUNAKAN STYLE DARI STATE
                style={{
                  height: lineStyle.height,
                  top: lineStyle.top,
                }}
              />
            )}
          </AnimatePresence>

          {toc.map(({ id, level, text }) => {
            const isActive = activeSection === id;
            const isSubItem = level > minLevel;

            return (
              <a
                key={id}
                href={`#${id}`}
                ref={(el) => {
                  if (el) itemRefs.current.set(id, el);
                  else itemRefs.current.delete(id);
                }}
                aria-current={isActive ? "location" : undefined}
                className={clsx(
                  "group relative flex items-center py-2.5 pr-4 text-[13px] transition-all duration-300 outline-none",
                  isActive 
                    ? "text-sky-600 dark:text-sky-400 font-bold" 
                    : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-200"
                )}
                style={{ paddingLeft: `${(level - minLevel) * 1.25 + 1}rem` }}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-pill-bg"
                    className="absolute inset-0 bg-sky-500/5 dark:bg-sky-500/10 rounded-r-xl -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}

                <span className="absolute left-0 flex items-center justify-center -translate-x-1/2">
                  {isSubItem ? (
                    <div className={clsx(
                      "w-1 h-1 rounded-full transition-all duration-300",
                      isActive ? "bg-sky-500 scale-150 shadow-[0_0_5px_#0ea5e9]" : "bg-slate-300 dark:bg-slate-700"
                    )} />
                  ) : (
                    <Hash className={clsx(
                      "w-3 h-3 transition-opacity",
                      isActive ? "opacity-100 text-sky-500" : "opacity-0 group-hover:opacity-40"
                    )} />
                  )}
                </span>

                <span className="leading-relaxed line-clamp-2">
                  {text}
                </span>

                {isActive && (
                  <motion.span 
                    initial={{ x: -5, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="ml-auto pl-2"
                  >
                    <ChevronRight className="w-3 h-3" />
                  </motion.span>
                )}
              </a>
            );
          })}
        </nav>
      </div>

      <div className="px-4 pt-4 border-t border-slate-50 dark:border-slate-800">
        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
           <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
           Live Navigation
        </div>
      </div>
    </div>
  );
}