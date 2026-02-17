import * as React from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { Hash } from 'lucide-react';
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

  img: ({ src, alt }: MdxImageProps) => {
    if (!src) return null;
    return (
      <figure className="my-10 w-full max-w-3xl mx-auto flex flex-col items-center group">
        <div className="relative w-full aspect-video min-h-[200px] md:min-h-[350px] rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-lg bg-slate-100 dark:bg-slate-900">
          <Zoom>
            <div className="relative w-full aspect-video">
              <Image
                src={src}
                alt={alt || "Article Image"}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 800px"
                priority={false}
              />
            </div>
          </Zoom>
        </div>

        {alt && (
          <figcaption className="mt-3 text-center text-xs text-slate-500 dark:text-slate-400 italic">
            {alt}
          </figcaption>
        )}
      </figure>
    );
  },

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
      className="group relative text-2xl md:text-3xl font-bold my-10 
                 tracking-tight scroll-mt-32"
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
      className="mt-10 mb-4 text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-100 scroll-mt-32"
      {...props}
    />
  ),

  p: (props: MdxProps) => (
    <p
      className="text-base md:text-lg leading-relaxed text-slate-600 dark:text-slate-400 mb-6 font-normal"
      {...props}
    />
  ),

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
      return (
        <Link href={href} {...props}>
          {content}
        </Link>
      );
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {content}
      </a>
    );
  },

  ul: (props: MdxProps) => <ul className="mt-8 mb-10 space-y-4 list-none pl-0" {...props} />,

  li: ({ children, ...props }: MdxProps) => (
    <li className="group flex items-start gap-4 text-slate-600 dark:text-slate-400" {...props}>
      <div className="flex-none pt-[0.65rem]">
        <div
          className="h-[3px] w-4 bg-slate-300 dark:bg-sky-500 
                        rounded-full transition-all duration-500 ease-out
                        group-hover:w-5 group-hover:bg-sky-500 
                        group-hover:shadow-[0_0_12px_rgba(14,165,233,0.8)]"
        />
      </div>
      <div className="flex-1 text-base md:text-lg leading-relaxed transition-colors duration-300 group-hover:text-slate-900 dark:group-hover:text-slate-200">
        {children}
      </div>
    </li>
  ),

  blockquote: (props: MdxProps) => (
    <blockquote
      className="my-12 border-l-4 border-sky-500 bg-slate-50 dark:bg-slate-900/40 
                            px-8 py-8 rounded-r-[2rem] italic text-slate-700 dark:text-slate-300 shadow-inner leading-relaxed"
      {...props}
    />
  ),

  // Ubah bagian pre di dalam mdxComponents menjadi seperti ini:
pre: (props: MdxProps) => {
  // 1. Ambil children dari props
  const { children } = props;

  // 2. Validasi: Jika children bukan elemen React yang valid, kembalikan standar
  if (!React.isValidElement(children)) {
    return (
      <div className="my-10 rounded-[2rem] overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl">
        <pre {...props} />
      </div>
    );
  }

  // 3. Jika valid, oper ke CodeBlock. 
  // CodeBlock biasanya akan membedah children.props.children (teks kodenya)
  return (
    <div className="my-10 rounded-[2rem] overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl">
      <CodeBlock {...props} />
    </div>
  );
},
};
