'use client';

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReCAPTCHA from "react-google-recaptcha";
import { 
  ArrowUpRight, Loader2, 
} from "lucide-react";

// --- EXTERNAL IMPORTS ---
import { useContactForm } from "@/hooks/useContactForm"; 

const CATEGORIES = [
  { id: 'dev', label: 'Development' },
  { id: 'design', label: 'UI/UX Design' },
  { id: 'ai', label: 'AI & Data' },
];

// --- ANIMATION VARIANTS ---
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" }
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } }
};

export default function ContactSectionBlueGrid() {
  const { 
    formData, setFormData, loader, handleSubmit, 
    captchaValue, setCaptchaValue, recaptchaRef, 
    showThanks, setShowThanks 
  } = useContactForm();

  const [theme, setTheme] = useState<"light" | "dark">("light");

useEffect(() => {
    const updateTheme = () => {
      const isDark = document.documentElement.classList.contains("dark");
      setTheme(isDark ? "dark" : "light");
    };

    // 1. Jalankan pengecekan awal secara asinkron
    requestAnimationFrame(updateTheme);

    // 2. Berlangganan (Subscribe) pada perubahan class di <html>
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // 3. Bersihkan observer saat pindah halaman
    return () => observer.disconnect();
  }, []);

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    // Ubah background dasar menjadi sedikit lebih kebiruan di light mode
    <section className="relative min-h-screen flex items-center justify-center py-20 px-6 font-sans overflow-hidden bg-slate-50/50 dark:bg-[#0a0a0a] text-slate-900 dark:text-white transition-colors duration-700">
      

   
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
      <div className="absolute inset-0 text-[#c5d7f7]/90 dark:text-sky-400/20 transition-colors duration-500" 
      style={{ 
      backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', 
      backgroundSize: '20px 20px' 
      }} 
      />
      </div>


      <div className="relative z-10 w-full max-w-6xl flex flex-col lg:flex-row gap-12 lg:gap-20">
        
        {/* === SISI KIRI: INFO (Animated & Blue Palette) === */}
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="flex-1 space-y-8 lg:sticky lg:top-24 h-fit"
        >
          <motion.div variants={fadeInUp}>
            <div className="flex items-center gap-3 mb-4">
              {/* Pulse biru */}
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-600"></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-blue-200/50">System Status: Online</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-tight">
              Initiate <br/>
              {/* Gradient text biru ke cyan */}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500">
                Collaboration.
              </span>
            </h1>
          </motion.div>
        </motion.div>

        {/* === SISI KANAN: FORM (Blue Glass) === */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-[1.5]"
        >
          <AnimatePresence mode="wait">
            {!showThanks ? (
              <motion.form 
                key="contact-form"
                onSubmit={handleSubmit} 
                exit={{ opacity: 0, y: -20 }}
                // Ubah border light mode menjadi agak kebiruan
                className="p-8 md:p-10 rounded-[40px] border backdrop-blur-xl shadow-2xl bg-white/90 border-blue-50 shadow-blue-100/80 dark:bg-white/5 dark:border-white/10 dark:shadow-none transition-all"
              >
                <div className="space-y-8">
                  {/* Category Pills (Blue Accent) */}
                  <div className="flex flex-wrap gap-3">
                    {CATEGORIES.map((cat) => (
                      <motion.button
                        key={cat.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="button"
                        onClick={() => handleChange('service', cat.label)}
                        className={`px-5 py-2 rounded-full text-xs font-bold uppercase border transition-all ${
                          formData.service === cat.label
                            // Active state: Blue
                            ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/30'
                            : 'bg-white/50 border-slate-200 text-slate-500 hover:border-blue-500 hover:text-blue-600 dark:bg-white/5 dark:border-white/10 dark:text-white/40 dark:hover:text-white dark:hover:border-blue-500'
                        }`}
                      >
                        {cat.label}
                      </motion.button>
                    ))}
                  </div>

                  {/* Inputs (Blue Focus) */}
                  <div className="space-y-5">
                    <div className="flex flex-col md:flex-row gap-5">
                      <div className="flex-1 space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest ml-2 text-slate-400">Name</label>
                        <input
                          type="text" required
                          // Focus ring warna biru
                          className="w-full border rounded-2xl px-5 py-4 outline-none transition-all bg-white/50 border-slate-200 dark:bg-black/20 dark:border-white/10 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                          placeholder="Citizen ID"
                          value={formData.name}
                          onChange={(e) => handleChange('name', e.target.value)}
                        />
                      </div>
                      <div className="flex-1 space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest ml-2 text-slate-400">Contact</label>
                        <input
                          type="email" required
                          className="w-full border rounded-2xl px-5 py-4 outline-none transition-all bg-white/50 border-slate-200 dark:bg-black/20 dark:border-white/10 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                          placeholder="email@network.com"
                          value={formData.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest ml-2 text-slate-400">Directive</label>
                      <textarea
                        required rows={4}
                        className="w-full border rounded-2xl px-5 py-4 outline-none transition-all resize-none bg-white/50 border-slate-200 dark:bg-black/20 dark:border-white/10 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                        placeholder="Input project parameters..."
                        value={formData.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Footer (Blue Button) */}
                  <div className="pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-6 border-slate-200/50 dark:border-white/10">
                    <div className="scale-75 origin-left overflow-hidden rounded-lg grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all">
                      <ReCAPTCHA ref={recaptchaRef} theme={theme} sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!} onChange={setCaptchaValue} />
                    </div>

                    <motion.button
                      whileHover={{ y: -2, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)" }}
                      whileTap={{ scale: 0.98 }}
                      disabled={loader || !captchaValue || !formData.service}
                      type="submit"
                      // Tombol biru di kedua mode untuk kontras tinggi
                      className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold bg-blue-600 text-white hover:bg-blue-700 transition-all disabled:opacity-50"
                    >
                      {loader ? <Loader2 size={18} className="animate-spin" /> : <ArrowUpRight size={18} />}
                      <span className="text-xs uppercase tracking-widest">Execute Transmission</span>
                    </motion.button>
                  </div>
                </div>
              </motion.form>
            ) : (
              // Success State (Blue Theme)
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-12 text-center rounded-[40px] bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-blue-100 dark:border-white/10 shadow-2xl"
              >
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-600/40">
                  <ArrowUpRight size={40} className="text-white" />
                </div>
                <h2 className="text-3xl font-black mb-2">Transmission Sent.</h2>
                <p className="text-slate-500 dark:text-white/40 mb-8">We will establish connection shortly.</p>
                <button onClick={() => setShowThanks(false)} className="text-blue-600 font-bold uppercase tracking-widest text-xs hover:underline">
                  New Transmission
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}