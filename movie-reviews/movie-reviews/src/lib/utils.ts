import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatYear(dateString: string): string {
  return new Date(dateString).getFullYear().toString();
}

export function getRatingColor(rating: number): string {
  if (rating >= 9) return "text-emerald-400";
  if (rating >= 8) return "text-green-400";
  if (rating >= 7) return "text-yellow-400";
  if (rating >= 6) return "text-orange-400";
  return "text-red-400";
}

export function getClassRecommendationColor(recommendation: string): string {
  switch (recommendation) {
    case "Masterclass":
      return "bg-amber-500/20 text-amber-300 border-amber-500/30";
    case "Council Class":
      return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
    case "Recommendable":
      return "bg-green-500/20 text-green-300 border-green-500/30";
    case "Rewatchable":
      return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
    case "Existent":
      return "bg-orange-500/20 text-orange-300 border-orange-500/30";
    case "Meme":
      return "bg-red-500/20 text-red-300 border-red-500/30";
    case "Must Watch":
      return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
    case "Highly Recommended":
      return "bg-green-500/20 text-green-300 border-green-500/30";
    case "Worth Your Time":
      return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
    case "Casual Viewing":
      return "bg-orange-500/20 text-orange-300 border-orange-500/30";
    case "Skip It":
      return "bg-red-500/20 text-red-300 border-red-500/30";
    case "Guilty Pleasure":
      return "bg-purple-500/20 text-purple-300 border-purple-500/30";
    default:
      return "bg-zinc-500/20 text-zinc-300 border-zinc-500/30";
  }
}
