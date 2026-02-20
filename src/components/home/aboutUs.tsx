"use client";

import { motion } from "framer-motion";
import { 
  Network, 
  TrendingUp, 
  BookOpen, 
  Activity,
  Cpu,
  Box
} from "lucide-react";

// --- DATA ---
const values = [
  {
    title: "Collaboration & Community",
    desc: "Membangun sinergi yang kuat dan ekosistem kerja yang saling mendukung untuk mencapai tujuan bersama.",
    icon: Network,
    // Menambahkan base color & dark mode hover state
    iconColor: "text-slate-500 dark:text-blue-400 group-hover:text-blue-600 dark:group-hover:text-blue-400",
  },
  {
    title: "Improvement & Innovation",
    desc: "Tidak pernah berhenti menantang status quo untuk meningkatkan kualitas, efisiensi, dan standar industri.",
    icon: TrendingUp,
    iconColor: "text-slate-500 dark:text-orange-400 group-hover:text-orange-600",
  },
  {
    title: "Knowledge Sharing",
    desc: "Menjadikan pengalaman dan keahlian kolektif sebagai wawasan yang terbuka demi kemajuan operasional.",
    icon: BookOpen,
    iconColor: "text-slate-500 dark:text-emerald-400 group-hover:text-emerald-600",
  },
  {
    title: "Technology-Driven",
    desc: "Menjadikan teknologi dan data sebagai fondasi utama dalam setiap pengambilan keputusan dan solusi.",
    icon: Cpu,
    iconColor: "text-slate-500 dark:text-cyan-400 group-hover:text-cyan-600",
  }
];


export default function GeotechLightLeapfrog() {
  return (
    <section id="about" className="min-h-screen w-full snap-start snap-always relative bg-[#f8fafc] dark:bg-[#050608] text-slate-900 dark:text-white flex items-center overflow-hidden py-20 lg:py-0 transition-colors duration-500">
      
      {/* --- TECHNICAL BACKGROUND (DUAL THEME) --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Light Mode Grid */}
        <div 
          className="absolute inset-0 opacity-[0.2] dark:opacity-0 transition-opacity duration-500" 
          style={{ 
            backgroundImage: 'linear-gradient(#cde3ff 1px, transparent 1px), linear-gradient(90deg, #cde3ff 1px, transparent 1px)', 
            backgroundSize: '80px 80px' 
          }}    
        />
        {/* Dark Mode Grid */}
        <div 
          className="absolute inset-0 opacity-0 dark:opacity-[0.2] transition-opacity duration-500" 
          style={{ 
            backgroundImage: 'linear-gradient(#0289ffd0 1px, transparent 1px), linear-gradient(90deg, #0289ffd0 1px, transparent 1px)', 
            backgroundSize: '80px 80px' 
          }} 
        />
        <div className="absolute top-0 left-1 w-[800px] h-[320px] blur-[120px] bg-sky-300/30 dark:bg-sky-500/20 blur-[120px] opacity-0 dark:opacity-100" />
        {/* 2. Sub-Grid Titik-titik Presisi (Adaptif Light/Dark) */}
        <div className="absolute inset-0 text-[#cde3ff]/90 dark:text-sky-400/20 transition-colors duration-500" 
          style={{ 
            backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', 
            backgroundSize: '20px 20px' 
          }} 
        />
      </div>

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* --- LEFT: ABOUT CONTENT --- */}
          <div className="lg:col-span-6 space-y-8 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-center lg:justify-start gap-3"
            >
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-600 dark:text-blue-400">Core Mission</span>
              <div className="w-12 h-[1px] bg-blue-600/30 dark:bg-blue-400/30 hidden lg:block" />
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tighter text-slate-950 dark:text-white"
            >
              Mastering <br />
              <span className="text-blue-600 dark:text-blue-400 italic font-serif font-light">Ground </span> 
              Intelligence.
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-base md:text-xl text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl mx-auto lg:mx-0"
            >
              Kami mengolah data geoteknik yang kompleks menjadi visualisasi 3D yang intuitif, memberikan fondasi kuat bagi keputusan operasional tambang Anda.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4"
            >
              <button className="px-8 py-4 bg-blue-600 text-white text-xs font-black uppercase tracking-widest rounded-full shadow-xl shadow-blue-200 dark:shadow-blue-900/20 hover:bg-blue-700 transition-all active:scale-95">
                Technical Solutions
              </button>
              <button className="px-8 py-4 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 text-slate-950 dark:text-white text-xs font-black uppercase tracking-widest rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                The Process
              </button>
            </motion.div>
          </div>

          {/* --- RIGHT: VALUE CARDS --- */}
          <div className="lg:col-span-6 pt-16 grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + (i * 0.1) }}
                className="p-8 bg-white dark:bg-slate-900/40 backdrop-blur-sm border border-slate-100 dark:border-slate-800 rounded-[2rem] shadow-sm hover:shadow-xl dark:shadow-none dark:hover:border-slate-700 hover:shadow-blue-500/5 transition-all group"
              >
                {/* Icon Wrapper dengan dynamic classes */}
                <div className="flex flex-row items-end justify-between gap-2"> 

                  <h3 className="self-end text-xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">{v.title}</h3>
                  <div className={`rounded-2xl transition-all duration-500  group-hover:rotate-6 ${v.iconColor} `}>
                  <v.icon size={60} className={`group-hover:rotate-12 transition-transform duration-1000 2z-1` } strokeWidth={2} />
                  </div>
                </div>


                
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}

            {/* Visual Stat Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              className="p-8 bg-slate-900 dark:bg-slate-950 dark:border border-slate-800 rounded-[2rem] flex flex-col justify-center text-white relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-4 opacity-20">
                <Box size={80} className="group-hover:rotate-12 transition-transform duration-1000" />
              </div>
              <Activity className="text-blue-400 mb-4" />
              <span className="text-3xl font-black mb-1 tracking-tighter">High-Res</span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Modeling Precision</span>
            </motion.div>
          </div>

        </div>
        


      </div>
    </section>
  );
}