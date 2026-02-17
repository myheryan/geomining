'use client';

import * as React from 'react';
import Link from 'next/link';
import { 
  Github, 
  Instagram, 
  Linkedin, 
  Mail, 
  Zap, 
  Send, 
  Terminal 
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-[#020617] py-16 overflow-hidden border-t border-slate-800/50">
      
      {/* --- AMBIENT GLOW EFFECTS --- */}
      {/* Garis cahaya tipis di atas footer */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-px bg-gradient-to-r from-transparent via-sky-500/50 to-transparent" />
      {/* Pendaran biru di tengah */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-80 bg-sky-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-16">
          
          {/* --- LEFT SECTION: BRAND IDENTITY --- */}
          <div className="flex flex-col items-center md:items-start space-y-5 max-w-sm text-center md:text-left">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="p-2 rounded-xl bg-sky-500/10 text-sky-500 border border-sky-500/20 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(14,165,233,0.3)] transition-all duration-500">
                <Zap size={20} fill="currentColor" />
              </div>
              <span className="text-2xl font-black tracking-tighter text-white uppercase">
                HERYANTO<span className="text-sky-500">.</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed font-light">
              Membangun infrastruktur digital dengan presisi AI dan estetika minimalis. Berbasis di Ciamis, Jawa Barat.
            </p>
          </div>

          {/* --- RIGHT SECTION: NEWSLETTER & SOCIALS --- */}
          <div className="flex flex-col items-center md:items-end gap-8 w-full md:w-auto max-w-xs">
            
            {/* Minimalist Glass Newsletter */}
            <div className="w-full space-y-3">
              <div className="flex items-center justify-center md:justify-end gap-2 text-[10px] font-mono text-slate-500 uppercase tracking-[0.3em]">
                <Terminal size={12} className="text-sky-500" />
                <span>Execute_Subscribe_Protocol</span>
              </div>

              <form className="relative flex items-center gap-2 group">
                <div className="relative flex-grow">
                  <input 
                    type="email" 
                    placeholder="user@domain.dev" 
                    className="peer w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl py-3 pl-5 pr-4 text-xs text-slate-200 outline-none focus:border-sky-500/50 focus:shadow-[0_0_15px_rgba(14,165,233,0.1)] transition-all placeholder:text-slate-600/50 font-mono"
                    required
                  />
                  {/* Blinking Indicator ala AI */}
                  <div className="absolute top-3.5 right-3 w-1.5 h-1.5 bg-sky-500 rounded-full animate-pulse opacity-20 peer-focus:opacity-100 transition-opacity" />
                </div>
                
                <button 
                  type="submit" 
                  className="p-3 rounded-2xl bg-sky-500/10 text-sky-500 border border-sky-500/20 hover:bg-sky-500 hover:text-white hover:border-sky-500 hover:shadow-[0_0_20px_rgba(14,165,233,0.4)] transition-all active:scale-90 shadow-lg"
                >
                  <Send size={18} />
                </button>
              </form>
            </div>

          </div>
        </div>

        {/* --- BOTTOM BAR --- */}
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6 text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em] text-center">
         
                     {/* Integrated Social Icons */}
            <div className="flex gap-4">
              <SocialLink icon={<Github size={18} />} href="https://github.com/kakaheryan" />
              <SocialLink icon={<Linkedin size={18} />} href="https://linkedin.com/in/kakaheryan" />
              <SocialLink icon={<Instagram size={18} />} href="https://instagram.com/kakaheryan" />
              <SocialLink icon={<Mail size={18} />} href="mailto:hello@heryan.me" />
            </div>
          <p>© {new Date().getFullYear()} Heryanto. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

// --- SUB-COMPONENT: REUSABLE SOCIAL LINK ---
function SocialLink({ icon, href }: { icon: React.ReactNode; href: string }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-2xl bg-slate-900/50 border border-slate-800 flex items-center justify-center text-slate-400 hover:border-sky-500/50 hover:text-white hover:bg-sky-500/10 transition-all duration-500 group"
    >
      <div className="group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
    </a>
  );
}