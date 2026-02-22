import { useState, useEffect, useRef } from "react";
import { ArrowUpRight, Play, Pause,  Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Geomining from "@/components/ui/geomining";


const allSlides = [
  { id: "slide-1", type: "video", subtitle: "CHAPTER 1", title: "Tech-Based Analysis", description: "Analisa Berbasis Teknologi & Software Terkini Kami menggunakan software industri seperti Slide2, Slide3, RS2, RS3, Surpac, Minescape, Leapfrog, dan tools geoteknik lainnya untuk menghasilkan analisa yang akurat, terukur, dan dapat dipertanggungjawabkan secara teknis.", media: "/video/geo-video.mp4", tag: "Chapter 1" },
  { id: "slide-2", type: "image", subtitle: "CHAPTER 2", title: "Practical & Field-Oriented Approach", description: "Pendekatan Praktis Berbasis Kondisi Pendekatan Praktis Berbasis Kondisi Lapangan Tidak hanya teori dan simulasi, setiap rekomendasi kami mempertimbangkan kondisi geologi, geoteknik, operasional tambang, dan faktor keselamatan di lapangan.", media: "/img/materi/materi-1.jpeg", tag: "Chapter 2" },
  { id: "slide-3", type: "video", subtitle: "CHAPTER 3", title: "Expert-Led Consulting", description: "Terhubung ke seluruh dunia dengan infrastruktur cloud 99.9% uptDidukung oleh Praktisi & Akademisi Berpengalaman Tim kami terdiri dari profesional pertambangan yang berpengalaman dalam desain lereng, analisa kestabilan, hidrogeologi, dan perencanaan tambang — memastikan solusi yang aplikatif dan bernilai ekonomis.", media: "/video/geo-video.mp4", tag: "Chapter 3" },
];



export default function ModernAdaptiveHero() {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentSlide = allSlides[current];

  // --- Fungsi Master Navigasi ---
  const changeSlide = (newIndex: number) => {
    setCurrent(newIndex);
    setIsPlaying(true); 
  };

  // --- Play/Pause Logic ---
  useEffect(() => {
    if (currentSlide.type === "video" && videoRef.current) {
      videoRef.current.load();
      if (isPlaying) {
        videoRef.current.play().catch(() => setIsPlaying(false));
      } else {
        videoRef.current.pause();
      }
    }
  }, [current, currentSlide.type, isPlaying]);

  const togglePlay = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsPlaying(!isPlaying);
  };


  return (
    // Transisi background adaptif: bg-slate-50 (Light Mode) -> dark:bg-[#020617] (Dark Mode)
    <section className="relative z-10 min-h-screen pt-20 backdrop-blur-md text-slate-900 dark:text-white transition-colors duration-500 overflow-hidden flex flex-col justify-center pb-16 lg:py-20">
      
      {/* --- Ambient Glow Background --- */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Glow Spheres */}
        <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-sky-400/20 dark:bg-sky-600/20 blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-screen" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-blue-500/10 dark:bg-blue-700/20 blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-screen" />
        <Geomining />
      </div>


      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col-reverse lg:flex-row gap-12 lg:gap-16 items-center">
        
        <div className="flex-1 w-full flex flex-col items-center text-center lg:items-start lg:text-left z-20">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 backdrop-blur-md mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-sky-500 dark:bg-sky-400 animate-ping" />
            <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-sky-600 dark:text-sky-400">
              {currentSlide.subtitle}
            </span>
          </motion.div>

          <div className="min-h-[140px] md:min-h-[180px] w-full flex flex-col items-center lg:items-start">
            <AnimatePresence mode="wait">
              <motion.div key={current} initial={{ opacity: 0, x: -20, filter: "blur(5px)" }} animate={{ opacity: 1, x: 0, filter: "blur(0px)" }} exit={{ opacity: 0, x: 20, filter: "blur(5px)" }} transition={{ duration: 0.4 }} className="flex flex-col gap-4">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-black leading-[1.05] text-slate-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-white dark:via-slate-200 dark:to-slate-400 drop-shadow-sm">
                  {currentSlide.title}
                </h1>
                <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-md leading-relaxed font-medium">
                  {currentSlide.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ========================================================= */}
        {/* BAGIAN KANAN: DOCK MORPHING PLAYER */}
        {/* ========================================================= */}
        <div className="flex-[1.2] w-full flex flex-col gap-4 sm:gap-6 z-20">
          
          {/* --- LAYAR UTAMA (ACTIVE VIEW) --- */}
          {/* Background layarnya diatur tetap hitam (bg-black) agar video tetap terlihat sinematik meski di Light Mode */}
          <div ref={containerRef} className={`relative w-full aspect-video rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-white/10 bg-black group/player`}>
            
            <AnimatePresence mode="popLayout">
              {allSlides.map((slide, index) => {
                if (index !== current) return null; 
                
                return (
                  <motion.div
                    key={slide.id}
                    layoutId={`media-${slide.id}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="absolute inset-0 w-full h-full"
                  >
                    {slide.type === "video" ? (
                      <video ref={videoRef} src={slide.media} playsInline loop className="absolute inset-0 w-full h-full object-cover" />
                    ) : (
                      <img src={slide.media} alt={slide.title} className="absolute inset-0 w-full h-full object-cover" />
                    )}

                    {/* Gradient Overlay Gelap agar teks dan tombol SELALU terbaca putih (Kontras Rasio) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40 pointer-events-none transition-opacity duration-300" />

                    {/* --- FITUR BARU: JUDUL MATERI DI DALAM VIDEO --- */}
                    <div className="absolute bottom-4 sm:bottom-4 left-4 sm:left-6 right-4 pointer-events-none z-20">
                       <motion.h2 
                         initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} 
                         className="text-xl sm:text-3xl font-bold text-white drop-shadow-lg"
                       >
                         {slide.title}
                       </motion.h2>
                       <motion.p 
                         initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} 
                         className="text-xs sm:text-sm text-white/80 mt-1 line-clamp-1 max-w-lg drop-shadow-md"
                       >
                         {slide.description}
                       </motion.p>
                    </div>

                    {/* HUD KONTROL PLAY/PAUSE (TENGAH) */}
                    {slide.type === "video" && (
                      <div className="absolute inset-0 z-10 flex items-center justify-center cursor-pointer" onClick={togglePlay}>
                        <div className={`transition-all duration-300 ${isPlaying ? 'opacity-0 scale-90 group-hover/player:opacity-100 group-hover/player:scale-100' : 'opacity-100 scale-100'}`}>
                          {!isPlaying && <div className="absolute inset-0 flex items-center justify-center"><div className="w-16 h-16 bg-sky-500/40 rounded-full animate-ping" /></div>}
                          {/* Tombol Kaca Blur Modern */}
                          <button className="relative p-4 sm:p-5 rounded-full bg-white/10 backdrop-blur-xl border border-white/30 hover:bg-sky-500/50 hover:border-sky-400 transition-all shadow-xl text-white">
                            {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Header Controls (Tipe dan Volume/Fullscreen) */}
                    <div className="absolute top-4 sm:top-5 left-4 sm:left-5 right-4 sm:right-5 flex justify-between items-start z-20 pointer-events-none">
                      <div className="px-3 sm:px-4 py-1 sm:py-1.5 bg-black/40 backdrop-blur-md rounded-full text-[9px] sm:text-[10px] font-bold border border-white/20 uppercase text-sky-400 tracking-widest text-shadow-sm">
                        {slide.type}
                      </div>
                    </div>

                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
          {/* --- THUMBNAIL DOCK (PLAYLIST BAWAH) --- */}
          <div className="w-full flex justify-center gap-3 sm:gap-4 px-2">
            {allSlides.map((slide, index) => {
              
              if (index === current) {
                return <div key={`placeholder-${slide.id}`} className="w-[18%] aspect-video" />
              }

              return (
                <motion.div
                  layoutId={`media-${slide.id}`} 
                  key={slide.id}
                  onClick={() => changeSlide(index)}
                  className="w-[18%] aspect-video rounded-lg sm:rounded-xl overflow-hidden cursor-pointer shadow-md dark:shadow-lg border-2 border-slate-200 dark:border-transparent hover:border-sky-500/50 opacity-70 hover:opacity-100 transition-all relative group bg-slate-200 dark:bg-slate-800"
                >
                  {slide.type === "video" ? (
                    <video src={slide.media} className="absolute inset-0 w-full h-full object-cover" preload="metadata" />
                  ) : (
                    <img src={slide.media} alt="" className="absolute inset-0 w-full h-full object-cover" />
                  )}
                  {/* Efek Hover Light/Dark */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent dark:bg-black/50 dark:group-hover:bg-black/10 transition-colors duration-300" />
                  
                  {/* Icon Tipe Media Kecil di Thumbnail */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-md">
                     {slide.type === "video" ? <Play className="w-5 h-5 text-white" fill="white" /> : <ImageIcon className="w-5 h-5 text-white" />}
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}} />
    </section>
  );
}