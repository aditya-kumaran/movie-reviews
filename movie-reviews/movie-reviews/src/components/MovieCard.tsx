"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, Calendar, Users, RefreshCw, Trophy } from "lucide-react";
import { MovieReview } from "@/types/movie";
import { cn, formatYear, getRatingColor, getClassRecommendationColor } from "@/lib/utils";
import { SpoilerToggle } from "./SpoilerToggle";

interface MovieCardProps {
  movie: MovieReview;
  index: number;
}

const TMDB_POSTER_BASE = "https://image.tmdb.org/t/p/w500";

const posterMap: Record<number, string> = {
  11: "/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg",
  12: "/eHuGQ10FUzK1mdOY69wF5pGgEf5.jpg",
  13: "/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
  38: "/5MwkWH9tYHv3mV9OdYTMR5qreIz.jpg",
  80: "/8tABCBpzu3mZbzMB3sRzMEHEvJi.jpg",
  98: "/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg",
  129: "/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg",
  155: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
  207: "/ai40gM7SUaGA8ZbravRJpnF94Oe.jpg",
  238: "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
  240: "/hek3koDUyRQq7FkGKhZNYoLFryp.jpg",
  278: "/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg",
  280: "/5M0j0B18abtBI5gi2RhfjjurTqb.jpg",
  285: "/2YMnBRh8F0fWGCMA6iFfQAGLWaG.jpg",
  348: "/vfrQk5IPloGg1v9Rzbh2Eg3VGyM.jpg",
  489: "/bABCBKYBK7A5G1x0FzoeoNfuj2b.jpg",
  585: "/sgheSKxZkttIe8ONsf2sKu62ePq.jpg",
  591: "/mGN0lH2phYfesyEVqP2xvGUaxBR.jpg",
  597: "/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg",
  603: "/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
  640: "/BSOgroSbCeIUexDSimlbJREkmob.jpg",
  671: "/wuMc08IPKEatf9rnMNXvIDxqP4W.jpg",
  680: "/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
  744: "/xUuHj3CgmZQ9P2cMaqQs4J0d4Zc.jpg",
  816: "/5uD4dxNX8JKFjWKYMHyOsqhi5pN.jpg",
  862: "/uXDfjJbdP4ijW5hWSBrPrlKpxab.jpg",
  881: "/l9VJrPQuSBzkUTMKPILnSUWm5k3.jpg",
  1422: "/nT97ifVT2J1yMQmeq20Qblg61T.jpg",
  1726: "/78lPtwv72eTNqFW9COBYI0dWDJa.jpg",
  1771: "/vSNxAJTlD0r02V9sPYpOjqDZXUK.jpg",
  2062: "/t3vaWRPSf6WjDSamIkKDs1iQWna.jpg",
  2109: "/3CyJXvMFSQ4FbzfWmkPQn5x8Q8m.jpg",
  2493: "/gpxjoE0yvRwIhFEJgNArtKtaN7S.jpg",
  4951: "/ujERk3aKABXU3NDXOAxEQYTHe9A.jpg",
  5174: "/aXYXVvkLvFReGMFmTqLrXTAYnJU.jpg",
  5559: "/1PkGnyFwRyapmbuIzKYuRoaHfHo.jpg",
  6499: "/hfkztwyoKfVfmAOy5iBLbHPNVLt.jpg",
  8587: "/sKCr78MXSLixwmZ8DyJLrpMsd15.jpg",
  9377: "/9LTQNCvoLsKXP0LtaKAaYVtRaQL.jpg",
  9502: "/wWt4JYXTg5Wr3xBW2phBrMKgp3x.jpg",
  9806: "/2LqaLgk4Z226KkgPJuiOQ58wvrm.jpg",
  10191: "/ygGmAO60t8GyqUo9xYeYxSZAR3b.jpg",
  10193: "/4cpGytCB0eqvRks4FAlJoUJiFPG.jpg",
  10681: "/hbhFnRzzg6ZDmm8YAmxBnQpQIPh.jpg",
  10854: "/2iwNqnrBPPBnSTjMIuKHElqfbDo.jpg",
  10917: "/3mOMgt1CYNfmkNloCqfSzT0O3qA.jpg",
  11036: "/rNzQyW4f8B8cQeg7Dgj3n6eT5k9.jpg",
  11324: "/kve20tXMUZWuAFP8zlVHvjbEdBY.jpg",
  13448: "/vfIqPCqLaHVzPTrDjFDCpLzLQfS.jpg",
  14160: "/vpbaStTMt8qqXaEgnOR2EE4DNJk.jpg",
  15121: "/5qQTu2iGTiQ2UvyGp0beQAZ2rKx.jpg",
  24428: "/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg",
  27205: "/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
  37165: "/vuza0WqY239yBXOadKlGwJsZJFE.jpg",
  37799: "/n0ybibhJtQ5icDqTp8eRytcIHJx.jpg",
  38142: "/A4dJST0gKbUABuPMnPLwxpCr4Zr.jpg",
  44214: "/rH19vkjAEe3rgvMINGUq5uMJKhk.jpg",
  49026: "/hr0L2aueqlP2BYUblTTjmtn0hw4.jpg",
  49047: "/uPxtxhB2Fy9ihVqtBtNGHmknJqV.jpg",
  49521: "/dksTL9NXc3GqPBRHYHcy1aIwjS.jpg",
  64688: "/8v3Sqv9UcIUC4ebmpKWROqPBINZ.jpg",
  70160: "/yXCbOiVDCxO71zI7cuwBRXdftq8.jpg",
  76341: "/8tZYtuWezp8JbcsvHYO0O46tFbo.jpg",
  80274: "/vrAcvKi4BNxqVWdc3FhYpx1Uj0I.jpg",
  100402: "/tVFRpFw3xTedgPGqxW0AOI8Qhh0.jpg",
  109091: "/hueKsqwzCvFhKPhMqWxrLODvNL.jpg",
  109445: "/kgwjIb2JDHRhNk13lmSxiClFjVk.jpg",
  118340: "/r7vmZjiyZw9rpJMQJhXpjpX2xzP.jpg",
  120467: "/eWdyYQreja6JGCzqHWXpWHDrrPo.jpg",
  135397: "/A0LZHXUzo5C60Oahvt7VxvwuzHw.jpg",
  150540: "/2H1TmgdfNtsKlU9jKdeNyYL5y8T.jpg",
  157336: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
  187017: "/850Ij6SweFwaL2E4kvYXoBWYtAa.jpg",
  205596: "/zSqJ1qFq8NXFfi7JeIYMlzyR0dx.jpg",
  210577: "/gdiLTof3rbPDAmPaCf4g6op46bj.jpg",
  222935: "/6FRFIogh9dhFOgo5QnLrjg0PRRH.jpg",
  244786: "/7fn624j5lj3xTme2SgiLCeuedmO.jpg",
  254904: "/buEdvQUbYfGxtjsOcvVrBpHhSNo.jpg",
  258480: "/73wVMjWnPMmvdJzHSCwD3qP6Vr7.jpg",
  266856: "/4jspr8hLLuju59sFM7zCmG0aBXF.jpg",
  269149: "/hlK0e0wAQ3VLuJcsfIYPvb4JVud.jpg",
  271110: "/rAGiXaUfPzY7CDEyNKUofk3Kw2e.jpg",
  277834: "/4JeejGugONWpJkbnvL12hVoYEDa.jpg",
  284052: "/uGBVj3bEbCoZbDjjl9wTxcygko1.jpg",
  284053: "/rzRwTcFvttcN1ZpX2xv4j3tSdJu.jpg",
  284054: "/uxzzxijgPIY7slzFvMotPv8wjKA.jpg",
  286217: "/5BHuvQ6p9kfc091Z8RiFNhCwL4b.jpg",
  293660: "/fSRb7vyIP8rQpL0I47P3qUsEKX3.jpg",
  297762: "/gfJGlDaHuWimTnmoNtRCio0MbzH.jpg",
  299534: "/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
  313369: "/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg",
  315635: "/c24sv2weTHPsmDa7jEMN0m2P3RT.jpg",
  318846: "/p11Ftd4VposrAzthkhF53ifYZRl.jpg",
  321612: "/hKegSKIDep2ewJWPUQD7u0KqFIp.jpg",
  324857: "/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg",
  329865: "/x2FJsf1ElAgr63Y3PNPtJrcmpoe.jpg",
  331482: "/yn5ihODtZ7ofn8pDYfxCmxh8AXI.jpg",
  332562: "/wrFpXMNBRj2PBiN4Z5kix51XaIZ.jpg",
  333339: "/pU1ULUq8D3iRxl1fdX2lZIzdHuI.jpg",
  335983: "/2uNW4WbgBXL25BAbXGLnLqX71Sw.jpg",
  335984: "/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg",
  339403: "/rmnQ9jKW72bHu8uKlMjPIb2VLMI.jpg",
  354912: "/gGEsBPAijhVUFoiNpgZS2ULnCEq.jpg",
  372058: "/q719jXXEzOoYaps6babgKnONONX.jpg",
  378064: "/tuFaWiqX0TXoWu7DGNcmX3UW7sT.jpg",
  419430: "/tFXcEccSQMf3lfhfXKSU9iRBpa3.jpg",
  424694: "/lHu1wtNaczFPGFDTrjCSzeLPTKN.jpg",
  438631: "/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
  455207: "/1XxL4LJ5WHdrcYcihEZUCgNCpAW.jpg",
  475557: "/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
  496243: "/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
  505600: "/2EWGvIqCJdqcOz5RS8Cj6mPTDCp.jpg",
  508442: "/hm58Jw4Lw8OIeECIq5qyPYhAeRJ.jpg",
  515001: "/7GsM4mtM0worCtIVeiQt28HieeN.jpg",
  527641: "/kreTuJBkUjVWePRfhHZuYfhNE1T.jpg",
  546554: "/pThyQovXQrw2m0s9x82twj48Jq4.jpg",
  556574: "/h1B7tW0t399VDjAcWJh8m87469b.jpg",
  577922: "/k68nPLbIST6NP96JmTxmZijEvCA.jpg",
  634649: "/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
  776503: "/dOBLurTTHwXPzMtZgONjVCNYOiZ.jpg",
  872585: "/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
};

