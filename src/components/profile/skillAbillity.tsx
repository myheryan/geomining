'use client';

import * as React from 'react';
import { motion } from "framer-motion";
import {
  Code2, Palette, Braces, Server, 
  Atom, FileCode, Box, Database
} from "lucide-react";
import { clsx } from "clsx";

const skills = [
  { text: "HTML5", icon: Code2, rating: 100, color: "text-orange-500", glow: "shadow-orange-500/30" },
  { text: "CSS3", icon: Palette, rating: 92, color: "text-blue-500", glow: "shadow-blue-500/30" },
  { text: "JS", icon: Braces, rating: 80, color: "text-yellow-500", glow: "shadow-yellow-500/30" },
  { text: "Node", icon: Server, rating: 60, color: "text-green-500", glow: "shadow-green-500/30" },
  { text: "React", icon: Atom, rating: 75, color: "text-sky-400", glow: "shadow-sky-400/30" },
  { text: "TS", icon: FileCode, rating: 85, color: "text-blue-400", glow: "shadow-blue-400/30" },
  { text: "PHP", icon: Database, rating: 90, color: "text-purple-500", glow: "shadow-purple-500/30" },
  { text: "Lara", icon: Box, rating: 75, color: "text-red-500", glow: "shadow-red-500/30" },
];

export default function SkillBase() {
  return (
    <div className="space-y-4">
      {/* Header Label: Glass Journal Style */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
          <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-slate-500 dark:text-slate-400">
            Technical_Index.01
          </span>
        </div>
        <span className="text-[8px] font-mono opacity-40">AUTO_SYNC_ENABLED</span>
      </div>

      <ul className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {skills.map((skill, index) => {
          const Icon = skill.icon;
          
          return (
            <motion.li 
              key={index} 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              className={clsx(
                "relative p-[2px] rounded-lg border transition-all duration-500",
                // Light Mode: Creamy Glass
                "bg-white/40 backdrop-blur-md border-white/80 shadow-[4px_4px_10px_rgba(0,0,0,0.02)]",
                // Dark Mode: Deep Midnight Glass
                "dark:bg-slate-900/30 dark:backdrop-blur-xl dark:border-white/10 dark:shadow-none",
                "hover:scale-[1.02] active:scale-95 cursor-default group"
              )}
            >
              {/* Content Wrapper */}
              <div className="px-1.5 py-1 flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <Icon className={clsx("w-3 h-3 transition-all duration-500 group-hover:rotate-[360deg]", skill.color)} />
                    <span className="font-bold text-[9px] uppercase tracking-tight text-slate-800 dark:text-slate-200">
                      {skill.text}
                    </span>
                  </div>
                  <span className="text-[8px] font-mono font-black opacity-30 group-hover:opacity-100 transition-opacity">
                    {skill.rating}
                  </span>
                </div>

                {/* Glass Progress Bar (The "Empty" Bar Fix) */}
                <div className="relative h-[3px] w-full bg-slate-200/50 dark:bg-white/5 rounded-full overflow-hidden shadow-inner">
                  {/* Subtle Pattern on the empty bar to make it look "filled with glass" */}
                  <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                  
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.rating}%` }}
                    transition={{ duration: 1.5, ease: "circOut" }}
                    className={clsx(
                      "h-full relative rounded-full shadow-[0_0_10px_rgba(0,0,0,0.1)]",
                      skill.color.replace('text-', 'bg-'),
                      "after:absolute after:inset-0 after:bg-gradient-to-r after:from-white/20 after:to-transparent"
                    )}
                  />
                </div>
              </div>

              {/* Decorative Corner (Glass Reflection Effect) */}
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent pointer-events-none rounded-lg" />
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}