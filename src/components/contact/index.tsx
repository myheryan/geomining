'use client';

import { motion, AnimatePresence } from "framer-motion";
import { ContactInfo } from "./ContactInfo";
import { SuccessState } from "@/components/contact/SuccessState";
import { ContactFormFields } from "@/components/contact/ContactFormFields";
import { useContactForm } from "@/hooks/useContactForm";
import { Shield, Terminal } from "lucide-react";

export default function ContactSection() {
  const { showThanks, setShowThanks, ...formProps } = useContactForm();

  return (
    <section className="min-h-screen bg-white dark:bg-[#050608] text-slate-900 dark:text-white py-32 px-6 md:px-20 relative overflow-hidden flex items-center">
      
      {/* --- BACKGROUND: TECHNICAL GRID & STRATIGRAPHY --- */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {/* Engineering Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
        
        {/* Drill Points (Coordinates) */}
        <div 
          className="absolute inset-0 opacity-[0.2] dark:opacity-[0.4]"
          style={{
            backgroundImage: `radial-gradient(#ea580c 1px, transparent 1px)`,
            backgroundSize: '120px 120px',
          }}
        />

        {/* Industrial Accent Blur */}
        <div className="absolute top-1/4 -right-20 w-[500px] h-[500px] bg-orange-600/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <div className="flex flex-col lg:flex-row gap-20 items-start">
          
          {/* SISI KIRI: TECHNICAL INFO */}
          <div className="lg:w-1/3 space-y-12">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-orange-600 font-black uppercase tracking-[0.4em] text-[10px]">
                <Terminal size={14} /> System Interface
              </div>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.85]">
                Initialize <br /> <span className="text-slate-300 dark:text-slate-800 text-outline">Contact.</span>
              </h2>
              <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-sm">
                Hubungkan visi teknis Anda dengan solusi engineering yang presisi dan data-driven.
              </p>
            </div>
            
            <ContactInfo />
          </div>

          {/* SISI KANAN: FORM (TECHNICAL DOSSIER CARD) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1 w-full relative"
          >
            {/* Card Utama: Industrial Panel */}
            <div className="relative group">
              {/* Decorative Border Layer */}
              <div className="absolute -inset-0.5 bg-gradient-to-br from-orange-600/20 to-transparent rounded-2xl blur-sm opacity-50" />
              
              {/* Main Panel */}
              <div className="relative bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-2xl p-8 md:p-12 border border-slate-200 dark:border-slate-800 shadow-2xl">
                
                {/* Header Status Form */}
                <div className="flex items-center justify-between mb-10 border-b border-slate-100 dark:border-slate-800 pb-6">
                  <div className="flex items-center gap-4">
                    <div className="h-2 w-2 rounded-full bg-orange-600 animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Communication Channel // Secure</span>
                  </div>
                  <Shield size={16} className="text-slate-300 dark:text-slate-700" />
                </div>
                
                <AnimatePresence mode="wait">
                  {!showThanks ? (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <ContactFormFields {...formProps} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <SuccessState onReset={() => setShowThanks(false)} />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Technical Metadata Footer */}
                <div className="mt-10 pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                  <div className="font-mono text-[9px] text-slate-400 tracking-tighter uppercase">
                    Ref ID: <span className="text-orange-600">REQ-ST-2026</span>
                  </div>
                  <div className="font-mono text-[9px] text-slate-400 tracking-tighter uppercase">
                    Status: READY_TO_TRANSMIT
                  </div>
                </div>
              </div>

              {/* Decorative Corner Bracket */}
              <div className="absolute -bottom-2 -right-2 w-12 h-12 border-b-2 border-r-2 border-orange-600 pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}