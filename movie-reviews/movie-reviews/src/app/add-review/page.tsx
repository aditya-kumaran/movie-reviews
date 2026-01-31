"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Film, ArrowLeft, Plus, X, Copy, Check } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TMDBMovie, CLASS_RECOMMENDATIONS, GENRES, ClassRecommendation } from "@/types/movie";
import { cn } from "@/lib/utils";

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY || "";
const TMDB_POSTER_BASE = "https://image.tmdb.org/t/p/w500";

interface ReviewFormData {
  title: string;
  releaseDate: string;
  genres: string[];
  rating: number;
  classRecommendation: ClassRecommendation | "";
  intendedAudience: string;
  rewatchability: string;
  bestCharacterWinner: string;
  review: string;
  spoilerReview: string;
  tmdbId: number | null;
  posterPath: string | null;
}

const initialFormData: ReviewFormData = {
  title: "",
  releaseDate: "",
  genres: [],
  rating: 7.0,
  classRecommendation: "",
  intendedAudience: "",
  rewatchability: "",
  bestCharacterWinner: "",
  review: "",
  spoilerReview: "",
  tmdbId: null,
  posterPath: null,
};

export default function AddReviewPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<TMDBMovie[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [formData, setFormData] = useState<ReviewFormData>(initialFormData);
  const [copied, setCopied] = useState(false);
  const [generatedJson, setGeneratedJson] = useState<string | null>(null);

  const searchMovies = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&include_adult=false`
      );
      const data = await response.json();
      setSearchResults(data.results || []);
      setShowResults(true);
    } catch (error) {
      console.error("Error searching movies:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchQuery) {
        searchMovies(searchQuery);
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery, searchMovies]);

  const selectMovie = (movie: TMDBMovie) => {
    setFormData({
      ...formData,
      title: movie.title,
      releaseDate: movie.release_date || "",
      tmdbId: movie.id,
      posterPath: movie.poster_path,
    });
    setSearchQuery("");
    setShowResults(false);
    setSearchResults([]);
  };

  const toggleGenre = (genre: string) => {
    setFormData((prev) => ({
      ...prev,
      genres: prev.genres.includes(genre)
        ? prev.genres.filter((g) => g !== genre)
        : [...prev.genres, genre],
    }));
  };

  const generateId = (title: string, year: string) => {
    const yearPart = year ? year.split("-")[0] : new Date().getFullYear().toString();
    return `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}-${yearPart}`;
  };

  const generateReviewJson = () => {
    const review = {
      id: generateId(formData.title, formData.releaseDate),
      title: formData.title,
      releaseDate: formData.releaseDate || new Date().toISOString().split("T")[0],
      genres: formData.genres,
      rating: formData.rating,
      classRecommendation: formData.classRecommendation,
      intendedAudience: formData.intendedAudience,
      rewatchability: formData.rewatchability,
      bestCharacterWinner: formData.bestCharacterWinner,
      review: formData.review,
      ...(formData.spoilerReview && { spoilerReview: formData.spoilerReview }),
      reviewDate: new Date().toISOString().split("T")[0],
      tmdbId: formData.tmdbId,
      posterPath: formData.posterPath,
    };
    setGeneratedJson(JSON.stringify(review, null, 2));
  };

  const copyToClipboard = async () => {
    if (generatedJson) {
      await navigator.clipboard.writeText(generatedJson);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setGeneratedJson(null);
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-violet-400 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Reviews
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900/70 backdrop-blur-sm rounded-xl border border-violet-500/20 p-6 md:p-8"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-3">
            <Plus className="w-8 h-8 text-violet-400" />
            Add New Review
          </h1>

          <div className="space-y-6">
            <div className="relative">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Search Movie
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => searchResults.length > 0 && setShowResults(true)}
                  placeholder="Search for a movie..."
                  className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors"
                />
                {isSearching && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <div className="w-5 h-5 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
              </div>

              {showResults && searchResults.length > 0 && (
                <div className="absolute z-50 w-full mt-2 bg-slate-800 border border-slate-700 rounded-lg shadow-xl max-h-96 overflow-y-auto">
                  {searchResults.map((movie) => (
                    <button
                      key={movie.id}
                      onClick={() => selectMovie(movie)}
                      className="w-full flex items-center gap-3 p-3 hover:bg-slate-700 transition-colors text-left"
                    >
                      {movie.poster_path ? (
                        <Image
                          src={`${TMDB_POSTER_BASE}${movie.poster_path}`}
                          alt={movie.title}
                          width={40}
                          height={60}
                          className="rounded object-cover"
                        />
                      ) : (
                        <div className="w-10 h-15 bg-slate-700 rounded flex items-center justify-center">
                          <Film className="w-5 h-5 text-slate-500" />
                        </div>
                      )}
                      <div>
                        <p className="text-white font-medium">{movie.title}</p>
                        <p className="text-slate-400 text-sm">
                          {movie.release_date?.split("-")[0] || "Unknown year"}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {formData.title && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-start gap-4 p-4 bg-slate-800/50 rounded-lg border border-violet-500/30"
              >
                {formData.posterPath ? (
                  <Image
                    src={`${TMDB_POSTER_BASE}${formData.posterPath}`}
                    alt={formData.title}
                    width={80}
                    height={120}
                    className="rounded-lg object-cover"
                  />
                ) : (
                  <div className="w-20 h-30 bg-slate-700 rounded-lg flex items-center justify-center">
                    <Film className="w-8 h-8 text-slate-500" />
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white">{formData.title}</h3>
                  <p className="text-slate-400">
                    {formData.releaseDate?.split("-")[0] || "Unknown year"}
                  </p>
                  {formData.tmdbId && (
                    <p className="text-slate-500 text-sm mt-1">TMDB ID: {formData.tmdbId}</p>
                  )}
                </div>
                <button
                  onClick={() => setFormData({ ...formData, title: "", releaseDate: "", tmdbId: null, posterPath: null })}
                  className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </motion.div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Genres (select multiple)
                </label>
                <div className="flex flex-wrap gap-2">
                  {GENRES.map((genre) => (
                    <button
                      key={genre}
                      onClick={() => toggleGenre(genre)}
                      className={cn(
                        "px-3 py-1.5 rounded-full text-sm font-medium transition-all",
                        formData.genres.includes(genre)
                          ? "bg-violet-500 text-white"
                          : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                      )}
                    >
                      {genre}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Class Recommendation
                </label>
                <select
                  value={formData.classRecommendation}
                  onChange={(e) =>
                    setFormData({ ...formData, classRecommendation: e.target.value as ClassRecommendation })
                  }
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-violet-500 transition-colors"
                >
                  <option value="">Select class...</option>
                  {CLASS_RECOMMENDATIONS.map((rec) => (
                    <option key={rec.value} value={rec.value}>
                      {rec.label} ({rec.range})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Rating (0-10)
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="0"
                    max="10"
                    step="0.1"
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
                    className="flex-1"
                  />
                  <span className="text-2xl font-bold text-violet-400 w-12 text-center">
                    {formData.rating.toFixed(1)}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Intended Audience
                </label>
                <input
                  type="text"
                  value={formData.intendedAudience}
                  onChange={(e) => setFormData({ ...formData, intendedAudience: e.target.value })}
                  placeholder="e.g., Teens, Adults, Everyone"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Rewatchability
                </label>
                <input
                  type="text"
                  value={formData.rewatchability}
                  onChange={(e) => setFormData({ ...formData, rewatchability: e.target.value })}
                  placeholder="e.g., High, Medium, Low or description"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Best Character Winner
                </label>
                <input
                  type="text"
                  value={formData.bestCharacterWinner}
                  onChange={(e) => setFormData({ ...formData, bestCharacterWinner: e.target.value })}
                  placeholder="e.g., Character name"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Review
              </label>
              <textarea
                value={formData.review}
                onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                placeholder="Write your review here..."
                rows={5}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Spoiler Review (optional)
              </label>
              <textarea
                value={formData.spoilerReview}
                onChange={(e) => setFormData({ ...formData, spoilerReview: e.target.value })}
                placeholder="Write spoiler content here..."
                rows={4}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors resize-none"
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={generateReviewJson}
                disabled={!formData.title || !formData.classRecommendation || formData.genres.length === 0}
                className={cn(
                  "flex-1 py-3 px-6 rounded-lg font-semibold transition-all",
                  formData.title && formData.classRecommendation && formData.genres.length > 0
                    ? "bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white hover:from-violet-400 hover:to-fuchsia-400"
                    : "bg-slate-700 text-slate-400 cursor-not-allowed"
                )}
              >
                Generate JSON
              </button>
              <button
                onClick={resetForm}
                className="py-3 px-6 rounded-lg font-semibold bg-slate-700 text-slate-300 hover:bg-slate-600 transition-all"
              >
                Reset
              </button>
            </div>

            {generatedJson && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative"
              >
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-slate-300">
                    Generated JSON (copy and add to reviews.json)
                  </label>
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-700 text-slate-300 hover:bg-slate-600 transition-colors text-sm"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-green-400" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 bg-slate-800 border border-slate-700 rounded-lg overflow-x-auto text-sm text-slate-300">
                  {generatedJson}
                </pre>
              </motion.div>
            )}
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
