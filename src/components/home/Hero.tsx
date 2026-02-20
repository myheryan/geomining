
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { ArrowUpRight, Play, Pause, Volume2, VolumeX, Maximize, Minimize, Image as ImageIcon, ChevronLeft, ChevronRight, GripHorizontal } from 'lucide-react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';

const allSlides = [
  { id: 1, type: "video", subtitle: "CHAPTER 1", title: "The Beginning", description: "Langkah awal menuju platform masa depan dengan kecepatan tak tertandingi.", media: "/video/geo-video.mp4" },
  { id: 2, type: "image", subtitle: "CHAPTER 2", title: "Data Insights", description: "Visualisasi data real-time untuk keputusan yang lebih tajam.", media: "/img/materi/materi-1.jpeg" },
  { id: 3, type: "video", subtitle: "CHAPTER 3", title: "Global Cloud", description: "Terhubung ke seluruh dunia dengan infrastruktur cloud 99.9% uptime.", media: "/video/geo-video.mp4" },
  { id: 4, type: "image", subtitle: "CHAPTER 4", title: "Core Security", description: "Pertahanan tingkat militer untuk data sensitif perusahaan Anda.", media: "/img/materi/materi-2.jpeg" },
  { id: 5, type: "video", subtitle: "CHAPTER 5", title: "AI Automation", description: "Mesin pintar yang mengambil alih tugas repetitif Anda tanpa henti.", media: "https://cdn.coverr.co/videos/coverr-cyberpunk-city-night-light-2559/1080p.mp4" }
];

const formatTime = (time: number) => {
  if (isNaN(time)) return "0:00";
  const min = Math.floor(time / 60);
  const sec = Math.floor(time % 60);
  return `${min}:${sec.toString().padStart(2, '0')}`;
};

