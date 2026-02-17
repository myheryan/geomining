import * as React from 'react';

// 1. Definisikan Interface yang jelas
export interface Heading {
  id: string;
  level: number;
  text: string;
}

/**
 * Hook untuk mengekstraksi TOC dari DOM
 * @param contentDependency - Biasanya berupa string 'code' dari MDX
 */
export function useTableOfContents(contentDependency: string) {
  const [toc, setToc] = React.useState<Heading[]>([]);

  React.useEffect(() => {
    // Mencari heading di dalam container dengan class .mdx
    const headings = Array.from(document.querySelectorAll(".mdx h1, .mdx h2, .mdx h3"));
    
    const headingData: Heading[] = headings
      .map((heading) => ({
        id: heading.id,
        level: Number(heading.tagName.replace("H", "")),
        text: heading.textContent || "",
      }))
      .filter((h) => h.id); // Hanya ambil yang punya ID (hasil dari rehype-slug)

    setToc(headingData);
  }, [contentDependency]);

  // Kalkulasi level terendah (misal: jika artikel mulai dari H2, maka minLevel = 2)
  const minLevel = toc.length > 0 ? Math.min(...toc.map((h) => h.level)) : 0;

  return { toc, minLevel };
}