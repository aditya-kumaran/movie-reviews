"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, Calendar, Users, RefreshCw, Trophy } from "lucide-react";
import { MovieReview } from "@/types/movie";
import { cn, formatYear, getRatingColor, getClassRecommendationColor } from "@/lib/utils";
import { SpoilerToggle } from "./SpoilerToggle";

interface MovieCardProps {
  movie: MovieReview;
  index: number;
}

const TMDB_POSTER_BASE = "https://image.tmdb.org/t/p/w500";

const posterMap: Record<number, string> = {
  27205: "/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
  496243: "/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
  438631: "/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
  545611: "/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg",
  414906: "/74xTEgt7R36Fvdz3YKs7XfZcXNS.jpg",
  872585: "/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
  792307: "/kCGlIMHnOm8JPXq3rXM6c5wMxcT.jpg",
  840430: "/VHSzNBTwxV8vh7wylo7O9CLdac.jpg",
  346698: "/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg",
  666277: "/k3waqVXSnvCZWfJYNtdamTgTtTA.jpg",
  466420: "/dB6Krk806zeqd0YNp2ngQ9zXteH.jpg",
  569094: "/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
};

export function MovieCard({ movie, index }: MovieCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const posterPath = movie.tmdbId ? posterMap[movie.tmdbId] : null;
  const posterUrl = posterPath ? `${TMDB_POSTER_BASE}${posterPath}` : null;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={cn(
        "group relative bg-zinc-900/50 rounded-xl overflow-hidden",
        "border border-zinc-800 hover:border-zinc-700 transition-all duration-300",
        "hover:shadow-2xl hover:shadow-black/50"
      )}
    >
      <div className="flex flex-col md:flex-row">
        <div className="relative w-full md:w-48 h-72 md:h-auto md:min-h-80 flex-shrink-0 overflow-hidden">
          {posterUrl && !imageError ? (
            <Image
              src={posterUrl}
              alt={`${movie.title} poster`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              onError={() => setImageError(true)}
              sizes="(max-width: 768px) 100vw, 192px"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center">
              <span className="text-zinc-600 text-6xl font-bold">
                {movie.title.charAt(0)}
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent md:bg-gradient-to-r" />
          
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            <div
              className={cn(
                "flex items-center gap-1 px-2 py-1 rounded-md backdrop-blur-sm",
                "bg-black/60 border border-zinc-700/50"
              )}
            >
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span className={cn("font-bold", getRatingColor(movie.rating))}>
                {movie.rating}
              </span>
            </div>
          </div>
        </div>

        <div className="flex-1 p-5 md:p-6">
          <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white group-hover:text-amber-400 transition-colors">
                {movie.title}
              </h2>
              <div className="flex items-center gap-2 mt-1 text-zinc-400 text-sm">
                <Calendar className="w-4 h-4" />
                <span>{formatYear(movie.releaseDate)}</span>
              </div>
            </div>
            <span
              className={cn(
                "px-3 py-1 rounded-full text-xs font-semibold border",
                getClassRecommendationColor(movie.classRecommendation)
              )}
            >
              {movie.classRecommendation}
            </span>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {movie.genres.map((genre) => (
              <span
                key={genre}
                className="px-2 py-1 text-xs rounded-md bg-zinc-800 text-zinc-300 border border-zinc-700"
              >
                {genre}
              </span>
            ))}
          </div>

          <p className="text-zinc-300 leading-relaxed mb-4 line-clamp-3 md:line-clamp-none">
            {movie.review}
          </p>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-amber-400 hover:text-amber-300 text-sm font-medium transition-colors mb-4"
          >
            {isExpanded ? "Show less" : "Show more details"}
          </button>

          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4 pt-4 border-t border-zinc-800"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-zinc-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-zinc-500 uppercase tracking-wide">
                      Intended Audience
                    </p>
                    <p className="text-zinc-300 text-sm">{movie.intendedAudience}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <RefreshCw className="w-5 h-5 text-zinc-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-zinc-500 uppercase tracking-wide">
                      Rewatchability
                    </p>
                    <p className="text-zinc-300 text-sm">{movie.rewatchability}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 sm:col-span-2">
                  <Trophy className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-zinc-500 uppercase tracking-wide">
                      Best Character Winner
                    </p>
                    <p className="text-amber-400 text-sm font-medium">
                      {movie.bestCharacterWinner}
                    </p>
                  </div>
                </div>
              </div>

              {movie.spoilerReview && (
                <SpoilerToggle content={movie.spoilerReview} />
              )}
            </motion.div>
          )}
        </div>
      </div>
    </motion.article>
  );
}
