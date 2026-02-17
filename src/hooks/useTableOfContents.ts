import * as React from 'react';

export interface Heading {
  id: string;
  level: number;
  text: string;
}

export function useTableOfContents(contentDependency: any) {
  const [toc, setToc] = React.useState<Heading[]>([]);

  React.useEffect(() => {
    const headings = Array.from(document.querySelectorAll(".mdx h1, .mdx h2, .mdx h3"));
    const headingData = headings.map((heading) => ({
      id: heading.id,
      level: Number(heading.tagName.replace("H", "")),
      text: heading.textContent || "",
    })).filter(h => h.id);

    setToc(headingData);
  }, [contentDependency]);

  const minLevel = toc.length > 0 ? Math.min(...toc.map((h) => h.level)) : 0;

  return { toc, minLevel };
}