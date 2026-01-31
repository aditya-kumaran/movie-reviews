export interface MovieReview {
  id: string;
  title: string;
  releaseDate: string;
  genres: string[];
  rating: number;
  classRecommendation: ClassRecommendation;
  intendedAudience: string;
  rewatchability: string;
  bestCharacterWinner: string;
  review: string;
  spoilerReview?: string;
  reviewDate: string;
  tmdbId?: number;
  posterPath?: string;
}

export type ClassRecommendation =
  | "Must Watch"
  | "Highly Recommended"
  | "Worth Your Time"
  | "Casual Viewing"
  | "Skip It"
  | "Guilty Pleasure";

export type SortOption =
  | "rating-desc"
  | "rating-asc"
  | "release-desc"
  | "release-asc"
  | "review-desc"
  | "review-asc"
  | "title-asc"
  | "title-desc";

export interface FilterState {
  genres: string[];
  classRecommendations: ClassRecommendation[];
  minRating: number;
  maxRating: number;
  searchQuery: string;
}
