import { motion } from "framer-motion";



export const CONTACT_METADATA = {
  email: "hello@geomining.id",
  location: "Jakarta, West Java\nIndonesia",
};


export const ContactInfo = () => (
  <motion.div 
    initial={{ opacity: 0, x: -30 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8 }}
    className="lg:w-[45%] space-y-12"
  >
    <div className="space-y-8">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-sky-100 tracking-widest text-sky-600 shadow-sm">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
        </span>
        <span className="text-[10px] font-bold uppercase">Now Accepting Projects</span>
      </div>
      <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] text-slate-900">
        Let's start <br /> 
        <span className="text-sky-400 italic font-medium">something.</span>
      </h1>
      <p className="text-xl text-slate-500 leading-relaxed max-w-md font-normal">
        Bring your ideas to life with our expert team.
      </p>
    </div>

    <div className="grid grid-cols-2 gap-8 pt-12 border-t border-slate-200">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Direct Mail</p>
        <p className="text-sm font-semibold text-blue-700 break-all">{CONTACT_METADATA.email}</p>
      </div>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Office</p>
        <p className="text-sm font-medium text-slate-600 whitespace-pre-line">{CONTACT_METADATA.location}</p>
      </div>
    </div>
  </motion.div>
);