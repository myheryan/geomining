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
    image: "/img/mentor3.png"
  },
  {
    name: "Faidh Muhlis, S.T., CP",
    role: "Coal Geology Resource & Modelling",
    initials: "FM",
    education: "Universitas Trisakti",
    experience: "Expert Resources Modeler",
    image: "/img/mentor2.png"
  },
];
      
export default function TripleHorizontalRow() {
  return (
    <section className="relative bg-white py-24 lg:py-32 overflow-hidden">
      
      {/* --- PROFESSIONAL TECHNICAL BACKGROUND LAYER --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* 1. Fine Technical Grid */}
        <div 
          className="absolute inset-0 opacity-[0.4]" 
          style={{ 
            backgroundImage: `
              linear-gradient(#e2e8f0 1.5px, transparent 1.5px), 
              linear-gradient(90deg, #e2e8f0 1.5px, transparent 1.5px)
            `,
            backgroundSize: '60px 60px' 
          }} 
        />

        {/* 2. Sub-Grid (Titik-titik Presisi) */}
        <div 
          className="absolute inset-0 opacity-[0.2]" 
          style={{ 
            backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', 
            backgroundSize: '20px 20px' 
          }} 
        />

        {/* 3. Ambient Professional Glows */}
        {/* Biru Lembut di sisi kiri atas */}
        <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-blue-50 rounded-full blur-[120px] opacity-60" />
        {/* Abu-abu hangat di sisi kanan bawah */}
        <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-slate-100 rounded-full blur-[100px] opacity-50" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* --- HEADER --- */}
        <header className="mb-16 md:mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 mb-4"
          >
            <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span className="text-[11px] font-bold text-blue-600 tracking-wider">Technical Faculty</span>
          </motion.div>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-slate-950">
              Expertise <span className="text-slate-400 italic font-serif font-light">Directory.</span>
            </h2>
            <p className="text-slate-500 text-sm max-w-xs border-l-2 border-blue-600 pl-4 py-1">
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
              /* Glass Card Style */
              className="group relative bg-slate-200/50 backdrop-blur-md border border-slate-200/60 rounded-[2.5rem] overflow-hidden hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] hover:border-blue-400/50 transition-all duration-500"
            >
              <div className="flex flex-row h-full min-h-[240px]">
                
                {/* --- PHOTO --- */}
                <div className="w-[180px] lg:w-[180px] relative bg-slate-100 overflow-hidden shrink-0 border-r border-slate-100">
                   <Image 
                    src={mentor.image} 
                    alt={mentor.name} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-all duration-700" 
                  />
                </div>

                {/* --- CONTENT --- */}
                <div className="flex-grow p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base lg:text-lg font-bold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors mb-2">
                      {mentor.name}
                    </h3>
                    <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-4">
                      {mentor.role}
                    </p>

                    <div className="space-y-3 pt-4 border-t border-slate-100">
                      <div className="flex items-start gap-2">
                        <GraduationCap size={14} className="text-slate-400 shrink-0 mt-0.5" />
                        <p className="text-[11px] text-slate-600 leading-tight">{mentor.education}</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <Briefcase size={14} className="text-slate-400 shrink-0 mt-0.5" />
                        <p className="text-[11px] text-slate-600 leading-tight font-medium">{mentor.experience}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes shimmer {
          100% {
            left: 100%;
          }
        }
      `}</style>
    </section>
  );
}