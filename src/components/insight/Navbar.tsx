import * as React from 'react'; // Tambahkan ini di baris pertama
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Navbar() {
  const router = useRouter();
  const pathSegments = router.asPath.split('/').filter((v) => v);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/60 bg-white/80 backdrop-blur-md dark:border-slate-800/60 dark:bg-slate-900/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-xl font-bold tracking-tighter text-slate-900 dark:text-white">
              MY<span className="text-sky-500">INSIGHT</span>
            </Link>
            
            {/* Navigasi Desktop */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
              {['Home', 'Insight', 'Projects'].map((item) => (
                <Link 
                  key={item} 
                  href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                  className="text-slate-500 hover:text-sky-500 transition-colors"
                >
                  {item}
                </Link>
              ))}
            </nav>
          </div>

          <button className="hidden md:block rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white hover:bg-slate-800 dark:bg-sky-500 dark:hover:bg-sky-600 transition-all">
            Get Updates
          </button>
        </div>

        {/* Breadcrumbs - Enterprise Detail */}
        {pathSegments.length > 0 && (
          <div className="flex items-center gap-2 pb-2 text-[10px] uppercase tracking-widest text-slate-400">
            <Link href="/">Home</Link>
            {pathSegments.map((segment, i) => (
              <React.Fragment key={i}>
                <span>/</span>
                <span className={i === pathSegments.length - 1 ? "text-sky-500 font-bold" : ""}>
                  {segment.replace(/-/g, ' ')}
                </span>
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}