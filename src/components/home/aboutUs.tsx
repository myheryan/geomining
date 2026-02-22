"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Network, 
  TrendingUp, 
  BookOpen, 
  Cpu,
  FileText,
  GraduationCap,
  Briefcase,
  LucideIcon
} from "lucide-react";

type CardData = {
  title: string;
  desc: string;
  icon: LucideIcon;
  iconColor: string;
  list?: string[]; 
  footer?: string; // <-- Ini yang ditambahkan untuk memperbaiki error
};

// --- DATA OUR VALUE ---
const valuesData: CardData[] = [
  {
    title: "Collaboration & Community",
    desc: "Membangun sinergi yang kuat dan ekosistem kerja yang saling mendukung untuk mencapai tujuan bersama.",
    icon: Network,
    iconColor: "text-blue-400 group-hover:text-blue-600 dark:group-hover:text-blue-400",
  },
  {
    title: "Improvement & Innovation",
    desc: "Tidak pernah berhenti menantang status quo untuk meningkatkan kualitas, efisiensi, dan standar industri.",
    icon: TrendingUp,
    iconColor: "text-orange-400 group-hover:text-orange-600",
  },
  {
    title: "Knowledge Sharing",
    desc: "Menjadikan pengalaman dan keahlian kolektif sebagai wawasan yang terbuka demi kemajuan operasional.",
    icon: BookOpen,
    iconColor: "text-emerald-400 group-hover:text-emerald-600",
  },
  {
    title: "Technology-Driven",
    desc: "Menjadikan teknologi dan data sebagai fondasi utama dalam setiap pengambilan keputusan dan solusi.",
    icon: Cpu,
    iconColor: "text-cyan-400 group-hover:text-cyan-600",
  }
];

// --- DATA OUR SERVICE ---
// Opsional: Menambahkan : CardData[] di sini akan membuat TypeScript lebih disiplin,
// tapi tanpa ini pun error sebelumnya sudah teratasi.
const servicesData: CardData[] = [
  {
    title: "Geotechnical Report Services",
    desc: "We provide comprehensive and reliable geotechnical reporting services to support safe, efficient, and data-driven mining operations. Our expertise includes:",
    list: [
      "Slope stability analysis",
      "Groundwater and pore pressure evaluation",
      "Rock mass characterization",
      "Geotechnical risk assessment",
      "Numerical modeling & simulation (2D/3D)",
      "Technical review and independent verification"
    ],
    footer: "Each report is prepared using industry-recognized methodologies and advanced software tools, ensuring accuracy, clarity, and practical recommendations for decision-making.",
    icon: FileText,
    iconColor: "text-purple-400 group-hover:text-purple-600",
  },
  {
    title: "Educational Services",
    desc: "We are committed to empowering mining professionals and future engineers through structured and practical learning programs. Our educational services include:",
    list: [
      "Professional training & workshops",
      "Software-based technical courses",
      "Corporate in-house training",
      "Academic collaboration programs",
      "Free knowledge-sharing sessions & webinars"
    ],
    footer: "Our programs are designed to bridge theory and real-world mining applications.",
    icon: GraduationCap,
    iconColor: "text-indigo-400 group-hover:text-indigo-600",
  },
  {
    title: "Technical Consulting & Advisory",
    desc: "We provide expert consultation and strategic advisory services to support mining projects from planning to execution. Our consulting services cover:",
    list: [
      "Mine geotechnical design review",
      "Slope optimization strategies",
      "Groundwater management planning",
      "Independent expert opinion",
      "Feasibility study support",
      "On-site technical assistance"
    ],
    footer: "We help companies minimize risk, improve operational efficiency, and ensure long-term slope performance and mine safety.",
    icon: Briefcase,
    iconColor: "text-rose-400 group-hover:text-rose-600",
  }
];

