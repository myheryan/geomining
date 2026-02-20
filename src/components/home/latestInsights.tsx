"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";

// Dummy data
const insights = [
  {
    title: "Masa Depan Eksplorasi Geologi Berbasis AI",
    excerpt: "Bagaimana kecerdasan buatan membantu memetakan potensi sumber daya mineral dengan akurasi yang belum pernah ada sebelumnya.",
    category: "Technology",
    date: "12 Feb 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800",
    author: { name: "Irfan Marwanza", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100" },
    slug: "#"
  },
  {
    title: "Menjaga Keselamatan di Area Tambang Terbuka",
    excerpt: "Protokol keselamatan terbaru yang wajib diterapkan untuk meminimalisir risiko geoteknikal di lapangan.",
    category: "Safety",
    date: "08 Feb 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1541888087545-081561081546?q=80&w=800",
    author: { name: "Kemal Ghifari", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" },
    slug: "#"
  },
  {
    title: "Pemodelan Sumber Daya Batubara 3D",
    excerpt: "Langkah demi langkah membangun model geologi 3D yang akurat menggunakan perangkat lunak terkini.",
    category: "Tutorial",
    date: "01 Feb 2026",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=800",
    author: { name: "Faidh Muhlis", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100" },
    slug: "#"
  }
];

export default function LatestInsights() {
  return (
    <section className="relative py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-500 overflow-hidden">
      
      {/* --- BACKGROUND GRIDS --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Light Mode Grid */}
        <div 
          className="absolute inset-0 opacity-20 dark:opacity-0 transition-opacity duration-500" 
          style={{ 
            backgroundImage: 'linear-gradient(#c4c5c5 1px, transparent 1px), linear-gradient(90deg, #c4c5c5 1px, transparent 1px)', 
            backgroundSize: '80px 80px' 
          }}    
        />
        {/* Dark Mode Grid */}
        <div 
          className="absolute inset-0 opacity-0 dark:opacity-20 transition-opacity duration-500" 
          style={{ 
            backgroundImage: 'linear-gradient(#0ea5e9 1px, transparent 1px), linear-gradient(90deg, #0ea5e9 1px, transparent 1px)', 
            backgroundSize: '80px 80px' 
          }} 
        />
        {/* Dot Grid (Adaptive) */}
        <div 
          className="absolute inset-0 text-slate-300 dark:text-sky-400/10 transition-colors duration-500" 
          style={{ 
            backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', 
            backgroundSize: '20px 20px' 
          }} 
        />
        {/* Ambient Glow for Dark Mode */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2 bg-sky-500/5 dark:bg-sky-500/10 blur-[120px] rounded-full pointer-events-none transition-opacity duration-500" />
      </div>

      <div className="container relative z-10 mx-auto px-6 max-w-7xl">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="flex-none max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
              Insight: Exploring the future
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              Temukan pemikiran terbaru, panduan, dan tren terkini seputar dunia geologi dan pertambangan.
            </p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="pb-1"
          >
            <Link 
              href="/insight" 
              className="inline-flex items-center gap-2 font-semibold text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 transition-colors group"
            >
              Lihat semua artikel 
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* --- GRID KARTU ARTIKEL --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {insights.map((post, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Link href={post.slug} className="block group h-full">
                <article className="flex flex-col h-full bg-white dark:bg-slate-900/60 rounded-[2rem] overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl dark:shadow-none dark:hover:shadow-2xl dark:hover:shadow-sky-900/20 hover:-translate-y-2 transition-all duration-300 backdrop-blur-sm">
                  
                  {/* Image Container */}
                  <div className="relative h-56 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <Image 
                      src={post.image} 
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Floating Category Badge */}
                    <div className="absolute top-4 left-4 px-4 py-1.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-full text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider shadow-sm">
                      {post.category}
                    </div>
                  </div>

                  {/* Content Container */}
                  <div className="flex flex-col flex-grow p-6 lg:p-8">
                    <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-4 font-medium">
                      <span>{post.date}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                      <span className="flex items-center gap-1.5">
                        <Clock size={14} /> {post.readTime}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-snug mb-3 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors duration-300">
                      {post.title}
                    </h3>
                    
                    <p className="text-slate-600 dark:text-slate-400 line-clamp-3 mb-6 flex-grow leading-relaxed">
                      {post.excerpt}
                    </p>

                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}