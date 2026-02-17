import { GetStaticProps } from "next";
import Link from "next/link";
import { format } from "date-fns";
import { Github, ArrowUpRight, Calendar, Star, Code2 } from "lucide-react";

import HeadMeta from "@/components/headMeta";
import Layout from "@/components/layout";

import { motion, AnimatePresence, Variants } from "framer-motion";

// --- ANIMATION VARIANTS ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1, 
    transition: { 
      duration: 0.5, 
      ease: "easeOut" 
    } 
  }
};

// --- HELPER ---
const getLanguageColor = (language: string) => {
  const colors: Record<string, string> = {
    TypeScript: "bg-blue-500",
    JavaScript: "bg-yellow-400",
    Python: "bg-green-500",
    HTML: "bg-orange-500",
    CSS: "bg-blue-400",
    Vue: "bg-emerald-500",
    React: "bg-sky-500",
    Unknown: "bg-slate-400"
  };
  return colors[language] || colors.Unknown;
};

// --- INTERFACES ---
interface Repo {
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  last_update: string;
  stars: number;
  forks: number;
}

interface ProjectsProps {
  projects: Repo[];
}

interface GitHubRawRepo {
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  updated_at: string;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
}

// --- MAIN COMPONENT ---
export default function ProjectsPage({ projects = [] }: ProjectsProps) {
  return (
    <Layout>
      <HeadMeta templateTitle="Projects" description="Open source projects and experiments." />
      
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-sky-500/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-purple-500/10 blur-[120px]" />
      </div>

      <main className="py-24 mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Header Section */}
        <header className="mb-16 space-y-4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-sky-400 text-xs font-bold tracking-widest uppercase"
          >
            <Code2 className="w-3 h-3" />
            <span>Portfolio</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold tracking-tighter text-slate-900 dark:text-white"
          >
            Building the <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-600">Future</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 dark:text-slate-400 max-w-2xl text-lg md:text-xl font-light leading-relaxed"
          >
            A curated collection of my digital experiments, open-source contributions, and technical deep-dives.
          </motion.p>
        </header>

        {/* Grid System */}
        <motion.ul 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {projects.map((repo) => (
              <motion.li key={repo.html_url} variants={itemVariants} className="group w-full">
                <Link href={repo.html_url} target="_blank" className="block w-full">
                  
                  <article className="relative w-full aspect-video flex flex-col justify-between p-6 rounded-[2.5rem] bg-white/70 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 transition-all duration-500 hover:shadow-2xl hover:shadow-sky-500/10 dark:hover:shadow-sky-900/20 hover:-translate-y-2 group-hover:border-sky-500/50 overflow-hidden">
                    
                    {/* Top Section: Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                         <div className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 group-hover:bg-sky-500 group-hover:text-white transition-all duration-300 shadow-sm">
                           <Github className="w-5 h-5" />
                         </div>
                         <h2 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-sky-500 transition-colors truncate max-w-[150px]">
                           {repo.name}
                         </h2>
                      </div>
                      <ArrowUpRight className="w-5 h-5 text-slate-300 dark:text-slate-600 group-hover:text-sky-500 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>

                    {/* Middle Section: Description */}
                    <div className="flex-grow flex flex-col justify-center py-2">
                       <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed line-clamp-2 font-medium">
                         {repo.description || "Experimental project focusing on modern web standards and performance."}
                       </p>
                    </div>

                    {/* Bottom Section: Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800/50">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-slate-600 dark:text-slate-400">
                          <span className={`w-2 h-2 rounded-full ${getLanguageColor(repo.language || "Unknown")}`} />
                          {repo.language || "Dev"}
                        </div>
                        {repo.stars > 0 && (
                          <div className="flex items-center gap-1 text-slate-400 text-xs font-bold">
                            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                            <span>{repo.stars}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
                        <Calendar className="w-3 h-3" />
                        <span>{format(new Date(repo.last_update), "MMM yy")}</span>
                      </div>
                    </div>

                  </article>
                </Link>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

      </main>
    </Layout>
  );
}

// --- DATA FETCHING ---
export const getStaticProps: GetStaticProps<ProjectsProps> = async () => {
  try {
    const res = await fetch(
      "https://api.github.com/users/kakaheryan/repos?sort=updated&direction=desc&per_page=12"
    );
    
    if (!res.ok) throw new Error('Failed to fetch data');

    const rawRepos: GitHubRawRepo[] = await res.json();

    const projects: Repo[] = rawRepos
        .filter((r) => !r.fork)
        .map((i) => ({
            name: i.name,
            html_url: i.html_url,
            description: i.description,
            language: i.language,
            last_update: i.updated_at,
            stars: i.stargazers_count,
            forks: i.forks_count,
        }));

    return {
      props: { projects }, // Sinkron dengan interface ProjectsProps
      revalidate: 3600,
    };
  } catch (error) {
    console.error("Error fetching GitHub repos:", error);
    return { props: { projects: [] } };
  }
}