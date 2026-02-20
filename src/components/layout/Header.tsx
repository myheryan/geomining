'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Home, LayoutGrid, Info, Send, Sun, Moon, Menu } from 'lucide-react';
import { clsx } from 'clsx';

const navLinks = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Insight', href: '/insight', icon: LayoutGrid },
  { name: 'Profile', href: '/profile', icon: Info },
  { name: 'Projects', href: '/projects', icon: Send },
];

export default function Header() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  React.useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <>
      <header
        className={clsx(
          'fixed top-0 inset-x-0 z-[100] transition-all duration-500',
          scrolled 
            ? 'py-3 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl border-b border-slate-200/50 dark:border-white/5' 
            : 'py-6 bg-transparent'
        )}
      >
        <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between">
            
                      {/* LOGO */}
          <Link href="/" className="relative h-12 w-48 transition-transform active:scale-95">
            <Image 
              src="/img/logogeo.png" 
              alt="geomining" 
              fill 
              priority
              className="object-contain object-left"
            />
          </Link>

            {/* DESKTOP INTEGRATED NAV (Menu + Toggle) */}
            <div className="hidden md:flex items-center gap-1 p-1 bg-slate-200/40 dark:bg-white/5 backdrop-blur-md rounded-2xl border border-slate-200/50 dark:border-white/10">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={clsx(
                      'relative px-4 py-2 rounded-xl text-[13px] font-bold transition-all duration-300',
                      isActive ? 'text-sky-500' : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                    )}
                  >
                    <span className="relative z-10">{link.name}</span>
                    {isActive && (
                      <motion.div
                        layoutId="nav-active"
                        className="absolute inset-0 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200/50 dark:border-white/5"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </Link>
                );
              })}

              {/* INTEGRATED TOGGLE - Part of the same dock */}
              <div className="w-px h-4 bg-slate-300 dark:bg-slate-700 mx-1" />
              {mounted && (
                <button
                  onClick={toggleTheme}
                  className="relative h-8 w-8 flex items-center justify-center rounded-lg hover:bg-white dark:hover:bg-slate-800 transition-all text-slate-500 hover:text-sky-500"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={theme}
                      initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                      animate={{ opacity: 1, rotate: 0, scale: 1 }}
                      exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                    >
                      {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                    </motion.div>
                  </AnimatePresence>
                </button>
              )}
            </div>

            {/* MOBILE MENU TRIGGER */}
            <button
              onClick={() => setIsOpen(true)}
              className="flex md:hidden h-10 w-10 items-center justify-center rounded-xl bg-sky-500 text-white shadow-lg shadow-sky-500/20"
            >
              <Menu size={20} />
            </button>
          </nav>
        </div>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[110] bg-slate-950/40 backdrop-blur-sm"
            />

            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 150 }}
              className="fixed inset-x-0 bottom-0 z-[120] bg-white dark:bg-slate-950 rounded-t-[2.5rem] p-8 pb-12 border-t border-slate-200 dark:border-slate-800"
            >
              <div className="mx-auto w-12 h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 mb-8" />

              <div className="grid grid-cols-1 gap-2">
                {navLinks.map((link, i) => {
                  const Icon = link.icon;
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={i}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={clsx(
                        'flex items-center gap-4 p-4 rounded-2xl transition-all border',
                        isActive 
                          ? 'bg-sky-50 border-sky-100 dark:bg-sky-500/10 dark:border-sky-500/20 text-sky-600 dark:text-sky-400' 
                          : 'bg-slate-50 border-transparent dark:bg-slate-900 dark:text-slate-400'
                      )}
                    >
                      <div className={clsx('h-10 w-10 rounded-xl flex items-center justify-center', isActive ? 'bg-sky-500 text-white' : 'bg-white dark:bg-slate-800')}>
                        <Icon size={18} />
                      </div>
                      <span className="font-bold text-sm">{link.name}</span>
                    </Link>
                  );
                })}

                {/* MOBILE INTEGRATED TOGGLE - Styled as a Menu Item */}
                <button
                  onClick={toggleTheme}
                  className="mt-2 flex items-center justify-between p-4 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-transparent text-slate-600 dark:text-slate-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center text-sky-500">
                      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                    </div>
                    <span className="font-bold text-sm">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                  </div>
                  {/* Visual Switch ala iOS */}
                  <div className="h-6 w-11 rounded-full bg-slate-300 dark:bg-sky-500 relative transition-colors p-1">
                    <motion.div 
                      animate={{ x: theme === 'dark' ? 20 : 0 }}
                      className="h-4 w-4 bg-white rounded-full shadow-sm"
                    />
                  </div>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}