export function MovieCard({ movie, index }: MovieCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const posterPath = movie.tmdbId ? posterMap[movie.tmdbId] : null;
  const posterUrl = posterPath ? `${TMDB_POSTER_BASE}${posterPath}` : null;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={cn(
        "group relative bg-zinc-900/50 rounded-xl overflow-hidden",
        "border border-zinc-800 hover:border-zinc-700 transition-all duration-300",
        "hover:shadow-2xl hover:shadow-black/50"
      )}
    >
      <div className="flex flex-col md:flex-row">
        <div className="relative w-full md:w-48 h-72 md:h-auto md:min-h-80 flex-shrink-0 overflow-hidden">
          {posterUrl && !imageError ? (
            <Image
              src={posterUrl}
              alt={`${movie.title} poster`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              onError={() => setImageError(true)}
              sizes="(max-width: 768px) 100vw, 192px"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center">
              <span className="text-zinc-600 text-6xl font-bold">
                {movie.title.charAt(0)}
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent md:bg-gradient-to-r" />
          
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            <div
              className={cn(
                "flex items-center gap-1 px-2 py-1 rounded-md backdrop-blur-sm",
                "bg-black/60 border border-zinc-700/50"
              )}
            >
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span className={cn("font-bold", getRatingColor(movie.rating))}>
                {movie.rating}
              </span>
            </div>
          </div>
        </div>

        <div className="flex-1 p-5 md:p-6">
          <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white group-hover:text-amber-400 transition-colors">
                {movie.title}
              </h2>
              <div className="flex items-center gap-2 mt-1 text-zinc-400 text-sm">
                <Calendar className="w-4 h-4" />
                <span>{formatYear(movie.releaseDate)}</span>
              </div>
            </div>
            <span
              className={cn(
                "px-3 py-1 rounded-full text-xs font-semibold border",
                getClassRecommendationColor(movie.classRecommendation)
              )}
            >
              {movie.classRecommendation}
            </span>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {movie.genres.map((genre) => (
              <span
                key={genre}
                className="px-2 py-1 text-xs rounded-md bg-zinc-800 text-zinc-300 border border-zinc-700"
              >
                {genre}
              </span>
            ))}
          </div>

          <p className="text-zinc-300 leading-relaxed mb-4 line-clamp-3 md:line-clamp-none">
            {movie.review}
          </p>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-amber-400 hover:text-amber-300 text-sm font-medium transition-colors mb-4"
          >
            {isExpanded ? "Show less" : "Show more details"}
          </button>

          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4 pt-4 border-t border-zinc-800"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-zinc-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-zinc-500 uppercase tracking-wide">
                      Intended Audience
                    </p>
                    <p className="text-zinc-300 text-sm">{movie.intendedAudience}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <RefreshCw className="w-5 h-5 text-zinc-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-zinc-500 uppercase tracking-wide">
                      Rewatchability
                    </p>
                    <p className="text-zinc-300 text-sm">{movie.rewatchability}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 sm:col-span-2">
                  <Trophy className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-zinc-500 uppercase tracking-wide">
                      Best Character Winner
                    </p>
                    <p className="text-amber-400 text-sm font-medium">
                      {movie.bestCharacterWinner}
                    </p>
                  </div>
                </div>
              </div>

              {movie.spoilerReview && (
                <SpoilerToggle content={movie.spoilerReview} />
              )}
            </motion.div>
          )}
        </div>
      </div>
    </motion.article>
  );
}
