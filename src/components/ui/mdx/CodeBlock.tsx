'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export default function CodeBlock({ children, filename }: { children: any, filename?: string }) {
  const [isCopied, setIsCopied] = useState(false);

  const copy = () => {
    const text = children.props.children;
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
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
        className="absolute right-4 top-4 p-2 rounded-md bg-slate-800 text-slate-400 opacity-0 group-hover:opacity-100 transition-all hover:bg-slate-700"
      >
        {isCopied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
      </button>

      <div className="p-4 overflow-x-auto text-sm leading-relaxed font-mono">
        {children}
      </div>
    </div>
  );
}