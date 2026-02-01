"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Calendar, ArrowRight, Trophy } from "lucide-react";
import { MovieReview, ClassRecommendation } from "@/types/movie";
import { cn, formatYear, getRatingColor } from "@/lib/utils";
import { posterMap, TMDB_POSTER_BASE } from "@/lib/posters";

interface MovieCardProps {
  movie: MovieReview;
  index: number;
}

const getClassHierarchyName = (classRec: ClassRecommendation): string => {
  const classMap: Record<ClassRecommendation, string> = {
    "Masterclass": "Masterclass",
    "Must Watch": "Masterclass",
    "Council Class": "Council Class",
    "Highly Recommended": "Council Class",
    "Recommendable": "Recommendable",
    "Worth Your Time": "Recommendable",
    "Rewatchable": "Rewatchable",
    "Casual Viewing": "Rewatchable",
    "Existent": "Existent",
    "Skip It": "Existent",
    "Meme": "Meme",
    "Guilty Pleasure": "Meme"
  };
  return classMap[classRec] || "Recommendable";
};

const getCardClassStyles = (classRec: ClassRecommendation) => {
  const styles: Record<ClassRecommendation, { border: string; glow: string; badge: string; fill: string }> = {
    "Masterclass": {
      border: "border-yellow-400/60 hover:border-yellow-400",
      glow: "hover:shadow-yellow-400/30 shadow-lg",
      badge: "bg-gradient-to-r from-yellow-400 to-amber-500 text-gray-900",
      fill: "bg-gradient-to-br from-yellow-900/40 via-amber-900/30 to-slate-900/80"
    },
    "Must Watch": {
      border: "border-yellow-400/60 hover:border-yellow-400",
      glow: "hover:shadow-yellow-400/30 shadow-lg",
      badge: "bg-gradient-to-r from-yellow-400 to-amber-500 text-gray-900",
      fill: "bg-gradient-to-br from-yellow-900/40 via-amber-900/30 to-slate-900/80"
    },
    "Council Class": {
      border: "border-violet-400/60 hover:border-violet-400",
      glow: "hover:shadow-violet-400/30 shadow-lg",
      badge: "bg-gradient-to-r from-violet-500 to-purple-600 text-white",
      fill: "bg-gradient-to-br from-violet-900/40 via-purple-900/30 to-slate-900/80"
    },
    "Highly Recommended": {
      border: "border-violet-400/60 hover:border-violet-400",
      glow: "hover:shadow-violet-400/30 shadow-lg",
      badge: "bg-gradient-to-r from-violet-500 to-purple-600 text-white",
      fill: "bg-gradient-to-br from-violet-900/40 via-purple-900/30 to-slate-900/80"
    },
    "Recommendable": {
      border: "border-blue-400/60 hover:border-blue-400",
      glow: "hover:shadow-blue-400/30 shadow-lg",
      badge: "bg-gradient-to-r from-blue-500 to-cyan-500 text-white",
      fill: "bg-gradient-to-br from-blue-900/40 via-cyan-900/30 to-slate-900/80"
    },
    "Worth Your Time": {
      border: "border-blue-400/60 hover:border-blue-400",
      glow: "hover:shadow-blue-400/30 shadow-lg",
      badge: "bg-gradient-to-r from-blue-500 to-cyan-500 text-white",
      fill: "bg-gradient-to-br from-blue-900/40 via-cyan-900/30 to-slate-900/80"
    },
    "Rewatchable": {
      border: "border-green-400/60 hover:border-green-400",
      glow: "hover:shadow-green-400/30 shadow-lg",
      badge: "bg-gradient-to-r from-green-500 to-emerald-500 text-white",
      fill: "bg-gradient-to-br from-green-900/40 via-emerald-900/30 to-slate-900/80"
    },
    "Casual Viewing": {
      border: "border-green-400/60 hover:border-green-400",
      glow: "hover:shadow-green-400/30 shadow-lg",
      badge: "bg-gradient-to-r from-green-500 to-emerald-500 text-white",
      fill: "bg-gradient-to-br from-green-900/40 via-emerald-900/30 to-slate-900/80"
    },
    "Existent": {
      border: "border-gray-400/60 hover:border-gray-400",
      glow: "hover:shadow-gray-400/30 shadow-lg",
      badge: "bg-gradient-to-r from-gray-500 to-slate-600 text-white",
      fill: "bg-gradient-to-br from-gray-800/40 via-slate-800/30 to-slate-900/80"
    },
    "Skip It": {
      border: "border-gray-400/60 hover:border-gray-400",
      glow: "hover:shadow-gray-400/30 shadow-lg",
      badge: "bg-gradient-to-r from-gray-500 to-slate-600 text-white",
      fill: "bg-gradient-to-br from-gray-800/40 via-slate-800/30 to-slate-900/80"
    },
    "Meme": {
      border: "border-red-400/60 hover:border-red-400",
      glow: "hover:shadow-red-400/30 shadow-lg",
      badge: "bg-gradient-to-r from-red-500 to-rose-600 text-white",
      fill: "bg-gradient-to-br from-red-900/40 via-rose-900/30 to-slate-900/80"
    },
    "Guilty Pleasure": {
      border: "border-pink-400/60 hover:border-pink-400",
      glow: "hover:shadow-pink-400/30 shadow-lg",
      badge: "bg-gradient-to-r from-pink-500 to-rose-500 text-white",
      fill: "bg-gradient-to-br from-pink-900/40 via-rose-900/30 to-slate-900/80"
    }
  };
  return styles[classRec] || styles["Recommendable"];
};

