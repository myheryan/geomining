'use client';

import clsx from "clsx";
import { motion } from "framer-motion";
import { 
  MapPin, Mail, Github, Linkedin, Instagram, 
  Terminal, Zap, Briefcase, 
  GraduationCap, ChevronRight, Paperclip, Bookmark
} from "lucide-react";
import Image from "next/image";

import Layout from "@/components/layout";
import HeadMeta from "@/components/headMeta";
import SkillBase from "@/components/profile/skillAbillity";
import ProfileImage from "@/../public/img/profile.png";

// --- DATA CHRONICLES (Tetap Sama) ---
const experience = [
  {
    role: "Full-Stack Developer",
    company: "Freelance / Self-Employed",
    period: "2022 — Present",
    desc: "Membangun solusi web kustom untuk klien internasional dengan fokus pada skalabilitas."
  },
  {
    role: "Backend Engineer",
    company: "Tech Solutions ID",
    period: "2020 — 2022",
    desc: "Optimasi database dan integrasi API untuk platform e-commerce skala menengah."
  }
];

export default function AboutPage() {
  return (
    <Layout>
      <HeadMeta templateTitle="About Me" description="Heryanto's Digital Memoir" />

      {/* --- BACKGROUND LAYER: Kertas Bertekstur --- */}
      <div className="fixed inset-0 -z-10 bg-[#f4f1ea] dark:bg-[#0a0c10] transition-colors duration-700">
        <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />
        {/* Dekorasi Garis Buku Tulis di Sisi Kiri */}
        <div className="absolute left-10 inset-y-0 w-px bg-red-200/40 hidden lg:block" />
        <div className="absolute left-12 inset-y-0 w-px bg-red-200/40 hidden lg:block" />
      </div>

      <main className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* --- LEFT SIDE: THE VINTAGE POLAROID --- */}
          <div className="lg:col-span-5 flex flex-col items-center lg:sticky lg:top-32">
            <motion.div 
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Masking Tape (Selotip Transparan) */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-28 h-10 bg-sky-500/10 backdrop-blur-sm border border-sky-500/5 rotate-[-2deg] z-20 shadow-sm" />

              {/* POLAROID FRAME */}
              <div className="relative p-4 pb-16 bg-white shadow-[10px_10px_0px_rgba(0,0,0,0.03)] rotate-[-2deg] border border-slate-100">
                <div className="relative w-72 h-72 md:w-80 md:h-80 overflow-hidden bg-slate-100">
                  <Image 
                    src={ProfileImage} 
                    alt="Heryanto" 
                    fill 
                    className="object-cover contrast-[1.05] sepia-[0.1]" 
                  />
                  {/* Efek Cahaya Bocor (Light Leak) ala Scrapbook */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 to-transparent pointer-events-none" />
                </div>
                
                {/* Caption Tulis Tangan */}
                <div className="absolute bottom-4 left-0 right-0 text-center">
                  <p className="text-slate-700 text-3xl font-handwriting italic" style={{ fontFamily: "'Patrick Hand', cursive" }}>
                    Me, 2026.
                  </p>
                </div>
              </div>

              {/* Sticky Note Kecil */}
              <motion.div 
                className="absolute -right-12 top-10 w-24 h-24 bg-yellow-100 dark:bg-amber-900/30 p-3 shadow-md rotate-12 flex items-center justify-center text-center border-l-4 border-yellow-400"
                style={{ fontFamily: "'Patrick Hand', cursive" }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1 }}
              >
                <span className="text-yellow-700 dark:text-yellow-200 text-sm leading-tight">Keep <br/> Creating!</span>
              </motion.div>
            </motion.div>

            {/* Quick Info: Bergaya Memo Klip */}
            <div className="mt-20 w-full max-w-xs relative rotate-1">
              <div className="absolute -top-6 left-4 z-20 text-slate-400 -rotate-12">
                <Paperclip size={24} />
              </div>
              <div className="p-6 bg-white dark:bg-slate-900 border-2 border-dashed border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <div className="flex items-center gap-4 text-slate-600 dark:text-slate-400">
                  <MapPin size={16} className="text-red-400" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Ciamis, West Java</span>
                </div>
                <div className="flex items-center gap-4 text-slate-600 dark:text-slate-400">
                  <Mail size={16} className="text-sky-400" />
                  <span className="text-[10px] font-bold uppercase tracking-widest leading-none">hello@heryan.me</span>
                </div>
              </div>
            </div>
          </div>

          {/* --- RIGHT SIDE: THE JOURNAL --- */}
          <div className="lg:col-span-7">
            <motion.div 
              className="relative bg-[#fdfcf8] dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 md:p-16 shadow-[15px_15px_0px_rgba(0,0,0,0.04)] rounded-sm"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              {/* Bookmark Decor */}
              <div className="absolute top-0 right-10 w-8 h-12 bg-red-400 dark:bg-red-600 flex items-end justify-center pb-2 text-white">
                <Bookmark size={14} fill="white" />
              </div>

              <header className="mb-16">
                <h1 className="text-4xl font-serif italic text-slate-900 dark:text-white border-b-2 border-slate-100 dark:border-slate-800 pb-4 inline-block">
                  Career Chronicles
                </h1>
              </header>

              <div className="space-y-20">
                {/* 1. EXPERIENCE */}
                <section className="relative">
                  <div className="flex items-center gap-4 mb-10">
                    <h3 className="text-xs font-black uppercase tracking-[0.3em] text-sky-500 bg-sky-50 px-2 py-1">Timeline.log</h3>
                  </div>

                  <div className="space-y-12">
                    {experience.map((item, i) => (
                      <div key={i} className="group relative pl-8 border-l border-slate-200 dark:border-slate-800">
                        <div className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-slate-300 dark:bg-slate-700 group-hover:bg-sky-500 transition-colors" />
                        <span className="text-[10px] font-mono text-slate-400 uppercase">{item.period}</span>
                        <h4 className="text-xl font-bold text-slate-900 dark:text-white mt-1">{item.role}</h4>
                        <p className="text-sky-600 dark:text-sky-400 text-xs font-bold mb-3 tracking-wide">{item.company}</p>
                        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed italic">"{item.desc}"</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* 2. SKILLS - Matrix Gaya Kartu Indeks */}
                <section>
                   <h3 className="text-xs font-black uppercase tracking-[0.3em] text-emerald-500 mb-8">Technical_Inventory</h3>
                   <div className="bg-slate-50/50 dark:bg-slate-800/50 p-6 rounded-sm border border-slate-100 dark:border-slate-800 border-dashed">
                      <SkillBase />
                   </div>
                </section>
              </div>

              {/* FOOTER: Bergaya Lembaran Kontak Terpisah */}
              <footer className="mt-20 pt-12 border-t border-dashed border-slate-200 dark:border-slate-800 flex flex-wrap justify-between items-center gap-8">
                <div className="flex gap-3">
                   {[Github, Linkedin, Instagram].map((Icon, i) => (
                    <a key={i} href="#" className="w-10 h-10 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-500 hover:text-sky-500 hover:-translate-y-1 transition-all shadow-sm">
                      <Icon size={16} />
                    </a>
                  ))}
                </div>
                
                <button className="px-8 py-3 bg-slate-900 dark:bg-sky-600 text-white font-bold text-[10px] uppercase tracking-[0.2em] shadow-[5px_5px_0px_#0ea5e9] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
                  Contact.init()
                </button>
              </footer>
            </motion.div>
          </div>
        </div>
      </main>
    </Layout>
  );
}