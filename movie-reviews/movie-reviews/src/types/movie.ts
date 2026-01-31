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
  | "Masterclass"
  | "Council Class"
  | "Recommendable"
  | "Rewatchable"
  | "Existent"
  | "Meme"
  | "Must Watch"
  | "Highly Recommended"
  | "Worth Your Time"
  | "Casual Viewing"
  | "Skip It"
  | "Guilty Pleasure";

export const CLASS_RECOMMENDATIONS: { value: ClassRecommendation; label: string; range: string }[] = [
  { value: "Masterclass", label: "Masterclass", range: "9.5-10" },
  { value: "Council Class", label: "Council Class", range: "8.7-9.6" },
  { value: "Recommendable", label: "Recommendable", range: "7.7-8.7" },
  { value: "Rewatchable", label: "Rewatchable", range: "6.8-7.8" },
  { value: "Existent", label: "Existent", range: "6.0-6.8" },
  { value: "Meme", label: "Meme", range: "0-6.0" },
];

export const GENRES = [
  "Action",
  "Comedy",
  "Coming-of-age",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "Hollywood",
  "Horror",
  "Romance",
  "Sci-Fi",
  "Superhero",
  "Thriller",
] as const;

export type Genre = typeof GENRES[number];

export interface TMDBMovie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string | null;
  overview: string;
}

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