export function MovieCard({ movie, index }: MovieCardProps) {
  const [imageError, setImageError] = useState(false);

  const posterPath = movie.tmdbId ? posterMap[movie.tmdbId] : null;
  const posterUrl = posterPath ? `${TMDB_POSTER_BASE}${posterPath}` : null;
  const classStyles = getCardClassStyles(movie.classRecommendation);

  const truncateReview = (text: string, maxLength: number = 150) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + "...";
  };

  const classHierarchyName = getClassHierarchyName(movie.classRecommendation);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={cn(
        "group relative backdrop-blur-sm rounded-xl overflow-hidden",
        "border-2 transition-all duration-300",
        "hover:shadow-2xl",
        classStyles.border,
        classStyles.glow,
        classStyles.fill
      )}
    >
      <Link href={`/movie/${movie.id}`} className="block">
        <div className="flex flex-col md:flex-row">
          <div className="relative w-full md:w-44 h-64 md:h-auto md:min-h-72 flex-shrink-0 overflow-hidden">
            {posterUrl && !imageError ? (
              <Image
                src={posterUrl}
                alt={`${movie.title} poster`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                onError={() => setImageError(true)}
                sizes="(max-width: 768px) 100vw, 176px"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                <span className="text-slate-600 text-5xl font-bold">
                  {movie.title.charAt(0)}
                </span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent md:bg-gradient-to-r" />
            
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              <div
                className={cn(
                  "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg backdrop-blur-md",
                  "bg-black/70 border border-white/10"
                )}
              >
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className={cn("font-bold text-lg", getRatingColor(movie.rating))}>
                  {movie.rating}
                </span>
              </div>
            </div>
          </div>

          <div className="flex-1 p-4 md:p-5">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <Trophy className="w-4 h-4 text-yellow-400" />
              <span
                className={cn(
                  "px-3 py-1 rounded-full text-xs font-bold shadow-lg",
                  classStyles.badge
                )}
              >
                {classHierarchyName}
              </span>
              {classHierarchyName !== movie.classRecommendation && (
                <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-white/10 text-slate-300 border border-white/20">
                  {movie.classRecommendation}
                </span>
              )}
            </div>
            
            <div className="mb-2">
              <h2 className="text-lg md:text-xl font-bold text-white group-hover:text-violet-300 transition-colors">
                {movie.title}
              </h2>
              <div className="flex items-center gap-2 mt-1 text-slate-400 text-sm">
                <Calendar className="w-4 h-4" />
                <span>{formatYear(movie.releaseDate)}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-3">
              {movie.genres.slice(0, 3).map((genre) => (
                <span
                  key={genre}
                  className="px-2 py-0.5 text-xs rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/50"
                >
                  {genre}
                </span>
              ))}
              {movie.genres.length > 3 && (
                <span className="px-2 py-0.5 text-xs rounded-md bg-slate-800/80 text-slate-400 border border-slate-700/50">
                  +{movie.genres.length - 3}
                </span>
              )}
            </div>

            <p className="text-slate-300 text-sm leading-relaxed mb-3">
              {truncateReview(movie.review)}
            </p>

            <div className="flex items-center gap-2 text-violet-400 text-sm font-medium group-hover:text-violet-300 transition-colors">
              Read full review
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
