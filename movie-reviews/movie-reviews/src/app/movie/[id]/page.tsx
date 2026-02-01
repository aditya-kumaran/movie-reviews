import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Star, Users, RefreshCw, Trophy, Clock, Tag, Sparkles } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SpoilerToggle } from "@/components/SpoilerToggle";
import { getMovies } from "@/lib/movies";
import { cn, formatYear, getRatingColor } from "@/lib/utils";
import { posterMap, backdropMap, TMDB_POSTER_BASE, TMDB_BACKDROP_BASE } from "@/lib/posters";
import { ClassRecommendation } from "@/types/movie";

const getClassBadgeStyle = (classRec: ClassRecommendation) => {
  const styles: Record<ClassRecommendation, string> = {
    "Masterclass": "bg-gradient-to-r from-yellow-400 to-amber-500 text-gray-900",
    "Must Watch": "bg-gradient-to-r from-yellow-400 to-amber-500 text-gray-900",
    "Council Class": "bg-gradient-to-r from-violet-500 to-purple-600 text-white",
    "Highly Recommended": "bg-gradient-to-r from-violet-500 to-purple-600 text-white",
    "Recommendable": "bg-gradient-to-r from-blue-500 to-cyan-500 text-white",
    "Worth Your Time": "bg-gradient-to-r from-blue-500 to-cyan-500 text-white",
    "Rewatchable": "bg-gradient-to-r from-green-500 to-emerald-500 text-white",
    "Casual Viewing": "bg-gradient-to-r from-green-500 to-emerald-500 text-white",
    "Existent": "bg-gradient-to-r from-gray-500 to-slate-600 text-white",
    "Skip It": "bg-gradient-to-r from-gray-500 to-slate-600 text-white",
    "Meme": "bg-gradient-to-r from-red-500 to-rose-600 text-white",
    "Guilty Pleasure": "bg-gradient-to-r from-pink-500 to-rose-500 text-white"
  };
  return styles[classRec] || styles["Recommendable"];
};

export async function generateStaticParams() {
  const movies = getMovies();
  return movies.map((movie) => ({
    id: movie.id,
  }));
}

interface MovieDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function MovieDetailPage({ params }: MovieDetailPageProps) {
  const { id: movieId } = await params;
  
  const movies = getMovies();
  const movie = movies.find((m) => m.id === movieId);

  if (!movie) {
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
          <div className="text-center py-20">
            <h1 className="text-2xl font-bold text-white mb-4">Movie Not Found</h1>
            <p className="text-slate-400">The movie you&apos;re looking for doesn&apos;t exist.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const posterPath = movie.tmdbId ? posterMap[movie.tmdbId] : null;
  const posterUrl = posterPath ? `${TMDB_POSTER_BASE}${posterPath}` : null;
  
  // Get backdrop - use backdrop map first, fall back to poster
  const backdropPath = movie.tmdbId ? backdropMap[movie.tmdbId] : null;
  const backdropUrl = backdropPath 
    ? `${TMDB_BACKDROP_BASE}${backdropPath}` 
    : posterUrl; // Fall back to poster if no backdrop

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 relative">
        {/* Background Image */}
        {backdropUrl && (
          <div className="absolute inset-0 z-0">
            <Image
              src={backdropUrl}
              alt=""
              fill
              className="object-cover opacity-30"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/90 to-slate-900" />
          </div>
        )}

        <div className="relative z-10 max-w-5xl mx-auto w-full px-4 py-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-300 hover:text-violet-400 transition-colors mb-6 bg-black/30 px-3 py-1.5 rounded-lg backdrop-blur-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Reviews
          </Link>

          {/* Hero Section with Poster */}
          <div className="flex flex-col md:flex-row gap-8 mb-8">
            {/* Movie Poster */}
            <div className="flex-shrink-0 mx-auto md:mx-0">
              <div className="relative w-64 h-96 rounded-xl overflow-hidden shadow-2xl border-2 border-white/20">
                {posterUrl ? (
                  <Image
                    src={posterUrl}
                    alt={`${movie.title} poster`}
                    fill
                    className="object-cover"
                    sizes="256px"
                    priority
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                    <span className="text-slate-600 text-8xl font-bold">
                      {movie.title.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Movie Info */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-4">
                <Trophy className="w-5 h-5 text-yellow-400" />
                <span
                  className={cn(
                    "px-4 py-1.5 rounded-full text-sm font-bold shadow-lg",
                    getClassBadgeStyle(movie.classRecommendation)
                  )}
                >
                  {movie.classRecommendation}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">
                {movie.title}
              </h1>
              <p className="text-slate-300 text-xl mb-4">{formatYear(movie.releaseDate)}</p>

              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black/50 border border-white/20 backdrop-blur-sm">
                  <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                  <span className={cn("text-3xl font-bold", getRatingColor(movie.rating))}>
                    {movie.rating}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {movie.genres.map((genre) => (
                  <span
                    key={genre}
                    className="px-3 py-1.5 rounded-full bg-white/10 text-white text-sm border border-white/20 backdrop-blur-sm"
                  >
                    {genre}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 bg-black/30 rounded-lg p-3 backdrop-blur-sm">
                  <Users className="w-5 h-5 text-violet-400" />
                  <div>
                    <p className="text-xs text-slate-400">Intended Audience</p>
                    <p className="text-white font-medium">{movie.intendedAudience}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-black/30 rounded-lg p-3 backdrop-blur-sm">
                  <RefreshCw className="w-5 h-5 text-cyan-400" />
                  <div>
                    <p className="text-xs text-slate-400">Rewatchability</p>
                    <p className="text-white font-medium">{movie.rewatchability}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-black/30 rounded-lg p-3 backdrop-blur-sm">
                  <Sparkles className="w-5 h-5 text-yellow-400" />
                  <div>
                    <p className="text-xs text-slate-400">Best Character</p>
                    <p className="text-white font-medium">{movie.bestCharacterWinner}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-black/30 rounded-lg p-3 backdrop-blur-sm">
                  <Clock className="w-5 h-5 text-pink-400" />
                  <div>
                    <p className="text-xs text-slate-400">Reviewed On</p>
                    <p className="text-white font-medium">{movie.reviewDate}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Review Section */}
          <article className="bg-slate-900/80 backdrop-blur-md rounded-xl border border-violet-500/20 overflow-hidden">
            <div className="p-6 md:p-8">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Tag className="w-5 h-5 text-violet-400" />
                Review
              </h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">
                  {movie.review}
                </p>
              </div>

              {movie.spoilerReview && (
                <div className="mt-8">
                  <SpoilerToggle>
                    <div className="prose prose-invert max-w-none">
                      <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">
                        {movie.spoilerReview}
                      </p>
                    </div>
                  </SpoilerToggle>
                </div>
              )}
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
