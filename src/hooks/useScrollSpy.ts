'use client';

import * as React from 'react';

interface ScrollSpyOptions {
  offset?: number;    // Offset dari atas layar (px)
  root?: Element | null;
}

/**
 * Enterprise ScrollSpy Hook with DOM Ready Retry Mechanism
 */
export default function useScrollSpy(
  selectors: string = "h2, h3",
  code: string, // Digunakan sebagai trigger reset saat konten berubah
  options: ScrollSpyOptions = {}
) {
  const [activeSection, setActiveSection] = React.useState<string | null>(null);
  const { offset = 100, root = null } = options;

  const visibleElements = React.useRef<Record<string, boolean>>({});

  const handleIntersect = React.useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      const id = entry.target.id;
      if (id) {
        visibleElements.current[id] = entry.isIntersecting;
      }
    });

    const activeIds = Object.keys(visibleElements.current).filter(
      (id) => visibleElements.current[id]
    );

    if (activeIds.length > 0) {
      // Mengambil elemen terakhir yang intersect agar lebih presisi saat scroll ke bawah
      setActiveSection(activeIds[activeIds.length - 1]);
    }
  }, []);

  React.useEffect(() => {
    // 1. Reset state saat berpindah halaman
    visibleElements.current = {}; 
    setActiveSection(null);

    let observer: IntersectionObserver | null = null;
    let timeoutId: NodeJS.Timeout;

    // 2. Fungsi inisialisasi dengan sistem "Retry"
    const initObserver = (retries = 5) => {
      const elements = Array.from(document.querySelectorAll(selectors));
      
      // Jika elemen belum ada di DOM (karena MDX masih proses render)
      if (elements.length === 0) {
        if (retries > 0) {
          // Coba cari lagi setelah 100ms
          timeoutId = setTimeout(() => initObserver(retries - 1), 100);
        }
        return;
      }

      // Jika elemen sudah ada, pasang Observer
      observer = new IntersectionObserver(handleIntersect, {
        root,
        // Konfigurasi margin agar hanya menyorot elemen di sepertiga atas layar
        rootMargin: `-${offset}px 0px -60% 0px`, 
        threshold: 0,
      });

      elements.forEach((el) => observer?.observe(el));
    };

    // Mulai inisialisasi dengan jeda awal 50ms untuk memberi ruang Next.js meroute
    timeoutId = setTimeout(() => initObserver(), 50);

    // 3. Cleanup function untuk mencegah memory leak
    return () => {
      if (observer) observer.disconnect();
      clearTimeout(timeoutId);
    };
  }, [selectors, offset, code, root, handleIntersect]);

  return activeSection;
}