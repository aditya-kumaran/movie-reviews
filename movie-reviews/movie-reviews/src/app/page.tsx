"use client";

import { useState, useMemo } from "react";
import { Header, Footer, FilterBar, MovieGrid } from "@/components";
import { getMovies, getAllGenres, getAllClassRecommendations, sortMovies, filterMovies } from "@/lib/movies";
import { FilterState, SortOption } from "@/types/movie";

export default function Home() {
  const allMovies = getMovies();
  const genres = getAllGenres();
  const classRecommendations = getAllClassRecommendations();

  const [filters, setFilters] = useState<FilterState>({
    genres: [],
    classRecommendations: [],
    minRating: 0,
    maxRating: 10,
    searchQuery: "",
  });

  const [sortOption, setSortOption] = useState<SortOption>("rating-desc");

  const filteredAndSortedMovies = useMemo(() => {
    const filtered = filterMovies(allMovies, filters);
    return sortMovies(filtered, sortOption);
  }, [allMovies, filters, sortOption]);

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col">
      <Header />
      
      <FilterBar
        filters={filters}
        sortOption={sortOption}
        genres={genres}
        classRecommendations={classRecommendations}
        onFilterChange={setFilters}
        onSortChange={setSortOption}
        resultCount={filteredAndSortedMovies.length}
      />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <MovieGrid movies={filteredAndSortedMovies} />
      </main>

      <Footer />
    </div>
  );
}