export default function AboutUs() {
  const [activeTab, setActiveTab] = useState("value");
  const currentData = activeTab === "value" ? valuesData : servicesData;

  return (
    <section id="tab-1" className="min-h-[100dvh] w-full snap-start snap-always relative text-slate-900 dark:text-white py-24 lg:py-32 transition-colors duration-500">

      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden transition-colors duration-700">
        <div className="absolute top-0 left-[-10%] sm:top-[10%] sm:left-[5%] w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-slate-300/50 dark:bg-sky-500/20 blur-[120px] sm:blur-[160px] rounded-full mix-blend-multiply dark:mix-blend-screen animate-pulse duration-3000" />
        <div className="absolute bottom-[-10%] right-[-10%] sm:bottom-[10%] sm:right-[5%] w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-slate-200/60 dark:bg-sky-600/20 blur-[120px] sm:blur-[160px] rounded-full mix-blend-multiply dark:mix-blend-screen" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-slate-100/40 dark:bg-sky-400/5 blur-[150px] rounded-[100%] pointer-events-none mix-blend-overlay dark:mix-blend-screen" />
      </div>

      <div className="container mx-auto px-5 sm:px-6 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* --- LEFT: ABOUT CONTENT --- */}
          <div className="lg:col-span-5 space-y-3 text-center lg:text-left lg:sticky lg:top-32 h-fit">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-center lg:justify-start gap-3"
            >
              <span className="text-[14px] md:text-[16px] text-blue-600 dark:text-blue-400">Tentang kami,</span>
              <div className="w-8 md:w-12 h-[1px] bg-blue-600/30 dark:bg-blue-400/30 hidden lg:block" />
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
               className="flex flex-row items-center justify-center lg:justify-start gap-2 md:gap-3 divide-x-2 md:divide-x-3 divide-solid divide-blue-600 text-blue-600 text-[15px] sm:text-md md:text-lg font-light dark:text-blue-400 dark:divide-blue-400 italic font-serif mt-2"
            >
                <span className="pr-2 md:pr-4">Platform</span>
                <span className="px-2 md:px-4">Community</span>
                <span className="pl-2 md:pl-4">Professional Services</span>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-justify text-[14px] md:text-base text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl mx-auto lg:mx-0 mt-4"
            >
              Geomining.ID adalah platform dan komunitas khusus di bidang geoteknik pertambangan. Kami berkomitmen menyediakan materi edukatif, wawasan dari para ahli, serta layanan profesional untuk mendukung kebutuhan teknis dan pengembangan kompetensi para profesional, sekaligus mendorong pertumbuhan dan kemajuan industri pertambangan.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap justify-center lg:justify-start gap-3 md:gap-4 pt-4 md:pt-6"
            >
              <button 
                onClick={() => setActiveTab("value")}
                className={`px-6 md:px-8 py-3 md:py-4 text-[10px] md:text-xs font-black uppercase tracking-widest rounded-full transition-all active:scale-95 ${
                  activeTab === "value" 
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-200 dark:shadow-blue-900/20 hover:bg-blue-700" 
                    : "bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 text-slate-950 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                Our Value
              </button>
              
              <button 
                onClick={() => setActiveTab("service")}
                className={`px-6 md:px-8 py-3 md:py-4 text-[10px] md:text-xs font-black uppercase tracking-widest rounded-full transition-all active:scale-95 ${
                  activeTab === "service" 
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-200 dark:shadow-blue-900/20 hover:bg-blue-700" 
                    : "bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 text-slate-950 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                Our Service
              </button>
            </motion.div>
          </div>

          {/* --- RIGHT: VALUE/SERVICE CARDS --- */}
          <motion.div 
            key={activeTab} 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className={`lg:col-span-7 pt-2 md:pt-4 ${
              activeTab === "service" 
                ? "flex flex-col gap-6 md:gap-8 pb-32" 
                : "grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6"
            }`}
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
                  className={`p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border transition-all group flex flex-col justify-start bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl
                    ${activeTab === "service" 
                      ? "sticky shadow-2xl dark:shadow-black/60 border-slate-200 dark:border-slate-700" 
                      : "border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl dark:hover:border-slate-700 hover:-translate-y-1"
                    }
                  `}
                  style={
                    activeTab === "service" 
                      ? { top: `calc(120px + ${i * 30}px)` } 
                      : {}
                  }
                >
                  <div className="flex flex-row items-center justify-between gap-3 mb-4 border-b border-slate-100 dark:border-slate-800/60 pb-4"> 
                    <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white tracking-tight leading-snug">{item.title}</h3>
                    <div className={`rounded-2xl transition-all duration-500 group-hover:rotate-6 ${item.iconColor} shrink-0`}>
                      <IconComponent className="w-10 h-10 md:w-12 md:h-12 group-hover:rotate-12 transition-transform duration-1000 z-10" strokeWidth={2} />
                    </div>
                  </div>
                  
                  <p className="text-[13px] md:text-sm text-slate-500 dark:text-slate-400 text-justify leading-relaxed">{item.desc}</p>

                  {item.list && (
                    <ul className="mt-4 space-y-2 text-[13px] md:text-sm text-slate-600 dark:text-slate-300 list-disc pl-4 md:pl-5 marker:text-blue-500">
                      {item.list.map((li, idx) => (
                        <li key={idx} className="leading-snug">{li}</li>
                      ))}
                    </ul>
                  )}
                  
                  {/* Render Footer secara kondisional (hanya ada di data Our Service) */}
                  {item.footer && (
                    <p className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs font-medium text-slate-400 dark:text-slate-500 italic">
                      {item.footer}
                    </p>
                  )}
                </motion.div>
              );
            })}

          </motion.div>

        </div>
      </div>
    </section>
  );
}
