import { MovieReview, SortOption, FilterState } from "@/types/movie";
import reviewsData from "@/data/reviews.json";

export function getMovies(): MovieReview[] {
  return reviewsData as MovieReview[];
}

export function getAllGenres(): string[] {
  const genres = new Set<string>();
  reviewsData.forEach((movie) => {
    movie.genres.forEach((genre) => genres.add(genre));
  });
  return Array.from(genres).sort();
}

export function getAllClassRecommendations(): string[] {
  return [
    "Must Watch",
    "Highly Recommended",
    "Worth Your Time",
    "Casual Viewing",
    "Skip It",
    "Guilty Pleasure",
  ];
}

export function sortMovies(movies: MovieReview[], sortOption: SortOption): MovieReview[] {
  const sorted = [...movies];
  
  switch (sortOption) {
    case "rating-desc":
      return sorted.sort((a, b) => b.rating - a.rating);
    case "rating-asc":
      return sorted.sort((a, b) => a.rating - b.rating);
    case "release-desc":
      return sorted.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
    case "release-asc":
      return sorted.sort((a, b) => new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime());
    case "review-desc":
      return sorted.sort((a, b) => new Date(b.reviewDate).getTime() - new Date(a.reviewDate).getTime());
    case "review-asc":
      return sorted.sort((a, b) => new Date(a.reviewDate).getTime() - new Date(b.reviewDate).getTime());
    case "title-asc":
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case "title-desc":
      return sorted.sort((a, b) => b.title.localeCompare(a.title));
    default:
      return sorted;
  }
}

export function filterMovies(movies: MovieReview[], filters: FilterState): MovieReview[] {
  return movies.filter((movie) => {
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      const matchesSearch =
        movie.title.toLowerCase().includes(query) ||
        movie.review.toLowerCase().includes(query) ||
        movie.genres.some((g) => g.toLowerCase().includes(query));
      if (!matchesSearch) return false;
    }

    if (filters.genres.length > 0) {
      const hasGenre = filters.genres.some((g) => movie.genres.includes(g));
      if (!hasGenre) return false;
    }

    if (filters.classRecommendations.length > 0) {
      if (!filters.classRecommendations.includes(movie.classRecommendation)) {
        return false;
      }
    }

    if (movie.rating < filters.minRating || movie.rating > filters.maxRating) {
      return false;
    }

    return true;
  });
}
