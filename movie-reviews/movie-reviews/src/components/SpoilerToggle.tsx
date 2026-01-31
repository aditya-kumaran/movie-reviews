"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface SpoilerToggleProps {
  content: string;
  className?: string;
}

export function SpoilerToggle({ content, className }: SpoilerToggleProps) {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <div className={cn("mt-6", className)}>
      <button
        onClick={() => setIsRevealed(!isRevealed)}
        className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300",
          "border border-red-500/30 bg-red-500/10 hover:bg-red-500/20",
          "text-red-400 hover:text-red-300 font-medium text-sm"
        )}
      >
        <AlertTriangle className="w-4 h-4" />
        <span>Spoiler Territory</span>
        {isRevealed ? (
          <EyeOff className="w-4 h-4 ml-2" />
        ) : (
          <Eye className="w-4 h-4 ml-2" />
        )}
      </button>

      <AnimatePresence>
        {isRevealed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="mt-4 p-4 rounded-lg bg-red-500/5 border border-red-500/20">
              <p className="text-zinc-300 leading-relaxed">{content}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
