"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Search, Plus } from "lucide-react";
import type { ExperienceCategory } from "@/types/experience";

const ease = [0.22, 1, 0.36, 1] as const;

const CATEGORIES: Array<{ value: "all" | ExperienceCategory; label: string; dot?: string }> = [
  { value: "all",       label: "All"                        },
  { value: "outdoors",  label: "Outdoors",  dot: "#15803d"  },
  { value: "mind",      label: "Mind",      dot: "#3730a3"  },
  { value: "learning",  label: "Learning",  dot: "#44403c"  },
  { value: "creative",  label: "Creative",  dot: "#4c1d95"  },
  { value: "social",    label: "Social",    dot: "#0369a1"  },
  { value: "food",      label: "Food",      dot: "#9a3412"  },
  { value: "lifestyle", label: "Lifestyle", dot: "#525252"  },
  { value: "sports",    label: "Sports",    dot: "#065f46"  },
];

interface ExplorerFiltersProps {
  search: string;
  onSearch: (v: string) => void;
  category: string;
  onCategory: (v: string) => void;
  maxPrice: number;
  onMaxPrice: (v: number) => void;
  maxDuration: number;
  onMaxDuration: (v: number) => void;
}

export default function ExplorerFilters({
  search,
  onSearch,
  category,
  onCategory,
  maxPrice,
  onMaxPrice,
  maxDuration,
  onMaxDuration,
}: ExplorerFiltersProps) {
  const shouldReduceMotion = useReducedMotion();
  const [filtersOpen, setFiltersOpen] = useState(false);

  const priceLabel =
    maxPrice === 0 ? "Free only" : maxPrice >= 50 ? "Any price" : `Up to €${maxPrice}`;

  const durationLabel =
    maxDuration >= 8 ? "Any length" : maxDuration <= 1 ? "Under 1 h" : `Up to ${maxDuration} h`;

  const filtersActive = maxPrice < 50 || maxDuration < 8;

  return (
    <div className="flex flex-col gap-4">
      {/* Search + filter toggle */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none"
            strokeWidth={1.75}
          />
          <input
            type="search"
            placeholder="Search experiences…"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            aria-label="Search experiences"
            className="w-full bg-zinc-900 border border-white/[0.09] rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/40 focus-visible:border-brand-green/50 transition-colors duration-200"
          />
        </div>

        <div className="relative shrink-0">
          <motion.button
            onClick={() => setFiltersOpen((o) => !o)}
            aria-expanded={filtersOpen}
            aria-label={filtersOpen ? "Close filters" : "Open filters"}
            whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.93 }}
            transition={{ type: "spring", bounce: 0.3, duration: 0.25 }}
            className={`flex items-center justify-center w-[46px] h-[46px] rounded-xl border focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/60 transition-colors duration-200 ${
              filtersOpen || filtersActive
                ? "bg-brand-green/10 border-brand-green/30 text-brand-green"
                : "bg-zinc-900 border-white/[0.09] text-zinc-400 hover:text-white hover:border-white/20"
            }`}
          >
            <motion.span
              animate={{ rotate: filtersOpen ? 45 : 0 }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { type: "spring", bounce: 0.3, duration: 0.35 }
              }
              className="flex items-center justify-center"
            >
              <Plus className="w-4 h-4" strokeWidth={2} />
            </motion.span>
          </motion.button>
          {filtersActive && !filtersOpen && (
            <span aria-hidden="true" className="absolute top-1 right-1 w-2 h-2 rounded-full bg-brand-green pointer-events-none" />
          )}
        </div>
      </div>

      {/* Category pills */}
      <div
        role="group"
        aria-label="Filter by category"
        className="flex gap-1.5 overflow-x-auto pb-0.5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {CATEGORIES.map((cat) => {
          const active = category === cat.value;
          return (
            <motion.button
              key={cat.value}
              onClick={() => onCategory(cat.value)}
              aria-pressed={active}
              whileTap={shouldReduceMotion ? {} : { scale: 0.94 }}
              className="relative shrink-0 px-4 rounded-full text-sm font-medium min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/60"
            >
              {active && (
                <motion.span
                  layoutId="category-pill"
                  className="absolute inset-0 rounded-full bg-brand-green/15 border border-brand-green/30"
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : { type: "spring", bounce: 0.2, duration: 0.4 }
                  }
                />
              )}
              <span
                className={`relative z-10 flex items-center gap-1.5 transition-colors duration-200 ${
                  active ? "text-brand-green" : "text-zinc-400 hover:text-white"
                }`}
              >
                {cat.dot && (
                  <span
                    aria-hidden="true"
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: cat.dot }}
                  />
                )}
                {cat.label}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Sliders — collapsible */}
      <AnimatePresence initial={false}>
        {filtersOpen && (
          <motion.div
            key="filters"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.3, ease }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-5 bg-zinc-900 border border-white/[0.09] rounded-2xl px-5 py-4">
              {/* Price */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400 text-sm">Price</span>
                  <span className="text-white text-sm font-semibold">{priceLabel}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={50}
                  step={5}
                  value={maxPrice}
                  onChange={(e) => onMaxPrice(Number(e.target.value))}
                  aria-label="Maximum price"
                  aria-valuetext={priceLabel}
                  className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-[#059669] bg-zinc-700"
                />
                <div className="flex justify-between text-zinc-600 text-xs">
                  <span>Free</span>
                  <span>€50+</span>
                </div>
              </div>

              {/* Duration */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400 text-sm">Duration</span>
                  <span className="text-white text-sm font-semibold">{durationLabel}</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={8}
                  step={1}
                  value={maxDuration}
                  onChange={(e) => onMaxDuration(Number(e.target.value))}
                  aria-label="Maximum duration"
                  aria-valuetext={durationLabel}
                  className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-[#059669] bg-zinc-700"
                />
                <div className="flex justify-between text-zinc-600 text-xs">
                  <span>1 h</span>
                  <span>8 h+</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
