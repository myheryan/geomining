"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowRightIcon, ZapIcon, CheckIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const allSlides = [
  {
    id: 1,
    title: "Lorem ipsum dolor sit amet",
    description: "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1000",
    tag: "Lorem • 2024"
  },
  {
    id: 2,
    title: "Sed ut perspiciatis unde omnis",
    description: "Iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1000",
    tag: "Ipsum • Lorem"
  },
  {
    id: 3,
    title: "At vero eos et accusamus et iusto",
    description: "Odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti.",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1000",
    tag: "Dolor • Sit"
  },
  {
    id: 4,
    title: "Quis autem vel eum iure ea",
    description: "Reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur vel illum.",
    image: "https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?q=80&w=1000",
    tag: "Amet • Ad"
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  const trustedUserImages = [
    'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=50',
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop'
  ];

  const thumbnails = allSlides.filter((_, index) => index !== current);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === allSlides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev === allSlides.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrent((prev) => (prev === 0 ? allSlides.length - 1 : prev - 1));

  return (
    <section id="home" className="relative z-10 overflow-hidden">
      <div className="mx-auto px-4 min-h-screen w-full flex items-center justify-center">
        
        {/* --- LAYER BACKGROUND --- */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
              <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden" aria-hidden="true">
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="blueDiagonalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#05a7e1" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#013cff" stopOpacity="0.5" />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#blueDiagonalGradient)" />
          </svg>
        </div>
<div className="absolute top-0 left-1/4 w-[800px] h-[800px] rounded-full blur-[120px]" />
          <div className="absolute inset-0 -z-10 pointer-events-none opacity-10" aria-hidden="true">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="6000 8900 67733.32 38100" 
              className="h-[1500px] bg-[50%_20%]"
            >
              <g id="Layer_x0020_1">
                <motion.path animate={{  y: [0, -20, 0], rotate: [0, 1, 0] }}
                    transition={{ duration: 6, repeat: Infinity,  ease: "easeInOut"}} fill="#767676" fillRule="nonzero" d="M28876.93 16474.39c-949.57,-263.8 -2358.73,-460.65 -3155.95,-549.71 -1817.99,-203.05 -6671.63,-409.59 -8249.52,240.48 -1658.99,683.43 -766.6,2340.87 -1053.05,3647.44 -20.43,92.98 -46.7,184.08 -80.33,273.06 -2.04,5.27 -4.69,10.31 -6.73,15.66 -15.16,39.01 -31.2,77.79 -49.39,115.91 -20.62,43.28 -43.28,85.98 -68.17,127.99 -28.28,47.94 -58.36,93.45 -89.45,137.39 -3.5,4.96 -7.11,9.84 -10.72,14.8 -31.1,43.05 -63.4,84.79 -96.95,124.65 0.19,0.11 0.3,0.11 0.39,0.19 -744.41,884.93 -2094.14,946.21 -3283.83,1139.52 -19.66,3.2 -40.36,6.81 -61.94,10.7 -601.37,108.61 -1172.77,342.97 -1682.04,680.7 -563.43,373.73 -1272.16,941.43 -1677.37,1637.4 -1115.49,1915.63 233.09,3951.63 2073.73,4656.56 -769.4,-1146.72 -653.1,-2336.22 277.53,-3337.06 1.46,-1.54 2.92,-3.09 4.27,-4.66 262.37,-280.94 607.9,-469.6 982.38,-556.51 734.28,-170.39 2115.17,-498.58 3053.85,-767.95 1658.91,-476.02 1336.72,-1587.04 1264.47,-2752.89 -2.81,-45.9 -5.23,-91.98 -7.19,-138.1 -0.5,-10.97 -0.77,-21.97 -1.16,-33.05 -1.38,-37.44 -2.34,-74.87 -2.92,-112.41 -0.19,-15.77 -0.3,-31.51 -0.39,-47.28 -0.11,-33.16 0.2,-66.21 0.78,-99.37 0.38,-18.19 0.77,-36.36 1.35,-54.55 1.07,-30.82 2.72,-61.67 4.57,-92.37 1.16,-19.66 2.23,-39.31 3.81,-58.94 2.31,-29.77 5.54,-59.51 8.73,-89.28 2.24,-19.93 4.08,-39.86 6.62,-59.71 4.08,-31.4 9.43,-62.63 14.69,-93.94 2.92,-17.78 5.24,-35.59 8.66,-53.29 19.05,-100.36 44.24,-199.93 77.59,-298.45 317.8,-938.79 1273.6,-1160.41 2159.11,-1267.37 2176.83,-263.05 4881.18,-217.35 7065.98,8.36 949.68,98.13 1889.55,314.88 2827.27,507.03 4.38,-131.26 7.39,-263.05 7.39,-395.48 0,-849.72 -92.38,-1677.76 -266.07,-2475.47z"/>
                <motion.path animate={{  y: [0, -20, 0], rotate: [0, 1, 0] }}
                    transition={{ duration: 6, repeat: Infinity,  ease: "easeInOut"}} fill="#555555" fillRule="nonzero" d="M23650.03 20451.84c-42.78,0.97 -85.56,2.24 -128.26,3.5 -29.28,0.97 -58.64,1.35 -87.91,2.43 0.08,0.27 0.19,0.58 0.39,0.77 -199.63,7 -398.4,16.54 -595.52,31.01 -934.83,68.75 -2425.48,276.37 -2585.24,1437.28 -115.64,839.89 190.2,1632.26 -69.91,2462.61 -541.47,1728.23 -2392.31,1514.19 -3992.37,1719.19 -412.32,52.79 -1319.71,202.66 -1803.21,434.79 -466.18,223.64 -815.79,473.65 -1150.41,1041.86 -283.37,481.18 -352.89,1070.85 -134.88,1584.89 134.49,316.92 356.81,585.21 671.96,734.4 103.37,49.01 981.69,326.15 1107.05,312.84 0.66,0.19 1.44,0.77 2.13,0.85 186.42,-205.97 429.82,-1138.72 1665.3,-1443.6 1169.07,-288.41 2050.61,171.07 2980.83,-271.4 2195.8,-1044.48 420.01,-3215.39 1580.7,-4453.01 483.42,-515.39 1693.42,-715.02 2867.07,-775.61l0 0.08c29.08,-1.46 57.94,-2.7 87.03,-3.97 41.43,-1.95 82.94,-3.69 124.29,-5.34 33.35,-1.27 66.79,-2.54 100.06,-3.62 56.98,-1.73 113.76,-3.39 170.16,-4.57 707.16,-15.74 1360.84,11.77 1782.98,41.93 613.71,43.85 1276.63,244.75 1901.12,363.11 366.04,-820.56 639.3,-1691.38 806.65,-2599.43 -1702.93,-432.45 -3536.88,-654.65 -5300.01,-610.99z"/>
                <motion.path animate={{  y: [0, -20, 0], rotate: [0, 1, 0] }}
                    transition={{ duration: 6, repeat: Infinity,  ease: "easeInOut"}} fill="#555555" fillRule="nonzero" d="M28085.78 14110c-7.85,-17.01 -16.12,-33.93 -24.2,-50.86 -3,-6.12 -6.04,-12.35 -8.96,-18.55 -22.24,-47.55 -45.59,-94.44 -68.36,-141.68 -18.74,-38.82 -36.94,-77.9 -56.21,-116.41 -11.27,-22.47 -23.12,-44.63 -34.51,-67.1 -3.99,-7.69 -8.16,-15.27 -12.04,-23.04 -34.35,-67.01 -69.17,-133.83 -104.75,-200.15 -5.35,-10.09 -10.5,-20.32 -15.93,-30.43 -12.96,-24.12 -26.47,-47.83 -39.59,-71.76 -7.69,-14.11 -15.85,-27.81 -23.65,-41.81 -42.09,-76.14 -84.21,-152.3 -128.07,-227.36 0,0 0,0 0,0 -98.79,-169.12 -202.55,-334.92 -309.53,-498.38 -11.27,-17.2 -22.55,-34.32 -33.93,-51.44 -67.67,-102.41 -137.39,-203.43 -208.2,-303.6 -15.66,-22.17 -31.51,-44.16 -47.36,-66.22 -24.59,-34.23 -48.63,-68.96 -73.52,-102.9 -0.85,-0.19 -1.73,-0.27 -2.51,-0.47 -202.38,-276.17 -415.16,-544.19 -641.05,-800.52 -1294.8,-162.58 -2634.72,-237.75 -3808.37,-290.57 -2112.14,-95.01 -6077.96,-312.84 -8024.98,319.27 -314.19,101.99 -549.24,227.82 -726.71,372.24 -0.79,0.11 -1.57,0.3 -2.23,0.38 -6.04,4.96 -11.49,10.12 -17.42,15.08 -19.43,16.35 -38.21,32.86 -56.21,49.59 -13.81,13.04 -27.31,26.16 -40.35,39.39 -11.96,12.16 -23.24,24.51 -34.51,36.94 -21.7,23.73 -42.21,47.85 -61.36,72.47 -7.69,9.7 -15.38,19.43 -22.66,29.36 -12.46,17 -24.7,34.04 -36.08,51.43 -3.31,4.88 -6.23,9.93 -9.35,14.89 -22.08,34.51 -42.28,69.82 -60.48,105.71 -3.42,6.62 -6.81,13.31 -10.11,20.01 -9.35,19.27 -18.67,38.43 -26.94,57.97 -328.6,771.14 104.84,1814.88 -164.64,2781.78 -6.01,21.67 -14.39,41.41 -21.09,62.52 -119.8,378.36 -414.67,966.91 -710.39,1198.16 -363.89,284.53 -4032.11,1757.01 -4726.07,2242.43 -55.32,38.71 -108.72,78.4 -160.46,118.95 -18.35,14.47 -35.58,29.55 -53.47,44.24 -32.48,26.44 -65.14,52.79 -96.18,80.02 -21.39,18.77 -41.32,38.13 -62.02,57.17 -25.97,23.93 -52.32,47.66 -77.24,72.17 -21.97,21.58 -42.67,43.77 -63.87,65.74 -21.8,22.66 -43.96,45.13 -64.86,68.06 -21.89,24.12 -42.59,48.63 -63.51,73.13 -18.58,21.7 -37.43,43.28 -55.32,65.25 -21.31,26.27 -41.43,53.01 -61.67,79.66 -15.85,20.9 -31.89,41.6 -47.16,62.71 -20.51,28.51 -40.05,57.48 -59.51,86.45 -13.24,19.74 -26.63,39.39 -39.39,59.32 -19.74,30.93 -38.51,62.24 -56.98,93.56 -11,18.58 -21.97,36.93 -32.47,55.62 -18.67,33.25 -36.47,66.9 -53.89,100.64 -8.85,17.12 -17.7,34.24 -26.16,51.44 -17.59,35.7 -34.32,71.67 -50.45,107.86 -7,15.63 -13.92,31.21 -20.62,46.95 -16.23,38.12 -31.7,76.55 -46.5,115.25 -5.24,13.81 -10.5,27.7 -15.55,41.7 -14.96,40.75 -29.08,81.71 -42.31,123.03 -3.78,11.85 -7.47,23.73 -11.16,35.59 -13.43,43.58 -26.08,87.32 -37.66,131.48 -2.51,9.43 -4.85,18.97 -7.27,28.39 -11.89,46.59 -22.86,93.26 -32.67,140.31 -1.46,6.92 -2.84,13.81 -4.19,20.81 -10.12,49.59 -19.27,99.4 -27.23,149.57 -0.58,3.81 -1.08,7.69 -1.66,11.47 -21,135.46 -33.74,272.48 -39.58,410.59 -38.32,914.36 249.05,1872.62 764.16,2695.5 87.52,-1106.25 702.01,-2016.08 1601.41,-2595.94 118.83,-76.63 242.71,-147.42 370.89,-212.2 174.35,-88.1 865.58,-540.28 1669.77,-931.29 1001.83,-487 2136.48,-921.78 2173.33,-935.87 2030.27,-778.83 290.07,-2951.09 1312.5,-4214.3 514.04,-635.1 1705.57,-836.69 2850.22,-907.58 531.35,-27.4 1030.04,-36.67 1424.16,-43.45 174.85,-2.53 337.32,-5.26 483.69,-9.73 29.86,-0.99 59.9,-1.84 88.29,-2.92 3106.75,-119.52 6147.7,3.12 9210.49,522.89 -46.76,-110.48 -95.49,-219.97 -145.58,-328.61z"/>
              </g>
            </svg>
          </div>
        </div>

        {/* --- KONTEN UTAMA --- */}
        <div className="flex flex-col-reverse md:flex-row gap-10 items-center max-w-7xl w-full">
          <div className="text-left flex-1">
            {/* Trusted Users */}
            <motion.a href="#!" className="inline-flex items-center gap-3 pl-2 pr-4 py-1 rounded-full mb-2 bg-white/30 backdrop-blur-sm border border-white/20"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex -space-x-2">
                {trustedUserImages.map((src, i) => (
                  <motion.img key={i} src={src} alt="Client" className="size-6 rounded-full border border-white/50" />
                ))}
              </div>
              <span className="text-xs text-gray-700 font-medium">Lorem ipsum dolor sit amet</span>
            </motion.a>

            {/* Teks Dinamis */}
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 30, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl md:text-6xl font-bold leading-tight bg-clip-text text-transparent bg-linear-to-r from-sky-500 to-blue-800">
                  {allSlides[current].title}
                </h1>
                <p className="max-w-lg mb-8 text-gray-700 text-lg leading-relaxed">
                  {allSlides[current].description}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Button */}
            <div className="flex gap-4 mb-10">
              <a href="#contact" className="px-8 py-3 rounded-full bg-blue-600 text-white font-bold flex items-center gap-3 hover:bg-blue-700 transition shadow-lg shadow-blue-500/20">
                LOREM IPSUM <ArrowRightIcon size={18} />
              </a>
            </div>

            {/* Badges */}
            <div className="flex flex-row gap-4 py-2">
              <div className="bg-white/30 flex items-center gap-3 p-3 rounded-2xl backdrop-blur-md border border-white/40 shadow-sm">
                <div className="bg-white/50 p-2 rounded-full">
                  <ZapIcon className="size-5 text-sky-600" />
                </div>
                <div>
                  <div className='bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-blue-800 font-bold text-sm'>Lorem ipsum dolor</div>
                  <div className="text-gray-600 text-xs">Consectetur adipiscing elit</div>
                </div>
              </div>

              <div className="bg-white/30 flex items-center gap-3 p-3 rounded-2xl backdrop-blur-md border border-white/40 shadow-sm">
                <div className="bg-white/50 p-2 rounded-full">
                  <CheckIcon className="size-5 text-cyan-600" />
                </div>
                <div>
                  <div className='bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-blue-800 font-bold text-sm'>Sed ut perspiciatis</div>
                  <div className="text-gray-600 text-xs">Natus error sit voluptatem</div>
                </div>
              </div>
            </div>
          </div>

          {/* SISI KANAN: Visual */}
          <div className="flex-1 w-full mt-20 max-w-2xl relative">
            <motion.div className="rounded-3xl overflow-hidden border border-white/30 shadow-2xl bg-white/10 p-2 backdrop-blur-sm"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative aspect-16/10 rounded-2xl overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={current}
                    src={allSlides[current].image}
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
                <div className="absolute left-4 top-4 px-3 py-1 rounded-full bg-black/30 backdrop-blur-md text-[10px] text-white uppercase font-bold border border-white/20">
                  {allSlides[current].tag}
                </div>
              </div>
            </motion.div>

            {/* Thumbnails */}
            <div className="mt-6 flex gap-3 items-center">
              {thumbnails.map((thumb) => (
                <button
                  key={thumb.id}
                  onClick={() => setCurrent(allSlides.findIndex(s => s.id === thumb.id))}
                  className="w-20 h-14 rounded-xl overflow-hidden border-2 border-transparent hover:border-blue-500 transition-all hover:scale-105 shadow-md group relative"
                >
                  <motion.img src={thumb.image} className="w-full h-full object-cover" alt="thumbnail" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                </button>
              ))}
              
              <div className="ml-auto flex gap-2">
                <button onClick={prevSlide} className="p-2 rounded-full bg-white/80 hover:bg-white text-blue-900 shadow-sm border border-blue-100 transition">
                  <ChevronLeft size={20} />
                </button>
                <button onClick={nextSlide} className="p-2 rounded-full bg-white/80 hover:bg-white text-blue-900 shadow-sm border border-blue-100 transition">
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}