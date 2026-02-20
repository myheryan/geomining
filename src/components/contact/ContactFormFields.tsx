'use client';

import React from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { ArrowUpRight, Fingerprint, Layers, Orbit, Sparkles, Asterisk, Loader2 } from "lucide-react";
import EditorialInput from "@/components/ui/editorialInput";

// 1. Definisikan tipe data untuk Form Data
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  service: string;
}

export const CATEGORIES = [
  { id: '1', label: 'Career', icon: Fingerprint },
  { id: '2', label: 'Partnership', icon: Layers },
  { id: '3', label: 'Dev', icon: Orbit }, 
  { id: '4', label: 'AI', icon: Sparkles },  
  { id: '5', label: 'Other', icon: Asterisk },
];

interface FormFieldsProps {
  formData: ContactFormData; // 2. Ganti 'any' dengan ContactFormData
  setFormData: (data: ContactFormData) => void; // 3. Ganti 'any' dengan ContactFormData
  loader: boolean;
  handleSubmit: (e: React.FormEvent) => void;
  captchaValue: string | null;
  setCaptchaValue: (val: string | null) => void;
  recaptchaRef: React.RefObject<ReCAPTCHA | null>; // 4. Ganti 'any' dengan tipe Ref khusus ReCAPTCHA
}

export const ContactFormFields = ({
  formData,
  setFormData,
  loader,
  handleSubmit,
  captchaValue,
  setCaptchaValue,
  recaptchaRef
}: FormFieldsProps) => (
  <form onSubmit={handleSubmit} className="relative space-y-8">
    
    {/* Category Picker Section */}
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <p className="text-[9px] font-black uppercase tracking-[0.3em] text-sky-500 whitespace-nowrap">Project Category</p>
        <div className="h-px flex-1 bg-gradient-to-r from-slate-200 dark:from-slate-800 to-transparent" />
      </div>

      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setFormData({ ...formData, service: cat.label })}
            className={`group relative flex items-center gap-2 px-3 py-2.5 rounded-xl border transition-all duration-300 text-[9px] font-bold uppercase tracking-wider overflow-hidden ${
              formData.service === cat.label
                ? 'bg-sky-500 text-white border-sky-400'
                : 'bg-slate-50 dark:bg-slate-900/50 border-slate-100 dark:border-slate-800 text-slate-400 hover:border-sky-500/50'
            }`}
          >
            <div className="relative z-10 flex items-center gap-2">
              <cat.icon size={12} className={formData.service === cat.label ? 'text-white' : 'text-sky-500/50'} />
              {cat.label}
            </div>
          </button>
        ))}
      </div>
    </div>

    {/* Inputs Section */}
    <div className="grid grid-cols-1 gap-6">
      <EditorialInput 
        label="Identity" 
        placeholder="Full name" 
        value={formData.name} 
        onChange={(v) => setFormData({...formData, name: v})} 
      />
      <EditorialInput 
        label="Email" 
        placeholder="Work email address" 
        type="email" 
        value={formData.email} 
        onChange={(v) => setFormData({...formData, email: v})} 
      />
      <EditorialInput 
        label="Message" 
        placeholder="Project details..." 
        value={formData.message} 
        onChange={(v) => setFormData({...formData, message: v})} 
        isTextArea 
      />
    </div>

    {/* Footer Section */}
    <div className="space-y-6 pt-6 border-t border-slate-100 dark:border-slate-800/50">
      <div className="flex justify-center lg:justify-start">
        <div className="scale-[0.85] origin-center lg:origin-left opacity-80 hover:opacity-100 transition-opacity">
          <ReCAPTCHA 
            ref={recaptchaRef} 
            theme="dark" 
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!} 
            onChange={setCaptchaValue} 
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loader || !captchaValue || !formData.service}
        className="w-full group relative flex items-center justify-between bg-slate-900 dark:bg-sky-500 text-white pl-6 pr-2 py-2 rounded-xl disabled:opacity-30 transition-all duration-300 shadow-lg hover:shadow-sky-500/20"
      >
        <span className="text-[10px] font-black uppercase tracking-widest">
          {loader ? 'Processing...' : 'Send Message'}
        </span>
        
        <div className="h-10 w-10 bg-white/10 rounded-lg flex items-center justify-center text-white backdrop-blur-md group-hover:bg-white group-hover:text-sky-600 transition-all duration-300">
          {loader ? <Loader2 size={16} className="animate-spin" /> : <ArrowUpRight size={18} />}
        </div>
      </button>
    </div>
  </form>
);