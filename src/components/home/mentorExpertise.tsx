"use client";

import { motion } from "framer-motion";
import { GraduationCap, Briefcase } from "lucide-react";
import Image from "next/image";

const mentors = [
  {
    name: "Dr. Irfan Marwanza, S.T., M.T., IPM",
    role: "Principal Geology",
    initials: "IM",
    education: "Universitas Gadjah Mada",
    experience: "20+ Tahun Pengalaman",
    image: "/img/mentor1.png"
  },
  {
    name: "Muhammad Kemal Ghifari, S.T., M.T., CP",
    role: "Mine Geotechnical Engineer",
    initials: "MK",
    education: "Institut Teknologi Bandung",
    experience: "Certified Geotechnical Professional",
    image: "/img/mentor2.png"
  },
  {
    name: "Faidh Muhlis, S.T., CP",
    role: "Coal Geology Resource & Modelling",
    initials: "FM",
    education: "Universitas Trisakti",
    experience: "Expert Resources Modeler",
    image: "/img/mentor3.png"
  },
];
      
export default function TripleHorizontalRow() {
  return (
    <section className="relative min-h-screen bg-white dark:bg-[#020617] transition-colors duration-500 py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
      {/* Light Mode Grid */}
      <div className="absolute inset-0 opacity-[0.2] dark:opacity-0 transition-opacity duration-500" 
      style={{ 
      backgroundImage: 'linear-gradient( #c4c5c5bc 1px, transparent 1px), linear-gradient(90deg, #c4c5c5bc 1px, transparent 1px)', 
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
      <div className="absolute top-0 left-1 w-[800px] h-[320px] blur-[120px] bg-gray-300 dark:bg-sky-500/20 blur-[120px] opacity-0 dark:opacity-100" />
      {/* 2. Sub-Grid Titik-titik Presisi (Adaptif Light/Dark) */}
      <div className="absolute inset-0 text-[#dfe9fc]/50 dark:text-sky-500/20 transition-colors duration-500" 
      style={{ 
      backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', 
      backgroundSize: '20px 20px' 
      }} 
      />
      </div>



      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* --- HEADER --- */}
        <header className="mb-16 md:mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 mb-4"
          >
            <div className="w-2 h-2 rounded-full bg-blue-600 dark:bg-sky-400 animate-pulse" />
            <span className="font-bold text-blue-600 dark:text-sky-400 tracking-wider">Get to know</span>
          </motion.div>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-sky-500 dark:text-white transition-colors duration-500">
              Our Mining <span className="text-slate-400 dark:text-slate-500 italic font-serif font-light">Experts.</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xs border-l-2 border-blue-600 dark:border-sky-500 pl-4 py-1 transition-colors duration-500">
              Dipandu oleh praktisi senior untuk menjamin integritas data dan keamanan operasional.
            </p>
          </div>
        </header>

        {/* --- GRID MENTOR CARDS --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mentors.map((mentor, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.7 }}
              /* Glass Card Style (Adaptif Light/Dark) */
              className="group relative bg-slate-200/50 dark:bg-slate-800/40 backdrop-blur-md border border-slate-200/60 dark:border-slate-700/50 rounded-[2.5rem] overflow-hidden hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_30px_60px_-15px_rgba(14,165,233,0.1)] hover:border-blue-400/50 dark:hover:border-sky-400/50 transition-all duration-500"
            >
              <div className="flex flex-row h-full min-h-[240px]">
                
                {/* --- PHOTO --- */}
                <div className="w-[180px] md:w-[180px] lg:w-[180px] relative bg-slate-100 dark:bg-slate-800/80 overflow-hidden shrink-0 border-r border-slate-100 dark:border-slate-700/50 transition-colors duration-500">
                   <Image 
                    src={mentor.image} 
                    alt={mentor.name} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-all duration-700" 
                  />
                </div>

                {/* --- CONTENT --- */}
                <div className="flex-grow p-5 lg:p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base lg:text-lg font-bold text-slate-900 dark:text-slate-100 leading-tight group-hover:text-blue-600 dark:group-hover:text-sky-400 transition-colors duration-300 mb-2">
                      {mentor.name}
                    </h3>
                    <p className="text-[10px] font-bold text-blue-600 dark:text-sky-500 uppercase tracking-widest mb-4 transition-colors duration-500">
                      {mentor.role}
                    </p>

                    <div className="space-y-3 pt-4 border-t border-slate-200/50 dark:border-slate-700/50 transition-colors duration-500">
                      <div className="flex items-start gap-2">
                        <GraduationCap size={14} className="text-slate-400 dark:text-slate-500 shrink-0 mt-0.5 transition-colors duration-500" />
                        <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-tight transition-colors duration-500">{mentor.education}</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <Briefcase size={14} className="text-slate-400 dark:text-slate-500 shrink-0 mt-0.5 transition-colors duration-500" />
                        <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-tight font-medium transition-colors duration-500">{mentor.experience}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}