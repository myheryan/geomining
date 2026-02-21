import React from "react";
import { 
  IconSlide3, 
  IconSlide2, 
  IconRS3, 
  IconRS2, 
  IconPlaxis, 
  IconMinescape, 
  IconLeapfrog, 
  IconKinematic, 
  IconGeoStats 
} from "@/components/ui/icon-svg";

// Data dummy
const workExperiences = [
  {
    id: 1,
    role: "Geotechnical Engineer",
    company: "PT Tambang Makmur",
    period: "Jan 2024 - Sekarang",
    description: "Melakukan analisis kestabilan lereng dan pemodelan 3D untuk area tambang terbuka secara berkala.",
    softwareUsed: [
      // Ukuran ikon diperbesar menjadi w-12 h-12
      { name: "Slide3", icon: <IconSlide3 className="w-12 h-12" /> },
      { name: "Slide2", icon: <IconSlide2 className="w-12 h-12" /> },
      { name: "Plaxis", icon: <IconPlaxis className="w-12 h-12" /> },
    ]
  },
  {
    id: 2,
    role: "Junior Geologist",
    company: "GeoConsulting Nusantara",
    period: "Mar 2022 - Des 2023",
    description: "Membantu dalam pemodelan geologi dan analisis data bor menggunakan perangkat lunak spesialis.",
    softwareUsed: [
      { name: "Leapfrog GEO", icon: <IconLeapfrog className="w-12 h-12" /> },
      { name: "RS2", icon: <IconRS2 className="w-12 h-12" /> },
      { name: "RS3", icon: <IconRS3 className="w-12 h-12" /> },
      { name: "Kinematic", icon: <IconKinematic className="w-12 h-12" /> },
    ]
  },
  {
    id: 3,
    role: "Mine Planner Intern",
    company: "Coal Energy Corp",
    period: "Jul 2021 - Feb 2022",
    description: "Evaluasi cadangan batubara dan penyusunan desain tambang jangka pendek.",
    softwareUsed: [
      { name: "Minescape", icon: <IconMinescape className="w-12 h-12" /> },
      { name: "GeoStats", icon: <IconGeoStats className="w-12 h-12" /> },
    ]
  }
];

export default function PengalamanBekerja() {
  return (
    <section className="py-12 bg-slate-50 dark:bg-slate-950">
      <div className="container mx-auto px-6 max-w-4xl">
        
        {/* Header Compact */}
        <div className="mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Pengalaman Bekerja
          </h2>
        </div>

        {/* List Pengalaman Padat (space-y-4) */}
        <div className="space-y-4">
          {workExperiences.map((job) => (
            <div 
              key={job.id} 
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Info Pekerjaan 1 Baris (di layar menengah ke atas) */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-2">
                <div className="flex flex-wrap items-baseline gap-2">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-none">
                    {job.role}
                  </h3>
                  <span className="hidden sm:inline-block text-slate-300 dark:text-slate-700">|</span>
                  <p className="text-sky-600 dark:text-sky-400 font-medium text-sm">
                    {job.company}
                  </p>
                </div>
                <span className="inline-block px-2.5 py-1 bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 text-xs font-semibold rounded-md whitespace-nowrap">
                  {job.period}
                </span>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed line-clamp-2 hover:line-clamp-none transition-all">
                {job.description}
              </p>

              {/* Deretan Ikon Besar & Tooltip */}
              <div className="flex flex-wrap gap-3 items-center mt-2">
                {job.softwareUsed.map((software, index) => (
                  <div 
                    key={index} 
                    className="group relative flex items-center justify-center p-2 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-lg hover:border-sky-300 dark:hover:border-sky-700 transition-colors"
                  >
                    <div className="text-slate-700 dark:text-slate-300 group-hover:scale-110 transition-transform duration-300">
                      {software.icon}
                    </div>
                    
                    {/* Tooltip Muncul Saat Hover */}
                    <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 text-[10px] font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 px-2 py-1 rounded shadow-lg border border-slate-200 dark:border-slate-700 transition-opacity whitespace-nowrap pointer-events-none z-10">
                      {software.name}
                    </span>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}