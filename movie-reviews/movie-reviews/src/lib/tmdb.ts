const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";

export function getPosterUrl(posterPath: string | undefined, size: "w342" | "w500" | "w780" | "original" = "w500"): string {
  if (!posterPath) {
    return "/placeholder-poster.jpg";
  }
  return `${TMDB_IMAGE_BASE}/${size}${posterPath}`;
}

export function getBackdropUrl(backdropPath: string | undefined, size: "w780" | "w1280" | "original" = "w1280"): string {
  if (!backdropPath) {
    return "";
  }
  return `${TMDB_IMAGE_BASE}/${size}${backdropPath}`;
}
