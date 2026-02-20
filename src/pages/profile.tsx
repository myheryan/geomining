'use client';

import { motion } from "framer-motion";
import { 
  Mail, Linkedin, 
  Terminal, Zap, ArrowRight,
  ShieldCheck, HardHat, Activity
} from "lucide-react";
import Image from "next/image";

import Layout from "@/components/layout";
import HeadMeta from "@/components/headMeta";
import ProfileImage from "@/../public/img/mentor2.png"; // Pastikan path benar

// --- DATA CHRONICLES ---
const experience = [
  {
    role: "Senior Mining Technology Engineer",
    company: "Major Mining Corporation",
    period: "2020 — Present",
    desc: "Memimpin integrasi digital pada operasional tambang terbuka. Spesialisasi dalam implementasi Fleet Management System (FMS) dan otomatisasi data sensor untuk efisiensi produksi."
  },
  {
    role: "Geotechnical System Specialist",
    company: "Engineering Consultant Group",
    period: "2017 — 2020",
    desc: "Fokus pada analisis stabilitas lereng menggunakan instrumen geoteknik tingkat lanjut dan pemodelan numerik untuk mitigasi risiko longsor."
  }
];

const stats = [
  { label: "Experience", val: "8+ Years" },
  { label: "Safety Record", val: "100%" },
  { label: "Cost Savings", val: "25%" },
  { label: "Tech Projects", val: "12+" }
];

export default function AboutPage() {
  return (
    <Layout>
      <HeadMeta templateTitle="Expertise Profile" description="Heryanto - Mining Technology Expert" />

      <main className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        
        {/* --- HERO SECTION --- */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-32">
          <div className="lg:col-span-7 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-2 text-sky-600 dark:text-sky-500 font-bold tracking-[0.3em] uppercase text-[10px]">
                <HardHat size={14} /> Mining Technology Expert
              </div>
              <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-slate-900 dark:text-white leading-[0.85]">
                Engineering <br /> The Future.
              </h1>
              <p className="text-xl text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed">
                Heryanto menggabungkan ilmu geoteknik presisi dengan inovasi teknologi untuk memastikan operasional tambang yang aman, efisien, dan berkelanjutan.
              </p>
            </motion.div>

            <div className="flex flex-wrap gap-6 pt-4">
              <button className="px-10 py-4 bg-slate-900 dark:bg-orange-600 text-white font-bold text-xs uppercase tracking-widest rounded-none shadow-xl hover:bg-orange-500 transition-all active:scale-95">
                Technical Resume
              </button>
              <div className="flex items-center gap-6 border-l border-slate-200 dark:border-slate-800 pl-8">
                <Linkedin size={20} className="text-slate-400 hover:text-blue-600 cursor-pointer transition-colors" />
                <Mail size={20} className="text-slate-400 hover:text-sky-600 cursor-pointer transition-colors" />
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <motion.div 
              className="relative aspect-[4/5] overflow-hidden bg-slate-100 dark:bg-slate-900 rounded-3xl border-[12px] border-white dark:border-slate-800 shadow-2xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Image 
                src={ProfileImage} 
                alt="Heryanto Mining Engineer" 
                fill 
                className="object-cover contrast-[1.1] transition-all duration-1000" 
              />
            </motion.div>
          </div>
        </section>

        {/* --- STATS SECTION --- */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 border-y border-slate-100 dark:border-slate-800 mb-32">
          {stats.map((stat, i) => (
            <div key={i} className="text-center md:text-left space-y-1">
              <div className="text-4xl font-black text-slate-900 dark:text-white">{stat.val}</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">{stat.label}</div>
            </div>
          ))}
        </section>

        {/* --- CONTENT GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          
          {/* LEFT: EXPERTISE & TOOLS */}
          <div className="lg:col-span-4 space-y-16">
            <div className="space-y-8">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-sky-500">Core Expertise</h3>
              <div className="space-y-4">
                {[
                  { label: "Slope Stability Analysis", icon: Activity },
                  { label: "IoT Sensor Integration", icon: Zap },
                  { label: "Safety Management", icon: ShieldCheck },
                  { label: "Mining Data Analytics", icon: Terminal },
                ].map((skill, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 group hover:border-orange-500/50 transition-all">
                    <skill.icon size={18} className="text-sky-500" />
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-tight">{skill.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 bg-slate-900 text-white rounded-2xl space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-sky-500">Systems Mastery</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Expert proficiency in Slide2, RS2, Deswik, and Python for geotechnical data modeling.</p>
            </div>
          </div>

          {/* RIGHT: CAREER LOGS */}
          <div className="lg:col-span-8">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-12">Professional Experience</h3>
            <div className="space-y-20">
              {experience.map((item, i) => (
                <div key={i} className="group relative">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-4">
                    <div className="space-y-1">
                      <h4 className="text-3xl font-bold text-slate-900 dark:text-white">{item.role}</h4>
                      <div className="text-sm font-black text-sky-600 uppercase tracking-widest">{item.company}</div>
                    </div>
                    <div className="text-[10px] font-mono font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-4 py-2 self-start border border-slate-200 dark:border-slate-700">
                      {item.period}
                    </div>
                  </div>
                  <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl italic">
                    `{item.desc}``
                  </p>
                </div>
              ))}
            </div>

            {/* CALL TO ACTION */}
            <div className="mt-32 p-12 bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="space-y-2">
                <h4 className="text-3xl font-black tracking-tighter leading-none">Ready to collaborate?</h4>
                <p className="text-sm opacity-60">Professional Consultation & Project Inquiry.</p>
              </div>
              <button className="group flex items-center gap-4 bg-orange-600 text-white px-10 py-5 font-bold text-xs uppercase tracking-[0.2em] transition-all hover:bg-orange-500 shadow-xl shadow-orange-600/20">
                Initialize Contact <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}