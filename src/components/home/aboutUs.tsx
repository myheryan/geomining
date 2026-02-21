"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Network, 
  TrendingUp, 
  BookOpen, 
  Cpu,
  // Icon tambahan untuk Our Service (bisa kamu ubah nanti)
  Briefcase,
  MonitorCheck,
  ShieldCheck,
  Database
} from "lucide-react";

// --- DATA OUR VALUE ---
const valuesData = [
  {
    title: "Collaboration & Community",
    desc: "Membangun sinergi yang kuat dan ekosistem kerja yang saling mendukung untuk mencapai tujuan bersama.",
    icon: Network,
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

// --- DATA OUR SERVICE ---
const servicesData = [
  {
    title: "Geotechnical Consultation",
    desc: "Layanan konsultasi ahli untuk evaluasi data geoteknik, desain operasional, dan mitigasi risiko.",
    icon: Briefcase,
    iconColor: "text-slate-500 dark:text-purple-400 group-hover:text-purple-600",
  },
  {
    title: "Monitoring Systems",
    desc: "Penyediaan sistem pengawasan operasional yang presisi dan real-time menggunakan teknologi terkini.",
    icon: MonitorCheck,
    iconColor: "text-slate-500 dark:text-indigo-400 group-hover:text-indigo-600",
  },
  {
    title: "Safety & Assessment",
    desc: "Inspeksi keselamatan terpadu guna memastikan standar operasional berjalan optimal di lapangan.",
    icon: ShieldCheck,
    iconColor: "text-slate-500 dark:text-green-400 group-hover:text-green-600",
  },
  {
    title: "Data Management",
    desc: "Pengelolaan dan analisis data skala besar untuk menghasilkan laporan komprehensif yang mudah dipahami.",
    icon: Database,
    iconColor: "text-slate-500 dark:text-rose-400 group-hover:text-rose-600",
  }
];

export default function AboutUs() {
  // State untuk menyimpan tab yang aktif, default ke 'value'
  const [activeTab, setActiveTab] = useState("value");

  // Menentukan data mana yang dirender berdasarkan state
  const currentData = activeTab === "value" ? valuesData : servicesData;

  return (
    <section id="about" className="min-h-screen w-full snap-start snap-always relative text-slate-900 dark:text-white flex items-center overflow-hidden py-20 lg:py-0 transition-colors duration-500">

      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden transition-colors duration-700">
        
        {/* 1. Cahaya Kiri Atas (Top Left Glow) */}
        <div className="absolute top-0 left-[-10%] sm:top-[10%] sm:left-[5%] w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-slate-300/50 dark:bg-sky-500/20 blur-[120px] sm:blur-[160px] rounded-full mix-blend-multiply dark:mix-blend-screen animate-pulse duration-3000" />

        {/* 2. Cahaya Kanan Bawah (Bottom Right Glow) */}
        <div className="absolute bottom-[-10%] right-[-10%] sm:bottom-[10%] sm:right-[5%] w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-slate-200/60 dark:bg-sky-600/20 blur-[120px] sm:blur-[160px] rounded-full mix-blend-multiply dark:mix-blend-screen" />
        
        {/* 3. Cahaya Halus di Tengah (Soft Center Core) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-slate-100/40 dark:bg-sky-400/5 blur-[150px] rounded-[100%] pointer-events-none mix-blend-overlay dark:mix-blend-screen" />

      </div>
      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* --- LEFT: ABOUT CONTENT --- */}
          <div className="lg:col-span-6 space-y-3 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-center lg:justify-start gap-3"
            >
              <span className="text-[16px] text-blue-600 dark:text-blue-400">Tentang kami,</span>
              <div className="w-12 h-[1px] bg-blue-600/30 dark:bg-blue-400/30 hidden lg:block" />
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl lg:text-7xl font-black leading-[1.0] tracking-tighter text-slate-950 dark:text-white"
            > Geomining.ID
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
               className="flex flex-row items-start justify-center lg:justify-start gap-3 divide-x-3 divide-solid divide-blue-600 text-blue-600 text-2xl font-light dark:text-blue-400 dark:divide-blue-400 italic font-serif">
                <span className="pr-4 ">Platform</span>
                <span className="pr-4">Community </span>
                <span>  Professional Services</span>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
className="text-justify text-base text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl mx-auto lg:mx-0"            >
              Geomining.ID adalah platform dan komunitas khusus di bidang geoteknik pertambangan. Kami berkomitmen menyediakan materi edukatif, wawasan dari para ahli, serta layanan profesional untuk mendukung kebutuhan teknis dan pengembangan kompetensi para profesional, sekaligus mendorong pertumbuhan dan kemajuan industri pertambangan.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4"
            >
              {/* Tombol Our Value */}
              <button 
                onClick={() => setActiveTab("value")}
                className={`px-8 py-4 text-xs font-black uppercase tracking-widest rounded-full transition-all active:scale-95 ${
                  activeTab === "value" 
                    ? "bg-blue-600 text-white shadow-xl shadow-blue-200 dark:shadow-blue-900/20 hover:bg-blue-700" 
                    : "bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 text-slate-950 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                Our Value
              </button>
              
              {/* Tombol Our Service */}
              <button 
                onClick={() => setActiveTab("service")}
                className={`px-8 py-4 text-xs font-black uppercase tracking-widest rounded-full transition-all active:scale-95 ${
                  activeTab === "service" 
                    ? "bg-blue-600 text-white shadow-xl shadow-blue-200 dark:shadow-blue-900/20 hover:bg-blue-700" 
                    : "bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 text-slate-950 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                Our Service
              </button>
            </motion.div>
          </div>

          {/* --- RIGHT: VALUE/SERVICE CARDS --- */}
          {/* Key {activeTab} diletakkan di parent ini agar framer-motion tereset saat tab berubah */}
          <motion.div 
            key={activeTab} 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-6 pt-4 grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6"
          >
            {currentData.map((item, i) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + (i * 0.1) }}
                  className="p-8 bg-white dark:bg-slate-900/40 backdrop-blur-sm border border-slate-100 dark:border-slate-800 rounded-[2rem] shadow-sm hover:shadow-xl dark:shadow-none dark:hover:border-slate-700 hover:shadow-blue-500/5 transition-all group flex flex-col justify-between"
                >
                  <div className="flex flex-row items-end justify-between gap-2 mb-4"> 
                    <h3 className="self-end text-xl font-bold text-slate-900 dark:text-white tracking-tight">{item.title}</h3>
                    <div className={`rounded-2xl transition-all duration-500 group-hover:rotate-6 ${item.iconColor}`}>
                      <IconComponent size={60} className="group-hover:rotate-12 transition-transform duration-1000 z-10" strokeWidth={2} />
                    </div>
                  </div>
                  
                  <p className="text-sm text-slate-500 dark:text-slate-400 text-justify leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>

        </div>
      </div>
    </section>
  );
}