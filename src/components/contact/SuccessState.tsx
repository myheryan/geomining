'use client';

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

interface SuccessStateProps {
  onReset: () => void;
}

export const SuccessState = ({ onReset }: SuccessStateProps) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.9 }} 
    animate={{ opacity: 1, scale: 1 }}
    className="py-20 text-center space-y-8"
  >
    <div className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-sky-50 text-sky-600 border border-sky-100 shadow-xl shadow-sky-100/50">
      <CheckCircle2 size={40} />
    </div>
    <div className="space-y-3">
      <h3 className="text-4xl font-bold tracking-tighter text-slate-900">Message Received.</h3>
      <p className="text-slate-500 max-w-xs mx-auto text-lg">
        We will review your details and get back to you within 24 hours.
      </p>
    </div>
    <button 
      onClick={onReset} 
      className="text-xs font-bold text-blue-600 border-b-2 border-blue-600 pb-1 uppercase tracking-widest hover:text-sky-400 hover:border-sky-400 transition-all"
    >
      Send another
    </button>
  </motion.div>
);