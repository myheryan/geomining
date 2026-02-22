import Layout from "@/components/layout";
import HeadMeta from "@/components/headMeta";
import Hero from "@/components/home/hero";
import AboutUs from "@/components/home/aboutUs";
import MentorExpertise from "@/components/home/mentorExpertise";
import ContactSection from "@/components/contact";
import LatestInsights  from "@/components/home/latestInsights";

export default function HomePage() {
  return (
    <Layout>
        <HeadMeta />
        {/* KUNCI PERBAIKAN: overflow-hidden diganti menjadi overflow-x-clip */}
        <main className="relative bg-white dark:bg-[#020617] transition-colors duration-500 container-fluid overflow-x-clip">
            
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
              <div className="absolute top-0 left-1 w-[800px] h-[320px] bg-gray-300 dark:bg-sky-500/20 blur-[120px] opacity-0 dark:opacity-100" />
              
              {/* 2. Sub-Grid Titik-titik Presisi (Adaptif Light/Dark) */}
              <div className="absolute inset-0 text-[#dfe9fc]/50 dark:text-sky-500/20 transition-colors duration-500" 
                style={{ 
                  backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', 
                  backgroundSize: '20px 20px' 
                }} 
              />
            </div>
            
            <Hero />
            <AboutUs />
            <MentorExpertise />
            <LatestInsights />
            <ContactSection />

        </main>
    </Layout>
  );
}
