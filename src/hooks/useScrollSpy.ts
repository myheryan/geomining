import * as React from 'react';

interface ScrollSpyOptions {
  offset?: number;    // Offset dari atas layar (px)
  root?: Element | null;
}

/**
 * Enterprise ScrollSpy Hook with Preload Guard
 * Menggunakan requestAnimationFrame untuk memastikan DOM MDX sudah siap.
 */
export default function useScrollSpy(
  selectors: string = "h2, h3",
  code: string, // Digunakan sebagai trigger reset saat konten berubah
  options: ScrollSpyOptions = {}
) {
  const [activeSection, setActiveSection] = React.useState<string | null>(null);
  const { offset = 100, root = null } = options;

  // Ref untuk menyimpan status visibilitas elemen
  const visibleElements = React.useRef<Record<string, boolean>>({});

  const handleIntersect = React.useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      const id = entry.target.id;
      if (id) {
        visibleElements.current[id] = entry.isIntersecting;
      }
    });

    // Ambil semua ID yang sedang terlihat (true)
    const activeIds = Object.keys(visibleElements.current).filter(
      (id) => visibleElements.current[id]
    );

    // Set seksi aktif ke elemen pertama yang terlihat di viewport
    if (activeIds.length > 0) {
      setActiveSection(activeIds[0]);
    }
  }, []);

  React.useEffect(() => {
    // 1. Reset state saat 'code' (konten) berubah
    visibleElements.current = {}; 
    setActiveSection(null);

    let observer: IntersectionObserver | null = null;
    let rafId: number;

    // 2. Preload Guard: Gunakan requestAnimationFrame
    // Ini menunggu 1 frame render agar browser sempat memproses DOM MDX baru
    rafId = requestAnimationFrame(() => {
      const elements = document.querySelectorAll(selectors);
      
      if (elements.length === 0) return;

      observer = new IntersectionObserver(handleIntersect, {
        root,
        // rootMargin: atas kanan bawah kiri
        // Kita gunakan -offset px di atas dan -80% di bawah agar seksi 
        // dianggap aktif saat menyentuh area 20% teratas layar.
        rootMargin: `-${offset}px 0px -80% 0px`,
        threshold: 0,
      });

      elements.forEach((el) => observer?.observe(el));
    });

    // 3. Cleanup
    return () => {
      if (observer) observer.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, [selectors, offset, code, root, handleIntersect]);

  return activeSection;
}