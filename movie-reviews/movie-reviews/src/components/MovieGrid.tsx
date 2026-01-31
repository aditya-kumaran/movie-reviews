"use client";

import { MovieReview } from "@/types/movie";
import { MovieCard } from "./MovieCard";

interface MovieGridProps {
  movies: MovieReview[];
}

export function MovieGrid({ movies }: MovieGridProps) {
  if (movies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center mb-4">
          <span className="text-3xl">🎬</span>
        </div>
        <h3 className="text-xl font-medium text-zinc-300 mb-2">No movies found</h3>
        <p className="text-zinc-500 max-w-md">
          Try adjusting your filters or search query to find what you&apos;re looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {movies.map((movie, index) => (
        <MovieCard key={movie.id} movie={movie} index={index} />
      ))}
    </div>
  );
}
