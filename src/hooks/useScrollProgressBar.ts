'use client';

import * as React from 'react';

/**
 * Enterprise Reading Progress Hook
 * Menghitung persentase scroll halaman dengan optimasi frame-rate.
 */
export function useScrollProgressBar() {
  const [scrollProgress, setScrollProgress] = React.useState(0);

  const computeProgress = React.useCallback(() => {
    // Menghitung seberapa jauh user telah scroll
    const scrolled = window.scrollY;
    
    // Menghitung total tinggi konten yang bisa di-scroll
    // (Total Tinggi Dokumen - Tinggi Layar Pengguna)
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;

    if (scrollHeight) {
      const progress = (scrolled / scrollHeight) * 100;
      // Memastikan angka berada di rentang 0 - 100
      setScrollProgress(Number(Math.min(100, Math.max(0, progress)).toFixed(2)));
    }
  }, []);

  React.useEffect(() => {
    let requestRunning = false;

    const handleScroll = () => {
      // Optimasi menggunakan requestAnimationFrame
      if (!requestRunning) {
        requestRunning = true;
        window.requestAnimationFrame(() => {
          computeProgress();
          requestRunning = false;
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', computeProgress);

    // Hitung posisi awal saat komponen dimuat
    computeProgress();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', computeProgress);
    };
  }, [computeProgress]);

  return { scrollProgress };
}