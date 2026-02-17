'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { List, X } from 'lucide-react';
import TableOfContents from './TableOfContents'; // Reuse komponen yang sudah ada

export default function MobileTOC({ toc, activeSection, minLevel }: any) {
  const [isOpen, setIsOpen] = React.useState(false);

  // Tutup menu otomatis saat link diklik
  React.useEffect(() => {
    setIsOpen(false);
  }, [activeSection]);

  return (
    <div className="lg:hidden">
      {/* 1. Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-sky-500 text-white shadow-lg shadow-sky-500/40 transition-transform active:scale-90"
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
              className="fixed inset-x-0 bottom-0 z-[70] max-h-[80vh] overflow-hidden rounded-t-[2.5rem] bg-white p-8 dark:bg-slate-900 shadow-2xl"
            >
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Navigasi Artikel</h2>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="rounded-full bg-slate-100 p-2 dark:bg-slate-800"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="overflow-y-auto pb-10">
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