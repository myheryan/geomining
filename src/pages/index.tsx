import { GetStaticProps } from 'next';
import Layout from "@/components/layout";
import HeadMeta from "@/components/headMeta";
import Hero from "@/components/home/Hero";
import FeaturedCarousel from "@/components/home/compactCarousel";
import { getAllFilesFrontmatter } from "@/lib/mdx-clients";

// 1. Definisikan tipe data yang selaras untuk Client & Server
interface Article {
  slug: string;
  title: string;
  description: string;
  category: string;
  publishedAt: string | null; // Gunakan null untuk Serialization safety
  readingTime: {
    text: string;
    minutes: number;
    time: number;
    words: number;
  } | string;
}

interface HomeProps {
  featuredPosts: Article[];
}

export default function HomePage({ featuredPosts }: HomeProps) {
  return (
    <Layout>
      <HeadMeta />
      
      {/* Container Utama dengan CSS Snap Scroll */}
      <main className="h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth bg-white dark:bg-[#030303] text-slate-900 dark:text-white transition-colors duration-500 scrollbar-hide">
        
        {/* --- SECTION 1: HERO (Full Screen Snap) --- */}
        <section className="relative h-screen w-full snap-start flex flex-col items-center justify-center overflow-hidden">
          {/* Antimetal Grid Effect */}
          <div 
            className="absolute inset-0 opacity-[0.05] dark:opacity-[0.1] pointer-events-none -z-10" 
            style={{ 
              backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
              backgroundSize: '45px 45px',
              maskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, #000 70%, transparent 100%)'
            }} 
          />
          
          <div className="w-full">
            <Hero />
          </div>
        </section>

        {/* --- SECTION 2: INSIGHTS (Target Snap) --- */}
        <section id="insights" className="relative h-screen w-full snap-start flex flex-col justify-center bg-slate-50 dark:bg-[#050505] px-6 transition-colors duration-500">
          <div className="max-w-6xl mx-auto w-full">
            
            <div className="mb-12 space-y-3">
              <div className="flex items-center gap-2 text-sky-600 dark:text-sky-500 text-[10px] font-mono tracking-[0.4em] uppercase font-black">
                <span>Latest_Artifacts</span>
              </div>
              <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-tight">
                Featured <span className="italic font-serif text-slate-400 dark:text-slate-600">Insights.</span>
              </h2>
            </div>

            {/* PERBAIKAN: Nama prop harus 'articles' (jamak) sesuai interface CompactCarousel */}
            <FeaturedCarousel articles={featuredPosts} />
          </div>
        </section>

      </main>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  try {
    const allPosts = await getAllFilesFrontmatter('insight');
    
    // Mapping data agar aman saat dikirim ke JSON browser
    const featuredPosts: Article[] = (allPosts || [])
      .slice(0, 5)
      .map((post) => ({
        slug: post.slug || '',
        title: post.title || 'Untitled Post',
        description: post.description || '',
        category: post.category || 'Insight',
        // Next.js Serialization Fix: Kembalikan null jika undefined
        publishedAt: post.publishedAt ? String(post.publishedAt) : null,
        readingTime: post.readingTime || '3 min read',
      }));

    return {
      props: {
        featuredPosts,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return { 
      props: { 
        featuredPosts: [] 
      } 
    };
  }
};