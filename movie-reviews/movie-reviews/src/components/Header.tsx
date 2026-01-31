"use client";

import { motion } from "framer-motion";
import { Film, Clapperboard } from "lucide-react";

export function Header() {
  return (
    <header className="relative overflow-hidden bg-zinc-950 border-b border-zinc-800">
      <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-transparent to-red-500/5" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/20 via-transparent to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-4 py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Clapperboard className="w-8 h-8 md:w-10 md:h-10 text-amber-500" />
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
              <span className="text-white">Reel</span>
              <span className="text-amber-500">Reviews</span>
            </h1>
            <Film className="w-8 h-8 md:w-10 md:h-10 text-amber-500" />
          </div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto"
          >
            Curated cinema insights and honest reviews for the discerning viewer
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="mt-6 flex items-center justify-center gap-6 text-sm text-zinc-500"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Personal Reviews</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-amber-500" />
              <span>Spoiler-Free Options</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <span>Honest Ratings</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
    </header>
  );
}
