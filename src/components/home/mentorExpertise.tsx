"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import Image from "next/image";
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

// --- KOMPONEN ANGKA BERJALAN ---
const AnimatedNumber = ({ value, suffix = "" }: { value: number, suffix?: string }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTimestamp: number;
    const duration = 1200;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplayValue(Math.floor(easeProgress * value));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setDisplayValue(value);
      }
    };
    window.requestAnimationFrame(step);
  }, [value]);

  return <span>{displayValue}{suffix}</span>;
};

// --- DATA MENTOR ---
const mentors = [
  {
    id: 0,
    name: "Dr. Irfan Marwanza, S.T., M.T., IPM",
    experience: "20+ Tahun Pengalaman",
    expertise: ["Geology Consultant Expert", "Senior Technical Advisor"],
    image: "/img/mentor1.png",
  },
  {
    id: 1,
    name: "Muhammad Kemal Ghifari, S.T., M.T., CP",
    experience: "Certified Geotechnical Professional",
    expertise: ["Geotechnical, Geomechanics", "Slope stability, Mine planning"],
    image: "/img/mentor2.png",
  },
  {
    id: 2,
    name: "Faidh Muhlis, S.T., CP",
    experience: "Expert Resources Modeler",
    expertise: ["Coal Resource Geologist & Modeller", "Geophysical Interpretation and Modeller"],
    image: "/img/mentor3.png",
  },
];

// --- DATA STATISTIK GLOBAL ---
const globalStats = [
  { label: "Years Experience", val: 10, suffix: "+" },
  { label: "Books Published", val: 3, suffix: "" },
  { label: "Journals Published", val: 20, suffix: "+" },
  { label: "Mining Projects Completed", val: 30, suffix: "+" },
  { label: "Engineers Empowered", val: 300, suffix: "+" }
];

// --- DATA SOFTWARE TOOLS ---
const softwareTools = [
  { name: "Slide3", icon: <IconSlide3 className="w-10 h-10 sm:w-12 sm:h-12" /> },
  { name: "Slide2", icon: <IconSlide2 className="w-10 h-10 sm:w-12 sm:h-12" /> },
  { name: "Plaxis", icon: <IconPlaxis className="w-10 h-10 sm:w-12 sm:h-12" /> },
  { name: "Leapfrog GEO", icon: <IconLeapfrog className="w-10 h-10 sm:w-12 sm:h-12" /> },
  { name: "RS2", icon: <IconRS2 className="w-10 h-10 sm:w-12 sm:h-12" /> },
  { name: "RS3", icon: <IconRS3 className="w-10 h-10 sm:w-12 sm:h-12" /> },
  { name: "Kinematic", icon: <IconKinematic className="w-10 h-10 sm:w-12 sm:h-12" /> },
  { name: "Minescape", icon: <IconMinescape className="w-10 h-10 sm:w-12 sm:h-12" /> },
  { name: "GeoStats", icon: <IconGeoStats className="w-10 h-10 sm:w-12 sm:h-12" /> },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      type: "spring", // TypeScript sekarang membacanya sebagai tipe "spring" spesifik
      stiffness: 300, 
      damping: 24 
    } 
  }
} as const;

