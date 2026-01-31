"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Trophy, Sparkles, Plus, Home } from "lucide-react";

export function Header() {
  return (
    <header className="relative overflow-hidden bg-slate-900/80 backdrop-blur-sm border-b border-violet-500/20">
      <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 via-fuchsia-500/5 to-cyan-500/10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-600/20 via-transparent to-transparent" />
      
      <nav className="relative max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-slate-300 hover:text-violet-400 transition-colors">
          <Home className="w-5 h-5" />
          <span className="hidden sm:inline">All Reviews</span>
        </Link>
        <Link
          href="/add-review"
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-400 hover:to-fuchsia-400 text-white font-semibold rounded-lg transition-all shadow-lg shadow-violet-500/25"
        >
          <Plus className="w-5 h-5" />
          <span className="hidden sm:inline">Add Review</span>
        </Link>
      </nav>

      <div className="relative max-w-7xl mx-auto px-4 py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Link href="/" className="inline-flex items-center justify-center gap-3 mb-4">
            <Trophy className="w-8 h-8 md:w-10 md:h-10 text-yellow-400" />
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">Master</span>
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">Classers</span>
            </h1>
            <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-cyan-400" />
          </Link>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto"
          >
            Celebrating cinema excellence with curated reviews and class rankings
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm"
          >
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400">
              <div className="w-2 h-2 rounded-full bg-yellow-400" />
              <span>Masterclass</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/20 text-violet-400">
              <div className="w-2 h-2 rounded-full bg-violet-400" />
              <span>Council Class</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-400">
              <div className="w-2 h-2 rounded-full bg-blue-400" />
              <span>Recommendable</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/20 text-green-400">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span>Rewatchable</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-500/20 text-gray-400">
              <div className="w-2 h-2 rounded-full bg-gray-400" />
              <span>Existent</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 text-red-400">
              <div className="w-2 h-2 rounded-full bg-red-400" />
              <span>Meme</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
    </header>
  );
}
