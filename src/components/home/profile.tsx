"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import HeadingGradient from "@/components/ui/mainHeading";
import { Briefcase, Calendar, MapPin } from "lucide-react"; // Optional: npm install lucide-react

const experiences = [
  {
    date: "Apr 2015 - Mar 2018",
    role: "Frontend Developer",
    company: "Hogwarts Tech",
    description: "Memimpin pengembangan antarmuka portal sihir menggunakan React dan Tailwind CSS, meningkatkan efisiensi mantra hingga 40%.",
    current: true
  },
  {
    date: "Jan 2012 - Mar 2015",
    role: "Software Engineer",
    company: "Ministry of Magic",
    description: "Membangun sistem enkripsi data tingkat tinggi untuk melindungi arsip rahasia dari serangan Dark Arts.",
    current: false
  },
  {
    date: "Jun 2010 - Des 2011",
    role: "DevOps Engineer",
    company: "Gringotts Bank",
    description: "Mengotomatisasi pipeline deployment untuk sistem keamanan vault menggunakan Docker dan Kubernetes.",
    current: false
  }
];

export default function Profile() {
  return (
    <div className="min-h-screen bg-slate-50 overflow-hidden">
      <div id="about" className="container mx-auto px-6 py-20 scroll-mt-20">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <HeadingGradient>My Professional Journey</HeadingGradient>
          <motion.h3 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="pt-4 font-medium text-slate-500 text-lg md:text-xl"
          >
            A story of growth, code, and discovery
          </motion.h3>
        </div>

        {/* Profile Card Section */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-16 mb-32">
          
          {/* Enhanced Polaroid Image */}
          <motion.div 
            initial={{ opacity: 0, rotate: -10, scale: 0.9 }}
            whileInView={{ opacity: 1, rotate: -3, scale: 1 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="relative bg-white p-4 pb-16 shadow-2xl rounded-sm border border-slate-200 transform transition-transform group-hover:rotate-0 duration-500">
              <div className="relative overflow-hidden w-64 h-72">
                <Image
                  src="/images/mane.jpg" 
                  alt="Harry Potter"
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 font-written text-slate-400 text-xl">
                Founder @ 2026
              </div>
              {/* Decorative Tape */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-20 h-8 bg-sky-500/20 backdrop-blur-sm -rotate-2" />
            </div>
          </motion.div>

          {/* Bio Content with Glass Effect */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex-1 max-w-2xl"
          >
            <div className="relative p-8 rounded-3xl bg-white/40 backdrop-blur-xl border border-white shadow-xl">
              <h3 className="text-4xl font-extrabold text-slate-900 mb-4 flex items-center gap-3">
                Harry Potter <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              </h3>
              <p className="text-slate-600 text-lg leading-relaxed">
                Merupakan pendiri perusahaan dengan pengalaman luas di industri pertambangan, berfokus pada pengelolaan operasional yang efisien, aman, dan sesuai regulasi. 
                <br /><br />
                Dengan latar belakang teknis yang kuat, beliau berkomitmen menerapkan praktik pertambangan yang bertanggung jawab, berkelanjutan, dan memberikan nilai tambah bagi masyarakat sekitar.
              </p>
              
              <div className="mt-8 flex flex-wrap gap-4 text-sm font-medium text-slate-500">
                <span className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm">
                  <MapPin size={16} className="text-sky-500" /> Jakarta, ID
                </span>
                <span className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm">
                  <Briefcase size={16} className="text-sky-500" /> Mining Tech
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Work Experience Timeline */}
        <div id="work" className="max-w-4xl mx-auto relative px-4">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-sky-500 via-indigo-500 to-transparent opacity-30 md:-translate-x-1/2" />

          <div className="space-y-16">
            {experiences.map((exp, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full border-4 border-white shadow-md z-10 md:-translate-x-1/2 transition-colors duration-500 bg-sky-600" />

                {/* Date Side */}
                <div className="md:w-1/2 flex items-center md:justify-center pl-10 md:pl-0">
                   <div className="flex items-center gap-2 text-sky-600 font-bold bg-sky-50 px-4 py-1 rounded-full">
                     <Calendar size={14} />
                     {exp.date}
                   </div>
                </div>

                {/* Content Side */}
                <div className="md:w-1/2 pl-10 md:pl-0">
                  <div className={`p-6 rounded-2xl bg-white border border-slate-100 shadow-lg hover:shadow-2xl transition-all duration-300 group ${
                    index % 2 === 0 ? "md:text-right" : "md:text-left"
                  }`}>
                    <h4 className="text-xl font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                      {exp.role}
                    </h4>
                    <p className="text-sky-500 font-semibold mb-3 tracking-wide uppercase text-xs">
                      {exp.company}
                    </p>
                    <p className="text-slate-500 leading-relaxed text-sm">
                      {exp.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}