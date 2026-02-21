'use client';

import * as React from 'react';
import Link from 'next/link';
import { 
  Instagram, 
  Linkedin, 
  Mail, 
  MapPin,
  Building2,
  ArrowUpRight,
} from 'lucide-react';
import { WhatsappIcon } from "@/components/ui/icon-svg";

export default function Footer() {
  return (
    <footer className="relative bg-[#020617] pt-20 pb-10 overflow-hidden border-t border-slate-800/50 font-sans">
      
      {/* --- AMBIENT GLOW EFFECTS --- */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-px bg-gradient-to-r from-transparent via-sky-500/40 to-transparent" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 max-w-full relative z-10">
        
        {/* --- MAIN CONTENT GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8">
          
          {/* LEFT COLUMN: Brand & Address */}
          <div className="md:col-span-7 lg:col-span-8 flex flex-col space-y-8">
            {/* Logo */}
            <Link href="/" className="inline-flex items-center gap-3 group w-fit">
              <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-500 border border-sky-500/20 group-hover:bg-sky-500 group-hover:text-white group-hover:shadow-[0_0_20px_rgba(14,165,233,0.4)] transition-all duration-500">
                <Building2 size={24} strokeWidth={2} />
              </div>
              <span className="text-2xl md:text-3xl font-black tracking-tighter text-white uppercase">
                GEOMINING<span className="text-sky-500">.</span>
              </span>
            </Link>
            
            {/* Company Info */}
            <div className="space-y-4 max-w-md">
              <h3 className="text-lg font-semibold text-slate-200">
                PT. Karya Nusa Geomining
              </h3>
              <div className="flex items-start gap-3.5 text-slate-400">
                <div className="mt-1 p-1.5 rounded-lg bg-white/5 border border-white/10 shrink-0">
                  <MapPin size={24} className="text-sky-400" />
                </div>
                <p className="flex-1 leading-relaxed text-sm md:text-base">
                  Wirausaha Building - Lt.1 Unit.104 <br />
                  Jl. HR.Rasuna Said Kav.C-5, 
                  Setiabudi, Jakarta Selatan
                </p>
              </div>
                <div className="flex items-center gap-3.5 text-slate-400">
                <a 
  href="https://wa.me/628133333073" 
  target="_blank" 
  rel="noopener noreferrer"
  className="flex items-center gap-3.5 text-slate-400 hover:text-emerald-400 transition-colors duration-300 group"
> <div className="mt-1 p-1.5 rounded-lg bg-white/5 border border-white/10 shrink-0 group-hover:border-emerald-400/50 transition-colors">
    <WhatsappIcon className='text-emerald-400' />
  </div>               <p className="flex-1 leading-relaxed text-sm md:text-base">
                 +6281 3333 3073
                </p></a>

              </div>
            </div>
                        {/* Social Icons */}
            <div className="flex items-center gap-3">
              <SocialLink icon={<Linkedin size={18} />} href="https://www.linkedin.com/in/geomining-id-37b274387/" ariaLabel="LinkedIn" />
              <SocialLink icon={<Instagram size={18} />} href="https://www.instagram.com/geomining.id" ariaLabel="Instagram Geomining" />
              <SocialLink icon={<Mail size={18} />} href="mailto:support@geomining.id" ariaLabel="Email" />
            </div>
          </div>

          {/* RIGHT COLUMN: Contact */}
          <div className="md:col-span-5 lg:col-span-4 flex flex-col space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono text-sky-500 uppercase tracking-widest">
              <span className="w-8 h-px bg-sky-500/50"></span>
              <span>Hubungi Kami</span>
            </div>
            
            <div className="flex flex-col gap-3">
              <ContactCard 
                email="support@geomining.id" 
                label="Customer Support" 
              />
              <ContactCard 
                email="legal@geomining.id" 
                label="Legal & Inquiries" 
              />
            </div>
          </div>
          
        </div>

        {/* --- BOTTOM BAR & DISCLAIMER --- */}
        <div className="mt-16 md:mt-20 pt-8 border-t border-white/10 flex flex-col gap-6 md:gap-8">
          
          {/* Legal Disclaimer (Sekarang di atas) */}
          <div className="text-[10px] sm:text-xs mx-auto text-justify text-slate-500/60 leading-relaxed text-center md:text-left max-w-6xl">
            <span className="font-semibold text-slate-500/80 uppercase tracking-wider mr-1">Disclaimer:</span> 
            Informasi yang terdapat pada situs web ini disediakan hanya untuk tujuan informasi umum. PT. Karya Nusa Geomining berhak mengubah, memperbarui, atau menghapus informasi sewaktu-waktu tanpa pemberitahuan sebelumnya. Kami tidak bertanggung jawab atas kerugian, kerusakan, atau konsekuensi hukum yang mungkin timbul akibat penggunaan atau ketergantungan pada informasi yang disajikan di situs ini.
          </div>

          {/* Copyright & Socials (Sekarang di paling bawah) */}
          <div className="mx-auto gap-6 pt-4 md:pt-6 border-t border-white/5">
            <p className="text-slate-500 text-xs md:text-sm font-medium text-center md:text-left">
              © {new Date().getFullYear()} PT. Karya Nusa Geomining. All Rights Reserved.
            </p>

          </div>

        </div>
      </div>
    </footer>
  );
}

// --- SUB-COMPONENT: CONTACT CARD ---
function ContactCard({ email, label }: { email: string; label: string }) {
  return (
    <a 
      href={`mailto:${email}`}
      className="group flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-sky-500/10 hover:border-sky-500/30 transition-all duration-300"
    >
      <div className="flex flex-col">
        <span className="text-[10px] md:text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">
          {label}
        </span>
        <span className="text-sm md:text-base text-slate-200 group-hover:text-sky-400 transition-colors font-mono">
          {email}
        </span>
      </div>
      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-sky-500 group-hover:text-white text-slate-400 transition-all duration-300">
        <ArrowUpRight size={16} />
      </div>
    </a>
  );
}

// --- SUB-COMPONENT: REUSABLE SOCIAL LINK ---
function SocialLink({ icon, href, ariaLabel }: { icon: React.ReactNode; href: string; ariaLabel: string }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:border-sky-500/50 hover:text-white hover:bg-sky-500/20 hover:shadow-[0_0_15px_rgba(14,165,233,0.2)] transition-all duration-300 group"
    >
      <div className="group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
    </a>
  );
}