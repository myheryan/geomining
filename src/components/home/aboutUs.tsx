"use client";

import { motion } from "framer-motion";
import { 
  Database, 
  ShieldAlert, 
  Lightbulb, 
  Activity,
  Box
} from "lucide-react";

const values = [
  {
    title: "Data Integrity",
    desc: "Memastikan akurasi pemodelan geoteknik melalui validasi data lapangan yang ketat.",
    icon: Database,
    color: "bg-blue-600",
    shadow: "shadow-blue-200"
  },
  {
    title: "Innovation-Driven",
    desc: "Mengintegrasikan teknologi pemodelan 3D terkini untuk solusi tambang yang cerdas.",
    icon: Lightbulb,
    color: "bg-sky-500",
    shadow: "shadow-sky-200"
  },
  {
    title: "Operational Safety",
    desc: "Menjadikan stabilitas lereng dan keamanan personel sebagai prioritas mutlak.",
    icon: ShieldAlert,
    color: "bg-slate-800",
    shadow: "shadow-slate-200"
  }
];

const stats = [
  { label: "Experience", val: "8+ Years" },
  { label: "Safety Record", val: "100%" },
  { label: "Cost Savings", val: "25%" },
  { label: "Tech Projects", val: "12+" }
];



export default function GeotechLightLeapfrog() {
  return (
    <section className="relative w-full main-h-screen bg-[#f8fafc] text-slate-900 flex items-center overflow-hidden py-20 lg:py-0">
      
      {/* --- LIGHT TECHNICAL BACKGROUND --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Subtle Grid - Engineered Look */}
        <div 
          className="absolute inset-0 opacity-[0.4]" 
          style={{ 
            backgroundImage: 'linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)', 
            backgroundSize: '40px 40px' 
          }} 
        />
        
        {/* Atmospheric Gradients */}
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-5%] left-[-5%] w-[400px] h-[400px] bg-slate-200/40 rounded-full blur-[100px]" />
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
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-600">Core Mission</span>
              <div className="w-12 h-[1px] bg-blue-600/30 hidden lg:block" />
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tighter text-slate-950"
            >
              Mastering <br />
              <span className="text-blue-600 italic font-serif font-light">Ground </span> 
              Intelligence.
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-base md:text-xl text-slate-500 leading-relaxed max-w-xl mx-auto lg:mx-0"
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
              <button className="px-8 py-4 bg-blue-600 text-white text-xs font-black uppercase tracking-widest rounded-full shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95">
                Technical Solutions
              </button>
              <button className="px-8 py-4 bg-white border border-slate-200 text-slate-950 text-xs font-black uppercase tracking-widest rounded-full hover:bg-slate-50 transition-all">
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
                className="p-8 bg-white border border-slate-100 rounded-[2rem] shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all group"
              >
                <div className={`w-12 h-12 ${v.color} ${v.shadow} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                  <v.icon size={22} strokeWidth={2} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">{v.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}

            {/* Visual Stat Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              className="p-8 bg-slate-900 rounded-[2rem] flex flex-col justify-center text-white relative overflow-hidden group"
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
        <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 border-y border-slate-100 justify-center justify-center dark:border-slate-800">
          {stats.map((stat, i) => (
            <div key={i} className="text-center md:text-left space-y-1">
              <div className="text-4xl font-black text-slate-900 dark:text-white">{stat.val}</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">{stat.label}</div>
            </div>
          ))}

      </motion.div>
    </div>
    </section>
  );
}