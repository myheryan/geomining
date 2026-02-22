"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  IconSlide3, 
  IconSlide2, 
  IconRS3, 
  IconRS2, 
  IconPlaxis, 
  IconMinescape, 
  IconLeapfrog, 
  IconKinematic, 
  IconGeoStats 
} from "@/components/ui/icon-svg";

const softwareTools = [
  { name: "Slide3", icon: <IconSlide3 className="w-14 h-14 sm:w-16 sm:h-16 drop-shadow-md" /> },
  { name: "Slide2", icon: <IconSlide2 className="w-14 h-14 sm:w-16 sm:h-16 drop-shadow-md" /> },
  { name: "Plaxis", icon: <IconPlaxis className="w-14 h-14 sm:w-16 sm:h-16 drop-shadow-md" /> },
  { name: "Leapfrog GEO", icon: <IconLeapfrog className="w-14 h-14 sm:w-16 sm:h-16 drop-shadow-md" /> },
  { name: "RS2", icon: <IconRS2 className="w-14 h-14 sm:w-16 sm:h-16 drop-shadow-md" /> },
  { name: "RS3", icon: <IconRS3 className="w-14 h-14 sm:w-16 sm:h-16 drop-shadow-md" /> },
  { name: "Kinematic", icon: <IconKinematic className="w-14 h-14 sm:w-16 sm:h-16 drop-shadow-md" /> },
  { name: "Minescape", icon: <IconMinescape className="w-14 h-14 sm:w-16 sm:h-16 drop-shadow-md" /> },
  { name: "GeoStats", icon: <IconGeoStats className="w-14 h-14 sm:w-16 sm:h-16 drop-shadow-md" /> },
];

// Varian animasi untuk framer-motion (Staggered Children)
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function SoftwareIconsPremium() {
  return (
    <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-950 overflow-hidden">
      <div className="container mx-auto px-6 max-w-5xl">
        
        {/* Header Premium */}
        <div className="mb-10 text-center md:text-left">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-sky-500/10 border border-blue-100 dark:border-sky-500/20 mb-4"
          >
            <div className="w-2 h-2 rounded-full bg-blue-600 dark:bg-sky-400 animate-pulse" />
            <span className="text-xs font-bold text-blue-600 dark:text-sky-400 uppercase tracking-widest">
              Alat & Teknologi
            </span>
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Technology-Driven <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-400 dark:from-sky-400 dark:to-blue-500">Solutions.</span>
          </h2>
        </div>

        {/* CONTAINER UTAMA DENGAN EFEK FADE DI UJUNG */}
        <div className="relative w-full">
          
          {/* Efek Pudar Kiri */}
          <div className="absolute left-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-r from-slate-50 dark:from-slate-950 to-transparent z-20 pointer-events-none" />
          
          {/* Area Scroll Horizontal */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="flex overflow-x-auto gap-4 md:gap-6 pb-16 pt-8 px-4 sm:px-10 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {softwareTools.map((software, index) => (
              <motion.div 
                variants={itemVariants}
                key={index} 
                className="shrink-0 snap-center group relative flex items-center justify-center w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] rounded-3xl bg-white dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/60 dark:border-slate-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] hover:shadow-[0_20px_40px_rgba(14,165,233,0.15)] hover:border-sky-300 dark:hover:border-sky-500/50 transition-all duration-500 ease-out hover:-translate-y-2 cursor-grab active:cursor-grabbing"
              >
                {/* Latar Belakang Glow Muncul Saat Hover */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-sky-50 to-transparent dark:from-sky-900/20 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Ikon */}
                <div className="relative z-10 text-slate-700 dark:text-slate-200 group-hover:scale-110 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-all duration-500">
                  {software.icon}
                </div>
                
                {/* Tooltip Premium */}
                <span className="absolute -bottom-12 opacity-0 group-hover:opacity-100 text-[11px] sm:text-xs font-bold text-slate-700 dark:text-white bg-white/90 dark:bg-slate-800/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 transition-all duration-300 whitespace-nowrap pointer-events-none z-30 translate-y-3 group-hover:translate-y-0 tracking-wide">
                  {software.name}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Efek Pudar Kanan */}
          <div className="absolute right-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-l from-slate-50 dark:from-slate-950 to-transparent z-20 pointer-events-none" />
        
        </div>

      </div>
    </section>
  );
}