export default function InteractiveMentors() {
  return (
    <section id="tab-3" className="relative min-h-screen py-20 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* --- HEADER (LEFT ALIGNED) --- */}
        <header className="mb-14 text-left">
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex items-center justify-start gap-2 mb-4"
          >
            <div className="w-2 h-2 rounded-full bg-blue-600 dark:bg-sky-400 animate-pulse" />
            <span className="font-bold text-blue-600 dark:text-sky-400 tracking-wider text-sm uppercase">"Get To Know"</span>
          </motion.div>
          
          <div className="flex flex-col items-start justify-start gap-4">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white">
              Our Mining <span className="text-blue-600 dark:text-sky-500 italic font-serif font-light">Experts.</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xl border-l-2 border-blue-600 pl-4 leading-relaxed">
              Kombinasi antara pengalaman profesional mendalam dan penguasaan teknologi terkini untuk memberikan solusi pertambangan terbaik.
            </p>
          </div>
        </header>

        {/* --- GRID MENTOR CARDS --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-16">
          {mentors.map((mentor, i) => (
            <motion.div
              key={mentor.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group relative backdrop-blur-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-blue-300 dark:hover:border-sky-700 transition-all duration-500"
            >
              <div className="flex flex-row h-full min-h-[180px] sm:min-h-[220px]">
                <div className="w-[110px] sm:w-[150px] relative bg-slate-100 dark:bg-slate-800 shrink-0 border-r border-slate-200 dark:border-slate-800">
                  <Image 
                    src={mentor.image} 
                    alt={mentor.name} 
                    fill 
                    sizes="(max-width: 640px) 110px, 150px"
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-110" 
                  />
                </div>

                <div className="flex-grow p-4 sm:p-5 flex flex-col justify-between">
                  <div>
                    <div className="mb-3 sm:mb-4">
                      <h3 className="text-[14px] sm:text-base lg:text-lg font-extrabold leading-snug mb-1 text-slate-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-sky-400 transition-colors">
                        {mentor.name}
                      </h3>
                      <div className="flex items-start gap-1.5 text-slate-500 dark:text-slate-400">
                        <Briefcase size={13} className="text-blue-500 shrink-0 mt-[2px]" />
                        <p className="text-[10px] sm:text-[11px] font-medium leading-tight">{mentor.experience}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                      <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Expertise :</p>
                      <ul className="space-y-1">
                        {mentor.expertise.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-1.5 text-[11px] sm:text-[12px] text-slate-600 dark:text-slate-300 leading-snug">
                            <span className="text-blue-500 font-bold">-</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- STATS CARD --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative p-6 sm:p-10 bg-white dark:bg-slate-900/50 backdrop-blur-md rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-2xl mb-20"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-4 divide-x-0 lg:divide-x divide-slate-200 dark:divide-slate-800 text-center">
            {globalStats.map((stat, i) => (
              <div key={i} className="space-y-2 px-2">
                <div className="text-3xl sm:text-4xl md:text-5xl font-black text-blue-600 dark:text-sky-400 tracking-tight">
                  <AnimatedNumber value={stat.val} suffix={stat.suffix} />
                </div>
                <div className="text-[9px] sm:text-[10px] md:text-xs uppercase tracking-[0.1em] text-slate-600 dark:text-slate-400 font-bold leading-tight">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* --- SOFTWARE TOOLS SECTION (NOW LEFT ALIGNED) --- */}
        <div className="relative pt-10 border-t border-slate-100 dark:border-slate-900">
          <div className="mb-10 text-left">
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-sky-500/10 border border-blue-100 dark:border-sky-500/20 mb-3"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-sky-400 animate-pulse" />
              <span className="text-[10px] md:text-xs font-bold text-blue-600 dark:text-sky-400 uppercase tracking-widest">
                Software Terintegrasi
              </span>
            </motion.div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-3">
              Technology-Driven <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-400">Solutions.</span>
            </h2>
            <p className="text-[13px] md:text-sm text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
              Kami didukung oleh perangkat lunak pemodelan dan analisis berstandar industri internasional untuk memastikan akurasi tinggi dalam setiap proyek.
            </p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            // KUNCI PERUBAHAN: Menggunakan justify-start agar ikon berbaris ke kiri
            className="flex flex-wrap justify-start gap-3 sm:gap-4 md:gap-5"
          >
            {softwareTools.map((software, index) => (
              <motion.div 
                variants={itemVariants}
                key={index} 
                className="group relative flex flex-col items-center justify-center w-[85px] h-[95px] sm:w-[105px] sm:h-[110px] rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-sky-300 dark:hover:border-sky-500/50 transition-all duration-300 hover:-translate-y-1.5 cursor-pointer"
              >
                <div className="relative z-10 text-slate-700 dark:text-slate-200 group-hover:scale-110 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-all duration-300 mb-1 sm:mb-2">
                  {software.icon}
                </div>
                <span className="relative z-10 text-[9px] sm:text-[11px] font-bold text-slate-600 dark:text-slate-300 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors duration-300 text-center px-1">
                  {software.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
      </div>
    </section>
  );
}
