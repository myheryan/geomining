'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { List, X } from 'lucide-react';
import TableOfContents from './TableOfContents';

// 1. Definisikan Interface yang konsisten dengan komponen TableOfContents
interface TOCItem {
  id: string;
  level: number;
  text: string;
}

interface MobileTOCProps {
  toc: TOCItem[];
  activeSection: string | null;
  minLevel: number;
}

export default function MobileTOC({ toc, activeSection, minLevel }: MobileTOCProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  // Tutup menu otomatis saat link diklik
  React.useEffect(() => {
    setIsOpen(false);
  }, [activeSection]);

  // Hindari render jika TOC kosong
  if (!toc || toc.length === 0) return null;

  return (
    <div className="lg:hidden">
      {/* 1. Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-sky-500 text-white shadow-lg shadow-sky-500/40 transition-transform active:scale-90 hover:bg-sky-600"
        aria-label="Open Table of Contents"
      >
        <List className="h-6 w-6" />
      </button>

      {/* 2. Backdrop & Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Gelap */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[60] bg-slate-900/60 backdrop-blur-sm"
            />

            {/* Bottom Sheet Menu */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-x-0 bottom-0 z-[70] max-h-[85vh] overflow-hidden rounded-t-[2.5rem] bg-white p-8 dark:bg-slate-900 shadow-2xl"
            >
              {/* Handle Bar untuk indikator swipe-down (visual saja) */}
              <div className="absolute top-3 left-1/2 h-1.5 w-12 -translate-x-1/2 rounded-full bg-slate-200 dark:bg-slate-800" />

              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
                  Navigasi <span className="text-sky-500 underline decoration-sky-500/30">Artikel</span>
                </h2>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="rounded-full bg-slate-100 p-2 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="overflow-y-auto pb-12 max-h-[60vh] scrollbar-hide">
                <TableOfContents 
                  toc={toc} 
                  activeSection={activeSection} 
                  minLevel={minLevel} 
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}