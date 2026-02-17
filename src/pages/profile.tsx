'use client';

import clsx from "clsx";
import { motion } from "framer-motion";
import { 
  MapPin, Mail, Github, Linkedin, Instagram, 
   Terminal, Zap, Briefcase, 
  GraduationCap, ChevronRight
} from "lucide-react";
import Image from "next/image";

import Layout from "@/components/layout";
import HeadMeta from "@/components/headMeta";
import SkillBase from "@/components/profile/skillAbillity";
import ProfileImage from "@/../public/img/profile.png";

// --- DATA CHRONICLES ---
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

const education = [
  {
    school: "University of Technology",
    major: "Computer Science",
    period: "2018 — 2022",
  }
];

/*
const birthYear = 1996; // Ganti dengan tahun lahirmu
  const currentYear = new Date().getFullYear();
  const myAge = currentYear - birthYear; */

export default function AboutPage() {
  return (
    <Layout>
      <HeadMeta templateTitle="About Me" description="Heryanto's Digital Memoir" />

      {/* --- BACKGROUND LAYER --- */}
      <div className="fixed inset-0 -z-10 bg-[#f1ede3] dark:bg-[#05070a] transition-colors duration-700">
        <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.1] bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')]" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-amber-100/20 via-transparent to-sky-900/10 pointer-events-none" />
      </div>

      <main className="mx-auto max-w-7xl px-6 py-30">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* --- LEFT SIDE: THE VINTAGE POLAROID (Folded Effect) --- */}
          <div className="lg:col-span-5 flex flex-col items-center lg:sticky lg:top-32">

            <motion.div 
              className="relative rotate-[-3deg]"
              initial={{ opacity: 0, rotate: -5 }}
              animate={{ opacity: 1, rotate: -2 }}
              transition={{ duration: 1 }}
            >

                                 {/* Masking Tape Decor */}
                <div className="absolute -top-4 left-1/4 w-24 h-8 bg-gray-400/30 backdrop-blur-md rotate-[-4deg] border border-white/20 shadow-sm z-100" />
              {/* POLAROID WITH FOLDED CORNER EFFECT */}
              <div 
                className="relative p-5 pb-20 bg-white shadow-2xl transition-transform duration-500 group"
                style={{
                  // Efek Terlipat (Dog-ear fold) di pojok kanan bawah
                  clipPath: "polygon(0 0, 100% 0, 100% 90%, 90% 100%, 0 100%)",
                }}
              >
                {/* Lipatan Kertas (The Fold) */}
                <div className="absolute bottom-0 right-0 w-8 h-8 bg-slate-200 shadow-[-2px_-2px_10px_rgba(0,0,0,0.1)] transition-all" />

                <div className="relative w-72 h-72 md:w-80 md:h-80 overflow-hidden bg-slate-900">
                  <Image 
                    src={ProfileImage} 
                    alt="Heryanto" 
                    fill 
                    className="object-cover contrast-[1.1] brightness-[1.05] grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700" 
                  />
                </div>
                
                {/* Handwritten Caption (Patrick Hand) */}
                <div className="absolute bottom-6 left-0 right-0 rotate-[-3deg] text-center px-4">
                  <p 
                    className="text-slate-800 text-3xl opacity-90"
                    style={{ fontFamily: "'Patrick Hand', cursive" }}
                  >
                    Heryanto
                  </p>
                </div>

 
              </div>

              {/* Hand-drawn Note (Patrick Hand) */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute left-2 top-28 w-32 h-32 xl:block"
                style={{ fontFamily: "'Patrick Hand', cursive" }}
              >
                <div className="text-sky-600 dark:text-sky-400 rotate-[-15deg] text-xl">
                  Always <br /> Learning! ✨
                </div>
              </motion.div>
            </motion.div>

            {/* Quick Info Styled as Hardware Specs */}
            <div className="mt-16 w-full max-w-xs space-y-4">
               <div className="flex items-center gap-3 text-slate-500 text-[10px] font-mono tracking-[0.2em] uppercase">
                  <Terminal size={12} /> <span>User_Profile_Data</span>
               </div>
               <div className="p-4 rounded-xl bg-white/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-sm space-y-3 shadow-sm">
                  <div className="flex items-center gap-4 text-slate-600 dark:text-slate-400">
                    <MapPin size={16} className="text-sky-500" />
                    <span className="text-xs font-medium uppercase tracking-wider">Ciamis, West Java, ID</span>
                  </div>
                  <div className="flex items-center gap-4 text-slate-600 dark:text-slate-400">
                    <Mail size={16} className="text-sky-500" />
                    <span className="text-xs font-medium uppercase tracking-wider">hello@heryan.me</span>
                  </div>
               </div>
            </div>
          </div>

          {/* --- RIGHT: THE CYBER CODEX (Experience & School) --- */}
          <div className="lg:col-span-7">
            <motion.div 
              className={clsx(
      // Base Layout & Shape
      "relative p-8 md:p-14 rounded-[1.5rem] border transition-all duration-500 overflow-hidden group",

      // --- LIGHT MODE STYLE (Glass Journal) ---
      "bg-white/20 backdrop-blur-md border-white/60 shadow-xl shadow-slate-200/40",

      // --- DARK MODE STYLE (Futuristic Glow) ---
      // 1. Background Kaca Gelap
      "dark:bg-[#000e07]/60 dark:backdrop-blur-2xl",

      // 2. Rim/Border Glow (Garis tepi yang menyala)
      "dark:border-sky-500/30",
      "dark:shadow-[inset_0_0_20px_rgba(14,165,233,0.2)]", // Inner glow halus

      // --- THE AMBIENT GLOW EFFECT (Behind the panel) ---
      // Kita gunakan pseudo-element (::before) untuk membuat cahaya di belakangnya
      "before:absolute before:-inset-[3px] before:-z-10 before:rounded-[3rem] before:transition-opacity duration-500",
      // Gradient cahaya: Biru -> Ungu
      "before:bg-gradient-to-br before:from-sky-500/40 before:via-indigo-500/40 before:to-purple-600/20",
      // Blur tinggi untuk efek pendaran lembut
      "before:blur-3xl",
      // Hanya muncul di Dark Mode
      "before:opacity-0 dark:before:opacity-100",

      // Interaksi Hover: Glow makin terang saat mouse di atasnya
      "dark:hover:border-sky-500/60 dark:hover:shadow-[inset_0_0_30px_rgba(14,165,233,0.4),0_0_50px_rgba(14,165,233,0.2)]"
    )}
  >
              {/* Header */}
              <header className="relative mb-16">
                <div className="flex flex-row items-center gap-3 mb-4">
                  <div className="h-2 w-2 rounded-full bg-sky-500 animate-ping" />

                <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500">Career logs
                </h1>
                </div>
              </header>

              <div className="space-y-16">
                
                {/* 1. EXPERIENCE TIMELINE */}
                <section>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 rounded-2xl bg-sky-500 text-white shadow-lg shadow-sky-500/20">
                      <Briefcase size={20} />
                    </div>
                    <h3 className="text-2xl font-black uppercase tracking-tight text-slate-900 dark:text-white">Experience_Logs</h3>
                  </div>

                  <div className="space-y-8 relative before:absolute before:inset-y-0 before:left-[11px] before:w-px before:bg-slate-200 dark:before:bg-slate-800">
                    {experience.map((item, i) => (
                      <div key={i} className="relative pl-10 group">
                        <div className="absolute left-0 top-1.5 h-6 w-6 rounded-full bg-white dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-800 group-hover:border-sky-500 transition-colors duration-300" />
                        <div className="text-[10px] font-mono font-bold text-sky-500 mb-1">{item.period}</div>
                        <h4 className="text-xl font-bold text-slate-900 dark:text-white">{item.role}</h4>
                        <div className="text-sm font-medium text-slate-400 mb-2">{item.company}</div>
                        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* 2. EDUCATION SECTION */}
                <section>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 rounded-2xl bg-indigo-500 text-white shadow-lg shadow-indigo-500/20">
                      <GraduationCap size={20} />
                    </div>
                    <h3 className="text-2xl font-black uppercase tracking-tight text-slate-900 dark:text-white">Academic_Path</h3>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {education.map((edu, i) => (
                      <div key={i} className="p-6 rounded-3xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 flex items-center justify-between group hover:border-sky-500/30 transition-all">
                        <div className="space-y-1">
                          <h4 className="font-bold text-slate-900 dark:text-white">{edu.school}</h4>
                          <p className="text-sm text-slate-400">{edu.major}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-[10px] font-mono font-bold text-slate-400">{edu.period}</div>
                          <ChevronRight size={16} className="ml-auto mt-2 text-slate-300 group-hover:text-sky-500" />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* 3. TECHNICAL SKILLS */}
                <section>
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-2xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/20">
                        <Zap size={20} />
                      </div>
                      <h3 className="text-2xl font-black uppercase tracking-tight text-slate-900 dark:text-white">Skill_Matrix</h3>
                    </div>
                  </div>
                  
                    <SkillBase />

                </section>

              </div>

              {/* FOOTER ACTIONS */}
              <footer className="mt-20 pt-10 border-t border-slate-100 dark:border-white/5 flex flex-wrap gap-6 items-center justify-between">
                <div className="flex gap-4">
                   {[Github, Linkedin, Instagram].map((Icon, i) => (
                    <a key={i} href="#" className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-800 flex items-center justify-center text-slate-400 hover:text-sky-500 hover:border-sky-500 transition-all group shadow-sm">
                      <Icon size={18} />
                    </a>
                  ))}
                </div>
                
                <button className="px-10 py-4 bg-slate-900 dark:bg-sky-500 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:scale-105 active:scale-95 transition-all">
                  Initialize_Contact
                </button>
              </footer>

            </motion.div>
          </div>
        </div>
      </main>
    </Layout>
  );
}