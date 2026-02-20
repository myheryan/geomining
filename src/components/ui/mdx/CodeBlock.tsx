'use client';

import { useState, isValidElement, ReactNode } from 'react';
import { Copy, Check } from 'lucide-react';

// Gunakan ReactNode untuk kompatibilitas luas
interface CodeBlockProps {
  children?: ReactNode; 
  filename?: string;
}

interface ChildProps {
  children?: React.ReactNode;
  className?: string;
}
export default function CodeBlock({ children, filename }: CodeBlockProps) {
  const [isCopied, setIsCopied] = useState(false);

const copy = () => {
    if (isValidElement(children)) {
      // Akses langsung dengan casting ke any atau ChildProps
      const codeContent = (children.props as ChildProps).children;
      
      if (typeof codeContent === 'string') {
        navigator.clipboard.writeText(codeContent);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      }
    }
  };

  return (
    <div className="group relative my-6 rounded-xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl">
      {filename && (
        <div className="flex items-center justify-between px-4 py-2 bg-slate-800/50 border-b border-slate-700">
          <span className="text-xs font-mono text-slate-400">{filename}</span>
        </div>
      )}
      
      <button 
        onClick={copy}
        type="button"
        aria-label="Copy code"
        className="absolute right-4 top-4 p-2 rounded-md bg-slate-800 text-slate-400 opacity-0 group-hover:opacity-100 transition-all hover:bg-slate-700 z-10"
      >
        {isCopied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
      </button>

      <div className="p-4 overflow-x-auto text-sm leading-relaxed font-mono">
        {/* Render tag <code> yang dikirim oleh MDX */}
        {children}
      </div>
    </div>
  );
}