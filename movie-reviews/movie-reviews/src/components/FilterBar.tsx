"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { FilterState, SortOption, ClassRecommendation } from "@/types/movie";
import { cn } from "@/lib/utils";

interface FilterBarProps {
  filters: FilterState;
  sortOption: SortOption;
  genres: string[];
  classRecommendations: string[];
  onFilterChange: (filters: FilterState) => void;
  onSortChange: (sort: SortOption) => void;
  resultCount: number;
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "rating-desc", label: "Highest Rated" },
  { value: "rating-asc", label: "Lowest Rated" },
  { value: "release-desc", label: "Newest Release" },
  { value: "release-asc", label: "Oldest Release" },
  { value: "review-desc", label: "Recently Reviewed" },
  { value: "review-asc", label: "Oldest Review" },
  { value: "title-asc", label: "Title A-Z" },
  { value: "title-desc", label: "Title Z-A" },
];

export function FilterBar({
  filters,
  sortOption,
  genres,
  classRecommendations,
  onFilterChange,
  onSortChange,
  resultCount,
}: FilterBarProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const activeFilterCount =
    filters.genres.length +
    filters.classRecommendations.length +
    (filters.minRating > 0 ? 1 : 0) +
    (filters.maxRating < 10 ? 1 : 0);

  const toggleGenre = (genre: string) => {
    const newGenres = filters.genres.includes(genre)
      ? filters.genres.filter((g) => g !== genre)
      : [...filters.genres, genre];
    onFilterChange({ ...filters, genres: newGenres });
  };

  const toggleClassRecommendation = (rec: string) => {
    const newRecs = filters.classRecommendations.includes(rec as ClassRecommendation)
      ? filters.classRecommendations.filter((r) => r !== rec)
      : [...filters.classRecommendations, rec as ClassRecommendation];
    onFilterChange({ ...filters, classRecommendations: newRecs });
  };

  const clearFilters = () => {
    onFilterChange({
      genres: [],
      classRecommendations: [],
      minRating: 0,
      maxRating: 10,
      searchQuery: "",
    });
  };

  return (
    <div className="sticky top-0 z-40 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
            <input
              type="text"
              placeholder="Search movies, genres, or reviews..."
              value={filters.searchQuery}
              onChange={(e) =>
                onFilterChange({ ...filters, searchQuery: e.target.value })
              }
              className={cn(
                "w-full pl-10 pr-4 py-2.5 rounded-lg",
                "bg-zinc-900 border border-zinc-800",
                "text-white placeholder-zinc-500",
                "focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50",
                "transition-all duration-200"
              )}
            />
          </div>

          <div className="flex gap-3">
            <div className="relative">
              <select
                value={sortOption}
                onChange={(e) => onSortChange(e.target.value as SortOption)}
                className={cn(
                  "appearance-none pl-4 pr-10 py-2.5 rounded-lg",
                  "bg-zinc-900 border border-zinc-800",
                  "text-white cursor-pointer",
                  "focus:outline-none focus:border-amber-500/50",
                  "transition-all duration-200"
                )}
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
            </div>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-lg",
                "border transition-all duration-200",
                isExpanded || activeFilterCount > 0
                  ? "bg-amber-500/10 border-amber-500/30 text-amber-400"
                  : "bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700"
              )}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="hidden sm:inline">Filters</span>
              {activeFilterCount > 0 && (
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-amber-500 text-black text-xs font-bold">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="pt-4 space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-zinc-400 mb-2">Genres</h3>
                  <div className="flex flex-wrap gap-2">
                    {genres.map((genre) => (
                      <button
                        key={genre}
                        onClick={() => toggleGenre(genre)}
                        className={cn(
                          "px-3 py-1.5 rounded-full text-sm transition-all duration-200",
                          filters.genres.includes(genre)
                            ? "bg-amber-500 text-black font-medium"
                            : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                        )}
                      >
                        {genre}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-zinc-400 mb-2">
                    Class Recommendation
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {classRecommendations.map((rec) => (
                      <button
                        key={rec}
                        onClick={() => toggleClassRecommendation(rec)}
                        className={cn(
                          "px-3 py-1.5 rounded-full text-sm transition-all duration-200",
                          filters.classRecommendations.includes(rec as ClassRecommendation)
                            ? "bg-amber-500 text-black font-medium"
                            : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                        )}
                      >
                        {rec}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-zinc-400 mb-2">
                    Rating Range: {filters.minRating} - {filters.maxRating}
                  </h3>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="0"
                      max="10"
                      step="0.5"
                      value={filters.minRating}
                      onChange={(e) =>
                        onFilterChange({
                          ...filters,
                          minRating: parseFloat(e.target.value),
                        })
                      }
                      className="flex-1 accent-amber-500"
                    />
                    <input
                      type="range"
                      min="0"
                      max="10"
                      step="0.5"
                      value={filters.maxRating}
                      onChange={(e) =>
                        onFilterChange({
                          ...filters,
                          maxRating: parseFloat(e.target.value),
                        })
                      }
                      className="flex-1 accent-amber-500"
                    />
                  </div>
                </div>

                {activeFilterCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-2 text-sm text-red-400 hover:text-red-300 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    Clear all filters
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-3 text-sm text-zinc-500">
          Showing {resultCount} {resultCount === 1 ? "movie" : "movies"}
        </div>
      </div>
    </div>
  );
}
