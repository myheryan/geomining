'use client';

import ReCAPTCHA from "react-google-recaptcha";
import { ArrowUpRight, Fingerprint, Layers, Orbit, Sparkles, Asterisk, Loader2 } from "lucide-react";
import EditorialInput from "@/components/ui/editorialInput";

export const CATEGORIES = [
  { id: '1', label: 'Career', icon: Fingerprint },
  { id: '2', label: 'Partnership', icon: Layers },
  { id: '3', label: 'Development', icon: Orbit },
  { id: '4', label: 'AI Integration', icon: Sparkles },
  { id: '5', label: 'Other', icon: Asterisk },
];

interface FormFieldsProps {
  formData: any;
  setFormData: (data: any) => void;
  loader: boolean;
  handleSubmit: (e: React.FormEvent) => void;
  captchaValue: string | null;
  setCaptchaValue: (val: string | null) => void;
  recaptchaRef: any;
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
  <form onSubmit={handleSubmit} className="relative space-y-16">
    {/* Category Picker Section */}
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-sky-500">Project Category</p>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setFormData({ ...formData, service: cat.label })}
            className={`group relative flex items-center gap-3 px-7 py-4 rounded-2xl border transition-all duration-500 text-[10px] font-black uppercase tracking-widest overflow-hidden ${
              formData.service === cat.label
                ? 'bg-sky-500 text-white border-sky-400 shadow-[0_0_20px_rgba(14,165,233,0.3)]'
                : 'bg-white/50 dark:bg-slate-900/50 border-slate-100 dark:border-slate-800 text-slate-400 hover:border-sky-500/50 hover:text-sky-500'
            }`}
          >
            {/* Background Glow Effect for Active State */}
            {formData.service === cat.label && (
              <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-blue-600 animate-pulse" />
            )}
            
            <div className="relative z-10 flex items-center gap-3">
              <cat.icon size={16} className={`transition-transform duration-500 group-hover:rotate-12 ${formData.service === cat.label ? 'text-white' : 'text-sky-500/50'}`} />
              {cat.label}
            </div>
          </button>
        ))}
      </div>
    </div>

    {/* Inputs Section */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div className="group transition-all">
        <EditorialInput 
          label="Your Identity" 
          placeholder="What's your name?" 
          value={formData.name} 
          onChange={(v) => setFormData({...formData, name: v})} 
        />
      </div>
      <div className="group transition-all">
        <EditorialInput 
          label="Communication" 
          placeholder="Your work email" 
          type="email" 
          value={formData.email} 
          onChange={(v) => setFormData({...formData, email: v})} 
        />
      </div>
    </div>

    <div className="relative">
      <EditorialInput 
        label="The Mission" 
        placeholder="Tell us about your project or vision..." 
        value={formData.message} 
        onChange={(v) => setFormData({...formData, message: v})} 
        isTextArea 
      />
    </div>

    {/* Footer Section: Captcha & Submit */}
    <div className="flex flex-col md:flex-row items-center justify-between gap-12 pt-10 border-t border-slate-100 dark:border-slate-800/50">
      <div className="relative group">
         {/* Glassmorphism Frame for Captcha */}
        <div className="absolute -inset-2 bg-gradient-to-r from-sky-500/10 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="relative scale-90 md:scale-100 origin-left grayscale-[0.8] hover:grayscale-0 transition-all duration-700 opacity-70 hover:opacity-100 rounded-lg overflow-hidden border border-transparent hover:border-slate-200 dark:hover:border-slate-800">
          <ReCAPTCHA 
            ref={recaptchaRef} 
            theme="dark" // Sesuaikan dengan UI kamu
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!} 
            onChange={setCaptchaValue} 
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loader || !captchaValue || !formData.service}
        className="group relative flex items-center gap-6 bg-slate-900 dark:bg-sky-500 text-white pl-10 pr-4 py-4 rounded-2xl disabled:opacity-20 disabled:grayscale transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] shadow-xl hover:shadow-sky-500/25"
      >
        <span className="relative z-10 text-xs font-black uppercase tracking-[0.2em]">
          {loader ? 'Encoding Data...' : 'Dispatch Message'}
        </span>
        
        <div className="h-12 w-12 bg-white/20 rounded-xl flex items-center justify-center text-white backdrop-blur-md group-hover:bg-white group-hover:text-sky-600 transition-all duration-500">
          {loader ? <Loader2 size={20} className="animate-spin" /> : <ArrowUpRight size={22} />}
        </div>
      </button>
    </div>

    {/* Decorative Circuit Node */}
    <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-sky-500/5 blur-[80px] rounded-full pointer-events-none" />
  </form>
);