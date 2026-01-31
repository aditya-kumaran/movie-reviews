"use client";

import { Trophy, Github, Heart, Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-violet-500/20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-300">
            <Trophy className="w-5 h-5 text-yellow-400" />
            <span className="font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">MasterClassers</span>
            <Sparkles className="w-4 h-4 text-cyan-400" />
          </div>
          
          <p className="text-slate-400 text-sm flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-pink-500 fill-pink-500" /> for cinema lovers
          </p>
          
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/aditya-kumaran"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-violet-400 transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-slate-800 text-center text-xs text-slate-500">
          <p>Movie data and images provided by TMDB. This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
        </div>
      </div>
    </footer>
  );
}