export default function UltimateRotaryHero() {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isDesktop, setIsDesktop] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const [progress, setProgress] = useState(0);
  const [currentTimeDisplay, setCurrentTimeDisplay] = useState("0:00");
  const [durationDisplay, setDurationDisplay] = useState("0:00");
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentSlide = allSlides[current];

  // --- 1. FUNGSI MASTER UNTUK GANTI SLIDE (BEBAS ERROR LINTER) ---
  const changeSlide = (newIndex: number) => {
    setCurrent(newIndex);
    setProgress(0);
    setCurrentTimeDisplay("0:00");
  };

  const handleNext = () => changeSlide(current === allSlides.length - 1 ? 0 : current + 1);
  const handlePrev = () => changeSlide(current === 0 ? allSlides.length - 1 : current - 1);

  // Algoritma Relatif Roda
  const getDiff = (index: number, currentIndex: number, length: number) => {
    let diff = index - currentIndex;
    if (diff < -2) diff += length;
    if (diff > 2) diff -= length;
    return diff;
  };

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // --- 2. USE-EFFECT BERSIH (HANYA UNTUK PLAY VIDEO) ---
  useEffect(() => {
    if (currentSlide.type === "video") {
      if (videoRef.current) {
        videoRef.current.load();
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) playPromise.catch(() => setIsPlaying(false));
      }
    }
  }, [current, currentSlide.type]); // Linter bahagia karena array dependency lengkap!

  // Deteksi Swipe Layar Mobile
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 40; 
    if (info.offset.x < -swipeThreshold || info.offset.y < -swipeThreshold) {
      handleNext();
    } else if (info.offset.x > swipeThreshold || info.offset.y > swipeThreshold) {
      handlePrev();
    }
  };

  const togglePlay = (e?: React.MouseEvent<HTMLElement>) => {
    if (e) e.stopPropagation();
    if (currentSlide.type !== "video") return;
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (currentSlide.type !== "video") return;
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    if (videoRef.current) videoRef.current.muted = newMutedState;
  };

  const toggleFullScreen = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(err => console.error(err));
    } else {
      document.exitFullscreen();
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && currentSlide.type === "video") {
      const currentVideoTime = videoRef.current.currentTime;
      const totalDuration = videoRef.current.duration;
      setProgress((currentVideoTime / totalDuration) * 100);
      setCurrentTimeDisplay(formatTime(currentVideoTime));
      if (durationDisplay === "0:00" && !isNaN(totalDuration)) setDurationDisplay(formatTime(totalDuration));
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (videoRef.current && currentSlide.type === "video") {
      const rect = e.currentTarget.getBoundingClientRect();
      const percentage = (e.clientX - rect.left) / rect.width;
      videoRef.current.currentTime = percentage * videoRef.current.duration;
      setProgress(percentage * 100);
    }
  };

  // --- 3. MORPH VARIANT BERSIH (FIX TYPESCRIPT 'as const') ---
  const morphVariant = {
    animate: ({ diff, isDesktop }: { diff: number, isDesktop: boolean }) => {
      const isActive = diff === 0;
      const absDiff = Math.abs(diff);

      if (isActive) {
        return {
          x: isDesktop ? "-140px" : "0vw",
          y: isDesktop ? "0px" : "-120px",
          width: isDesktop ? "720px" : "88vw",
          height: isDesktop ? "405px" : "49.5vw", 
          borderRadius: "24px",
          opacity: 1,
          zIndex: 50,
          boxShadow: "0px 30px 60px -15px rgba(14,165,233,0.5)",
          transition: { type: "spring" as const, stiffness: 120, damping: 16 }
        };
      } else {
        const size = isDesktop 
          ? (absDiff === 1 ? "88px" : "64px") 
          : (absDiff === 1 ? "64px" : "48px");
          
        let xPos, yPos;

        if (isDesktop) {
          xPos = absDiff === 1 ? "360px" : "420px"; 
          yPos = diff === 1 ? "180px" : diff === -1 ? "-180px" : diff === 2 ? "320px" : "-320px";
        } else {
          yPos = absDiff === 1 ? "100px" : "130px"; 
          xPos = diff === 1 ? "25vw" : diff === -1 ? "-25vw" : diff === 2 ? "40vw" : "-40vw";
        }

        return {
          x: xPos,
          y: yPos,
          width: size,
          height: size,
          borderRadius: "999px",
          opacity: absDiff === 1 ? 0.8 : 0.3,
          zIndex: 10 - absDiff,
          boxShadow: "0px 10px 20px rgba(0,0,0,0.6)",
          transition: { type: "spring" as const, stiffness: 140, damping: 15 }
        };
      }
    },
    hover: { scale: 1.12, filter: "brightness(1.3)", cursor: "pointer" }
  };

  return (
    <section className="relative z-10 overflow-hidden min-h-screen bg-[#020617] flex items-center justify-center pt-24 pb-32 lg:py-20 text-white font-sans">
      
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 opacity-[0.1]" style={{ backgroundImage: `linear-gradient(to right, #38bdf8 1px, transparent 1px), linear-gradient(to bottom, #38bdf8 1px, transparent 1px)`, backgroundSize: '60px 60px', maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)', WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)' }} />
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-sky-600/30 blur-[150px] rounded-full mix-blend-screen animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-700/20 blur-[150px] rounded-full mix-blend-screen" />
      </div>

      <div className="relative z-10 w-full max-w-[1500px] mx-auto px-6 lg:px-10 flex flex-col-reverse lg:flex-row gap-6 lg:gap-16 items-center">
        
        {/* --- KIRI: TYPOGRAPHY --- */}
        <div className="flex-1 w-full flex flex-col items-start mt-2 lg:mt-0 z-20">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex items-center gap-2 px-4 py-2 rounded-full border border-sky-500/20 bg-sky-500/10 backdrop-blur-md mb-6">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
            <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-sky-400">
              {currentSlide.subtitle}
            </span>
          </motion.div>

          <div className="min-h-[140px] md:min-h-[220px]">
            <AnimatePresence mode="wait">
              <motion.div key={current} initial={{ opacity: 0, x: -30, filter: "blur(10px)" }} animate={{ opacity: 1, x: 0, filter: "blur(0px)" }} exit={{ opacity: 0, x: 30, filter: "blur(10px)" }} transition={{ duration: 0.5, ease: "easeOut" }} className="flex flex-col gap-4">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] font-black leading-[1.05] text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-200 to-slate-500 drop-shadow-sm">
                  {currentSlide.title}
                </h1>
                <p className="text-base sm:text-lg text-slate-400 max-w-lg leading-relaxed font-medium">
                  {currentSlide.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-col sm:flex-row items-center gap-4 mt-6 w-full sm:w-auto">
            <button className="w-full sm:w-auto group relative px-10 py-4 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-xl shadow-[0_0_40px_-10px_rgba(14,165,233,0.6)] overflow-hidden transition-all duration-300">
              <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
              <span className="relative flex items-center justify-center gap-2 text-lg">
                Deploy Now <ArrowUpRight size={22} />
              </span>
            </button>
          </motion.div>
        </div>

        {/* --- KANAN: HUD PEMUTAR & RODA KESATUAN --- */}
        <div 
          ref={containerRef}
          className={`flex-[1.4] w-full relative min-h-[480px] lg:min-h-[700px] flex items-center justify-center 
            ${isFullscreen ? 'fixed inset-0 z-50 bg-black !min-h-screen' : ''}
          `}
        >
          {/* Overlay Khusus untuk Menangkap Swipe secara penuh */}
          <motion.div 
            onPanEnd={handleDragEnd} 
            className="absolute inset-0 z-40 touch-pan-y" 
            style={{ touchAction: 'pan-y' }} 
          />

          {allSlides.map((slide, index) => {
            const diff = getDiff(index, current, allSlides.length);
            const isActive = diff === 0;

            return (
              <motion.div
                key={slide.id}
                custom={{ diff, isDesktop }}
                variants={morphVariant}
                animate="animate"
                whileHover={!isActive ? "hover" : ""}
                onClick={() => !isActive && changeSlide(index)} // <-- FUNGSI MASTER DITERAPKAN DI SINI
                className={`absolute bg-slate-900 overflow-hidden transform-gpu
                  ${isActive ? 'border border-white/20 z-50' : 'border-2 border-white/10'}
                `}
              >
                {/* KONTEN MEDIA */}
                {slide.type === "video" ? (
                  <video
                    ref={isActive ? videoRef : null} 
                    src={slide.media}
                    muted={isActive ? isMuted : true}
                    playsInline
                    loop 
                    className="absolute inset-0 w-full h-full object-cover"
                    onTimeUpdate={isActive ? handleTimeUpdate : undefined}
                  />
                ) : (
                  <Image fill src={slide.media} alt={slide.title} className="absolute inset-0 w-full h-full object-cover" />
                )}

                {/* OVERLAY */}
                <div className={`absolute inset-0 pointer-events-none transition-all duration-500
                  ${isActive ? 'bg-gradient-to-b from-black/20 via-transparent to-black/90' : 'bg-black/50 group-hover:bg-black/20'}
                `} />

                {/* ICON THUMBNAIL BULAT */}
                <AnimatePresence>
                  {!isActive && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      {slide.type === "video" ? <Play className="w-6 h-6 sm:w-8 sm:h-8 text-white drop-shadow-md" /> : <ImageIcon className="w-6 h-6 sm:w-8 sm:h-8 text-white drop-shadow-md" />}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* KONTROL LAYAR UTAMA (AKTIF) */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, delay: 0.2 }} className="absolute inset-0 w-full h-full">
                      
                      {slide.type === "video" && (
                        <div className="absolute inset-0 z-10 flex items-center justify-center cursor-pointer" onClick={togglePlay}>
                          <div className={`transition-all duration-300 ${isPlaying ? 'opacity-0 scale-90 hover:opacity-100 hover:scale-100' : 'opacity-100 scale-100'}`}>
                            {!isPlaying && <div className="absolute inset-0 flex items-center justify-center"><div className="w-20 h-20 bg-sky-500/40 rounded-full animate-ping" /></div>}
                            <button className="relative p-5 rounded-full bg-black/40 backdrop-blur-xl border border-white/20 hover:bg-sky-500/50 hover:border-sky-400 transition-all shadow-2xl">
                              {isPlaying ? <Pause size={28} className="fill-white" /> : <Play size={28} className="fill-white ml-1" />}
                            </button>
                          </div>
                        </div>
                      )}

                      <div className="absolute top-4 left-4 right-4 sm:top-6 sm:left-6 sm:right-6 flex justify-between items-start z-20 pointer-events-none">
                        <div className="px-4 py-1.5 bg-black/50 backdrop-blur-md rounded-full text-[10px] sm:text-xs font-bold border border-white/20 uppercase text-sky-400 tracking-widest">
                          {slide.type}
                        </div>
                        <div className="flex gap-2 pointer-events-auto">
                          {slide.type === "video" && (
                            <button onClick={toggleMute} className="p-2.5 sm:p-3 rounded-full bg-black/50 hover:bg-white/20 backdrop-blur-md border border-white/10 transition-all text-white hover:text-sky-400">
                              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                            </button>
                          )}
                          <button onClick={toggleFullScreen} className="p-2.5 sm:p-3 rounded-full bg-black/50 hover:bg-white/20 backdrop-blur-md border border-white/10 transition-all text-white hover:text-sky-400 hidden sm:block">
                            {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
                          </button>
                        </div>
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 z-20 flex flex-col gap-2 pointer-events-none">
                        <div onClick={handleSeek} className="w-full h-2 bg-white/20 rounded-full relative overflow-hidden pointer-events-auto cursor-pointer group/progress">
                          {slide.type === "video" ? (
                            <div style={{ width: `${progress}%` }} className="absolute top-0 left-0 h-full bg-gradient-to-r from-sky-400 to-blue-600 rounded-full transition-all duration-75 ease-linear" />
                          ) : (
                            <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-sky-400 to-blue-600 rounded-full opacity-50" />
                          )}
                        </div>
                        {slide.type === "video" && (
                          <div className="flex justify-between items-center text-[10px] font-bold text-white/80 tracking-widest font-mono">
                            <span>{currentTimeDisplay}</span>
                            <span>{durationDisplay}</span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}

          {/* --- TUAS KENDALI (ROTARY HANDLE) --- */}
          {!isFullscreen && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }}
              className={`absolute z-50 flex items-center justify-center
                ${isDesktop 
                  ? 'right-[-40px] top-1/2 -translate-y-1/2 rotate-90' 
                  : 'bottom-[5px] sm:bottom-[10px] left-1/2 -translate-x-1/2' 
                }
              `}
            >
              <div className="flex items-center gap-4 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-full px-6 py-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.5)] pointer-events-auto">
                <button onClick={handlePrev} className="p-1 hover:text-sky-400 transition-colors active:scale-90">
                  <ChevronLeft size={24} className="sm:w-6 sm:h-6" />
                </button>
                
                <div className="flex flex-col items-center gap-1 opacity-60 px-2 cursor-grab active:cursor-grabbing">
                  <GripHorizontal size={20} className="sm:w-5 sm:h-5" />
                  <span className="text-[8px] font-bold tracking-widest uppercase mt-[-2px]">Swipe</span>
                </div>

                <button onClick={handleNext} className="p-1 hover:text-sky-400 transition-colors active:scale-90">
                  <ChevronRight size={24} className="sm:w-6 sm:h-6" />
                </button>
              </div>
            </motion.div>
          )}

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