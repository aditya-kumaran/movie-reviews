"use client";

import { Film, Github, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-zinc-400">
            <Film className="w-5 h-5 text-amber-500" />
            <span className="font-medium">ReelReviews</span>
          </div>
          
          <p className="text-zinc-500 text-sm flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> for cinema lovers
          </p>
          
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/aditya-kumaran"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-zinc-800 text-center text-xs text-zinc-600">
          <p>Movie data and images provided by TMDB. This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
        </div>
      </div>
    </footer>
  );
}
