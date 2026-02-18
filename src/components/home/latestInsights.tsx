'use client';

import { motion } from "framer-motion";
import { ArrowUpRight, Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const insights = [
  // ... data insights tetap sama ...
  {
    id: "LOG-01",
    title: "DI BALIK GARIS KUNING",
    slug: "rahasia-sebelum-tambang",
    date: "Feb 18, 2026",
    category: "Exploration",
    image: "https://images.unsplash.com/photo-1578319439584-104c94d37305?q=80&w=2070&auto=format&fit=crop",
    desc: "Proses detektif ilmiah dan pemodelan cadangan sebelum mobilisasi alat berat."
  },
  {
    id: "LOG-02",
    title: "IOT MONITORING LERENG",
    slug: "iot-pada-slope-stability",
    date: "Feb 17, 2026",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=2070&auto=format&fit=crop",
    desc: "Integrasi sensor otomatis untuk deteksi dini pergerakan lereng guna mitigasi risiko."
  },
  {
    id: "LOG-03",
    title: "AIR TANAH & STABILITAS",
    slug: "air-tanah-vs-kestabilan",
    date: "Feb 16, 2026",
    category: "Geotechnic",
    image: "https://images.unsplash.com/photo-1590013330462-0ca506456094?q=80&w=2070&auto=format&fit=crop",
    desc: "Analisis tekanan air pori dan pengaruhnya terhadap faktor keamanan lereng (FoP)."
  }
];

export const LatestInsights = () => {
  return (
    <section className="py-20 bg-white dark:bg-[#050608] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-black tracking-tighter uppercase dark:text-white">Technical Dossier</h2>
            <div className="h-px w-16 bg-orange-600 opacity-50" />
          </div>
          <Link href="/insight" className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-orange-500 transition-all">
            Archive +
          </Link>
        </div>

        {/* Compact Grid 16:9 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {insights.map((post, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              // PERUBAHAN DI SINI: h-[320px] diganti menjadi aspect-video
              className="relative aspect-video group overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm"
            >
              {/* Image Background */}
              <Image 
                src={post.image} 
                alt={post.title} 
                fill 
                // object-cover memastikan gambar mengisi area 16:9 tanpa distorsi
                className="object-cover transition-transform duration-1000 group-hover:scale-105 grayscale-[0.3] group-hover:grayscale-0"
              />
              
              {/* Top Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />

              {/* Category Tag */}
              <div className="absolute top-4 left-4 z-20">
                <span className="px-2 py-0.5 bg-orange-600 text-[8px] font-black text-white uppercase tracking-widest">
                  {post.category}
                </span>
              </div>

              {/* Bottom Glass Panel */}
              <div className="absolute inset-x-0 bottom-0 px-6 py-3 backdrop-blur-md bg-white/5 dark:bg-black/40 border-t border-white/10 z-10 transition-all duration-500 group-hover:bg-orange-600/10">
                <div className="space-y-3">
                  {/* Metadata */}
                  <div className="flex justify-between items-center font-mono text-[8px] text-white/40 uppercase tracking-[0.2em]">
                    <span>{post.id}</span>
                    <span className="flex items-center gap-1"><Calendar size={8} /> {post.date}</span>
                  </div>
                  
                  {/* Title & Desc */}
                  <div className="space-y-1">
                    <h3 className="text-base font-black leading-tight text-white tracking-tight uppercase group-hover:text-orange-500 transition-colors">
                      <Link href={`/insight/${post.slug}`} className="after:absolute after:inset-0">
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-[11px] leading-relaxed text-white/60 line-clamp-2 font-medium">
                      {post.desc}
                    </p>
                  </div>
                  
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};