"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, ChevronRight } from "lucide-react";
import Image from "next/image";

// --- KOMPONEN ANGKA BERJALAN (COUNT UP) ---
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

// --- DATA MENTOR & STATISTIK INDIVIDU ---
const mentors = [
  {
    id: 0,
    name: "Dr. Irfan Marwanza, S.T., M.T., IPM",
    // Mengubah role menjadi Array
    roles: ["Principal Geology", "Mining Consultant", "Technical Lead"],
    experience: "20+ Tahun Pengalaman",
    image: "/img/mentor1.png",
    stats: [
      { label: "Years Experience", val: 22, suffix: "+" },
      { label: "Published Papers", val: 35, suffix: "" },
      { label: "Mining Projects", val: 80, suffix: "+" },
      { label: "Success Rate", val: 99, suffix: "%" }
    ]
  },
  {
    id: 1,
    name: "Muhammad Kemal Ghifari, S.T., CP",
    roles: ["Mine Geotechnical Engineer", "Stability Expert"],
    experience: "Certified Geotechnical Professional",
    image: "/img/mentor2.png",
    stats: [
      { label: "Slope Stability Analysis", val: 150, suffix: "+" },
      { label: "Safety Record", val: 100, suffix: "%" },
      { label: "Site Inspections", val: 300, suffix: "+" },
      { label: "Years Active", val: 12, suffix: "" }
    ]
  },
  {
    id: 2,
    name: "Faidh Muhlis, S.T., CP",
    roles: ["Coal Geology", "Resources Modeler", "Mine Planner"],
    experience: "Expert Resources Modeler",
    image: "/img/mentor3.png",
    stats: [
      { label: "Block Models Built", val: 65, suffix: "+" },
      { label: "Resources Estimated", val: 400, suffix: " MT" },
      { label: "Software Mastered", val: 5, suffix: "" },
      { label: "Accuracy Rate", val: 98, suffix: "%" }
    ]
  },
];

export default function InteractiveMentors() {
  const [activeMentor, setActiveMentor] = useState(0);

  return (
    <section className="relative min-h-screen py-20 lg:py-25 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* --- HEADER --- */}
        <header className="mb-14">
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 mb-4"
          >
            <div className="w-2 h-2 rounded-full bg-blue-600 dark:bg-sky-400 animate-pulse" />
            <span className="font-bold text-blue-600 dark:text-sky-400 tracking-wider text-sm uppercase">Pilih Mentor</span>
          </motion.div>
          
          <div className="flex flex-col md:items-start justify-start gap-6">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white">
              Our Mining <span className="text-blue-600 dark:text-sky-500 italic font-serif font-light">Experts.</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-sm md:border-l-2 md:border-blue-600 md:dark:border-sky-500 md:pl-4">
              Klik pada kartu mentor untuk melihat detail statistik dan pencapaian profesional mereka.
            </p>
          </div>
        </header>

        <div className="relative">
          
          {/* --- GRID MENTOR CARDS --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10 mb-10">
            {mentors.map((mentor, i) => (
              <motion.div
                key={mentor.id}
                onClick={() => setActiveMentor(i)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={`group relative cursor-pointer backdrop-blur-xl border rounded-[2rem] overflow-hidden transition-all duration-500
                ${activeMentor === i 
                  ? 'bg-white/80 dark:bg-slate-800 border-blue-600 dark:border-sky-500 opacity-100 scale-100' 
                  : 'bg-gray-100/50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/80 opacity-70 hover:opacity-100 scale-95'}
                `}
              >
                <div className="flex flex-row h-full min-h-[220px]">
                  <div className="w-[130px] sm:w-[150px] relative bg-slate-100 dark:bg-slate-900/50 overflow-hidden shrink-0 border-r border-slate-200 dark:border-slate-800">
                    <Image 
                      src={mentor.image} 
                      alt={mentor.name} 
                      fill 
                      sizes="(max-width: 768px) 130px, 150px"
                      className={`object-cover transition-transform duration-700 ease-in-out group-hover:scale-110`} 
                    />
                  </div>

                  <div className="flex-grow p-5 flex flex-col justify-between">
                    <div>
                      <h3 className={`text-base lg:text-lg font-extrabold leading-snug mb-3 transition-colors duration-300 ${activeMentor === i ? 'text-blue-600 dark:text-sky-400' : 'text-slate-800 dark:text-white'}`}>
                        {mentor.name}
                      </h3>
                      
                      {/* --- ROLES AS LIST --- */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {mentor.roles.map((role, idx) => (
                          <span key={idx} className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                            {role}
                          </span>
                        ))}
                      </div>

                      <div className="space-y-3 pt-3 border-t border-slate-200 dark:border-slate-700/60">
                        <div className="flex items-start gap-2.5">
                          <Briefcase size={14} className="text-blue-500 shrink-0 mt-[2px]" />
                          <p className="text-[11px] text-slate-600 dark:text-slate-300 font-medium leading-tight">{mentor.experience}</p>
                        </div>
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
            className="relative p-8 md:p-10 bg-white/90 dark:bg-slate-800/80 backdrop-blur-md rounded-[2rem] border border-slate-200/80 dark:border-slate-700/80 shadow-2xl"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMentor} 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x-0 md:divide-x divide-slate-300 dark:divide-slate-700"
              >
                {mentors[activeMentor].stats.map((stat, i) => (
                  <div key={i} className="text-center space-y-2 px-2">
                    <div className="text-3xl md:text-5xl font-black text-blue-600 dark:text-sky-400 tracking-tight">
                      <AnimatedNumber value={stat.val} suffix={stat.suffix} />
                    </div>
                    <div className="text-[10px] md:text-xs uppercase tracking-[0.15em] text-slate-600 dark:text-slate-300 font-bold">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}