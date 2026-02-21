"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Briefcase } from "lucide-react";
import Image from "next/image";

// --- KOMPONEN ANGKA BERJALAN (COUNT UP) ---
// Komponen ini akan membuat angka berlari dari 0 ke nilai target
const AnimatedNumber = ({ value, suffix = "" }: { value: number, suffix?: string }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTimestamp: number;
    const duration = 1200; // Durasi animasi dalam milidetik (1.2 detik)

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Fungsi Easing agar melambat di akhir (EaseOutExp)
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
    role: "Principal Geology",
    education: "Universitas Gadjah Mada",
    experience: "20+ Tahun Pengalaman",
    image: "/img/mentor1.png",
    // Statistik spesifik untuk Dr. Irfan
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
    role: "Mine Geotechnical Engineer",
    education: "Institut Teknologi Bandung",
    experience: "Certified Geotechnical Professional",
    image: "/img/mentor2.png",
    // Statistik spesifik untuk Kemal
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
    role: "Coal Geology & Modelling",
    education: "Universitas Trisakti",
    experience: "Expert Resources Modeler",
    image: "/img/mentor3.png",
    // Statistik spesifik untuk Faidh
    stats: [
      { label: "Block Models Built", val: 65, suffix: "+" },
      { label: "Resources Estimated", val: 400, suffix: " MT" }, // MT = Million Tonnes
      { label: "Software Mastered", val: 5, suffix: "" },
      { label: "Accuracy Rate", val: 98, suffix: "%" }
    ]
  },
];

export default function InteractiveMentors() {
  // State untuk menyimpan ID mentor yang sedang diklik (Default: 0 / Mentor Pertama)
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
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10 -mb-6">
            {mentors.map((mentor, i) => {
              const isActive = activeMentor === i;
              
              return (
                <motion.div
                  key={mentor.id}
                  onClick={() => setActiveMentor(i)}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  // Styling berubah drastis berdasarkan state isActive
                  className={`group relative cursor-pointer backdrop-blur-xl border rounded-[2rem] overflow-hidden transition-all duration-500
                    ${isActive 
                      ? 'bg-white/90 dark:bg-slate-800/90 border-blue-500 dark:border-sky-400 shadow-[0_20px_40px_-15px_rgba(59,130,246,0.3)] dark:shadow-[0_20px_40px_-15px_rgba(14,165,233,0.3)] -translate-y-2' 
                      : 'bg-white/40 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-700/80 hover:bg-white/60 dark:hover:bg-slate-800/60 hover:border-blue-300 dark:hover:border-sky-500/50 opacity-70 hover:opacity-100 scale-95 hover:scale-[0.98]'
                    }
                  `}
                >
                  <div className="flex flex-row h-full min-h-[220px]">
                    {/* PHOTO */}
                    <div className="w-[140px] sm:w-[160px] relative bg-slate-100 dark:bg-slate-900/50 overflow-hidden shrink-0 border-r border-slate-100 dark:border-slate-800">
                      <Image 
                        src={mentor.image} 
                        alt={mentor.name} 
                        fill 
                        sizes="(max-width: 768px) 140px, 160px"
                        className={`object-cover transition-transform duration-700 ease-in-out ${isActive ? 'scale-105' : 'grayscale-[30%] group-hover:grayscale-0'}`} 
                      />
                    </div>

                    {/* CONTENT */}
                    <div className="flex-grow p-5 flex flex-col justify-between">
                      <div>
                        <h3 className={`text-base lg:text-lg font-extrabold leading-snug mb-1.5 transition-colors duration-300 ${isActive ? 'text-blue-600 dark:text-sky-400' : 'text-slate-900 dark:text-white group-hover:text-blue-500 dark:group-hover:text-sky-300'}`}>
                          {mentor.name}
                        </h3>
                        <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4">
                          {mentor.role}
                        </p>

                        <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-700/60">
                          <div className="flex items-start gap-2.5">
                            <GraduationCap size={15} className="text-slate-400 shrink-0 mt-[1px]" />
                            <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-tight">{mentor.education}</p>
                          </div>
                          <div className="flex items-start gap-2.5">
                            <Briefcase size={15} className="text-slate-400 shrink-0 mt-[1px]" />
                            <p className="text-[11px] text-slate-600 dark:text-slate-300 font-medium leading-tight">{mentor.experience}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* --- DYNAMIC STATS SECTION --- */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative pt-20 pb-10 px-8 md:px-12 bg-slate-100/90 dark:bg-slate-800/80 backdrop-blur-md rounded-b-[3rem] border border-t-0 border-slate-200/80 dark:border-slate-700/80 shadow-inner"
          >
            {/* AnimatePresence untuk transisi halus saat ganti data mentor */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMentor} // Memaksa re-render animasi setiap kali mentor diganti
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x-0 md:divide-x divide-slate-300 dark:divide-slate-700"
              >
                {mentors[activeMentor].stats.map((stat, i) => (
                  <div key={i} className="text-center space-y-2 px-2">
                    <div className="text-3xl md:text-5xl font-black text-blue-600 dark:text-sky-400 tracking-tight">
                      {/* Menggunakan komponen AnimatedNumber */}
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