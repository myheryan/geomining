import * as React from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { Hash, Quote } from 'lucide-react';
import Callout from './Callout';

// Library untuk zoom gambar
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

const CodeBlock = dynamic(() => import('./CodeBlock'), { ssr: false });

// --- INTERFACES ---
interface MdxProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

interface MdxImageProps {
  src?: string;
  alt?: string;
}

interface MdxAnchorProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string;
}

export const mdxComponents = {
  // --- Komponen Kustom ---
  Callout,
  CodeBlock,

  // --- Typography & Headings ---
  h1: (props: MdxProps) => (
    <h1
      className="text-4xl md:text-5xl font-black tracking-tighter mb-10 mt-4 
                 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-500 
                 dark:from-white dark:via-slate-200 dark:to-slate-500 
                 bg-clip-text text-transparent leading-[1.1]"
      {...props}
    />
  ),

  h2: ({ children, ...props }: MdxProps) => (
    <h2
      className="group relative text-2xl md:text-3xl font-bold mt-16 mb-8 
                 tracking-tight scroll-mt-32 text-slate-900 dark:text-white"
      {...props}
    >
      <span className="absolute -left-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-sky-500 hidden md:block">
        <Hash size={20} />
      </span>
      {children}
      <div className="h-1 w-20 bg-gradient-to-r from-sky-500 to-transparent mt-3 rounded-full opacity-50 transition-all group-hover:w-32" />
    </h2>
  ),

  h3: (props: MdxProps) => (
    <h3
      className="mt-12 mb-6 text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-100 scroll-mt-32"
      {...props}
    />
  ),

  h4: (props: MdxProps) => (
    <h4
      className="mt-10 mb-4 text-lg md:text-xl font-bold text-slate-800 dark:text-slate-200 scroll-mt-32"
      {...props}
    />
  ),

  h5: (props: MdxProps) => (
    <h5
      className="mt-8 mb-4 text-base md:text-lg font-bold text-slate-800 dark:text-slate-300 scroll-mt-32"
      {...props}
    />
  ),

  h6: (props: MdxProps) => (
    <h6
      className="mt-8 mb-4 text-sm md:text-base font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 scroll-mt-32"
      {...props}
    />
  ),

  p: ({ children, ...props }: MdxProps) => {
    const hasImage = React.Children.toArray(children).some((child) => {
      if (React.isValidElement(child)) {
        const childProps = child.props as Record<string, unknown>;
        return child.type === 'img' || child.type === 'figure' || childProps.src;
      }
      return false;
    });

    const pStyles = "text-base md:text-lg leading-relaxed text-slate-600 dark:text-slate-400 mb-6 font-normal";

    if (hasImage) {
      return <div className={pStyles} {...props}>{children}</div>;
    }
    return <p className={pStyles} {...props}>{children}</p>;
  },

  // --- Inline Text Styling ---
  strong: (props: MdxProps) => (
    <strong className="font-bold text-slate-900 dark:text-white" {...props} />
  ),
  
  em: (props: MdxProps) => (
    <em className="italic text-slate-800 dark:text-slate-200" {...props} />
  ),

  del: (props: MdxProps) => (
    <del className="line-through decoration-slate-400 dark:decoration-slate-500 text-slate-400 dark:text-slate-500" {...props} />
  ),

  // Inline Code (Bukan CodeBlock)
  code: (props: MdxProps) => (
    <code 
      className="relative rounded bg-slate-100 dark:bg-slate-800/60 px-[0.4rem] py-[0.2rem] font-mono text-[0.85em] text-sky-600 dark:text-sky-400 font-semibold" 
      {...props} 
    />
  ),

  // --- Link ---
  a: ({ href, children, ...props }: MdxAnchorProps) => {
    const isInternal = href?.startsWith('/');
    const content = (
      <span
        className="relative inline-block font-semibold text-sky-600 dark:text-sky-400 
                   after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full 
                   after:bg-sky-500/30 after:transition-all after:duration-300 hover:after:bg-sky-500 hover:after:h-[2px]"
      >
        {children}
      </span>
    );

    if (isInternal && href) {
      return <Link href={href} {...props}>{content}</Link>;
    }
    return <a href={href} target="_blank" rel="noopener noreferrer" {...props}>{content}</a>;
  },

  // --- Media & Images ---
  img: ({ src, alt }: MdxImageProps) => {
    if (!src) return null;
    return (
      <figure className="my-14 w-full max-w-4xl mx-auto flex flex-col items-center group">
        <div className="relative w-full aspect-video md:aspect-[21/9] rounded-3xl overflow-hidden shadow-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <Zoom>
            <Image
              src={src}
              alt={alt || "Article Image"}
              width={1200}
              height={630}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, 1200px"
              priority={false}
              unoptimized={src.startsWith('http')}
            />
          </Zoom>
        </div>
        {alt && (
          <figcaption className="mt-4 text-center text-sm text-slate-500 dark:text-slate-400 italic px-4">
            {alt}
          </figcaption>
        )}
      </figure>
    );
  },

  // --- Lists ---
  ul: (props: MdxProps) => (
    <ul className="my-8 space-y-4 list-none pl-0" {...props} />
  ),

  ol: (props: MdxProps) => (
    <ol className="my-8 space-y-4 list-decimal pl-6 text-slate-600 dark:text-slate-400 marker:text-sky-500 marker:font-bold" {...props} />
  ),

  li: ({ children, ...props }: MdxProps) => (
    <li className="group flex items-start gap-4 text-slate-600 dark:text-slate-400" {...props}>
      <div className="flex-none pt-[0.65rem] md:hidden"> {/* Hide custom bullet in ordered lists easily if needed, but works for UL */}</div>
      <div className="flex-none pt-[0.65rem] hidden md:block">
        <div className="h-[3px] w-4 bg-slate-300 dark:bg-sky-500/50 
                        rounded-full transition-all duration-500 ease-out
                        group-hover:w-6 group-hover:bg-sky-500 
                        group-hover:shadow-[0_0_12px_rgba(14,165,233,0.8)]" />
      </div>
      <div className="flex-1 text-base md:text-lg leading-relaxed transition-colors duration-300 group-hover:text-slate-900 dark:group-hover:text-slate-200">
        {children}
      </div>
    </li>
  ),

  // --- Blockquotes & Dividers ---
  blockquote: (props: MdxProps) => (
    <blockquote
      className="relative my-12 border-l-4 border-sky-500 bg-slate-50 dark:bg-slate-800/30 
                 px-8 py-8 rounded-r-3xl text-slate-700 dark:text-slate-300 shadow-sm leading-relaxed
                 prose-p:italic prose-p:mb-0"
      {...props}
    >
      <Quote className="absolute top-4 right-6 text-sky-500/10 dark:text-sky-500/20 rotate-180" size={60} />
      <div className="relative z-10">{props.children}</div>
    </blockquote>
  ),

  hr: (props: MdxProps) => (
    <hr className="my-16 border-t border-slate-200 dark:border-slate-800/60 w-2/3 mx-auto" {...props} />
  ),

  // --- Tables ---
  table: (props: MdxProps) => (
    <div className="my-12 w-full overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm no-scrollbar">
      <table className="w-full text-left border-collapse min-w-[600px]" {...props} />
    </div>
  ),

  thead: (props: MdxProps) => (
    <thead className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800" {...props} />
  ),

  tbody: (props: MdxProps) => (
    <tbody className="bg-white dark:bg-slate-900/20 divide-y divide-slate-200 dark:divide-slate-800" {...props} />
  ),

  tr: (props: MdxProps) => (
    <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors" {...props} />
  ),

  th: (props: MdxProps) => (
    <th className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider" {...props} />
  ),

  td: (props: MdxProps) => (
    <td className="px-6 py-4 text-base text-slate-600 dark:text-slate-400 leading-relaxed" {...props} />
  ),

  // --- Code Blocks ---
  pre: (props: MdxProps) => (
    <div className="my-12 rounded-[2rem] overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl group">
      <CodeBlock {...props} />
    </div>
  ),
};