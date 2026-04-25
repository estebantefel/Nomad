"use client";

import { useState, useMemo, useRef } from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Clock, Banknote } from "lucide-react";
import type { ExperienceDB } from "@/types/experience";
import ExplorerFilters from "./ExplorerFilters";

const ease = [0.22, 1, 0.36, 1] as const;

const CATEGORY_GRADIENTS: Record<string, string> = {
  outdoors:  "linear-gradient(135deg, #14532d, #15803d)",
  mind:      "linear-gradient(135deg, #1e1b4b, #3730a3)",
  learning:  "linear-gradient(135deg, #1c1917, #44403c)",
  creative:  "linear-gradient(135deg, #1a1333, #4c1d95)",
  social:    "linear-gradient(135deg, #0c4a6e, #0369a1)",
  food:      "linear-gradient(135deg, #431407, #9a3412)",
  lifestyle: "linear-gradient(135deg, #1a1a1a, #404040)",
  sports:    "linear-gradient(135deg, #052e16, #065f46)",
};

function parsePrice(price: string | null): number | null {
  if (!price) return null;
  if (/free|gratis/i.test(price)) return 0;
  const m = /€\s*(\d+)/.exec(price);
  if (m) return parseInt(m[1], 10);
  return null;
}

function parseDuration(duration: string | null): number | null {
  if (!duration) return null;
  const min = /(\d+)\s*min/i.exec(duration);
  if (min) return parseInt(min[1], 10) / 60;
  const hrs = /(\d+)(?:[–\-](\d+))?\s*h/i.exec(duration);
  if (hrs) return hrs[2] ? parseInt(hrs[2], 10) : parseInt(hrs[1], 10);
  if (/half\s*day/i.test(duration)) return 4;
  if (/full\s*day/i.test(duration)) return 8;
  return null;
}

interface ExplorerGridProps {
  experiences: ExperienceDB[];
}

export default function ExplorerGrid({ experiences }: ExplorerGridProps) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  const [search, setSearch]           = useState("");
  const [category, setCategory]       = useState("all");
  const [maxPrice, setMaxPrice]       = useState(50);
  const [maxDuration, setMaxDuration] = useState(8);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return experiences.filter((exp) => {
      if (
        q &&
        !exp.title.toLowerCase().includes(q) &&
        !exp.description?.toLowerCase().includes(q)
      ) return false;

      if (category !== "all" && exp.category !== category) return false;

      if (maxPrice < 50) {
        const p = parsePrice(exp.price);
        if (p !== null && p > maxPrice) return false;
      }

      if (maxDuration < 8) {
        const d = parseDuration(exp.duration);
        if (d !== null && d > maxDuration) return false;
      }

      return true;
    });
  }, [experiences, search, category, maxPrice, maxDuration]);

  return (
    <div ref={ref} className="flex flex-col gap-6 px-8 py-8 pb-12">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -8 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease, delay: 0.05 }}
      >
        <p className="text-zinc-500 text-xs font-semibold uppercase tracking-widest">
          Explore Madrid
        </p>
        <h1 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-white mt-1">
          Explore
        </h1>
        <p className="text-zinc-500 text-sm mt-1">
          {filtered.length} experience{filtered.length !== 1 ? "s" : ""}
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease, delay: 0.15 }}
      >
        <ExplorerFilters
          search={search}
          onSearch={setSearch}
          category={category}
          onCategory={setCategory}
          maxPrice={maxPrice}
          onMaxPrice={setMaxPrice}
          maxDuration={maxDuration}
          onMaxDuration={setMaxDuration}
        />
      </motion.div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="text-zinc-500 text-sm text-center py-16">
          No experiences match your filters — try adjusting them.
        </p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((exp, i) => (
            <motion.li
              key={exp.id}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease, delay: 0.2 + Math.min(i * 0.05, 0.35) }}
              whileHover={shouldReduceMotion ? {} : { y: -4 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
            >
              <Link
                href={`/dashboard/experience/${exp.id}`}
                className="group block rounded-2xl overflow-hidden border border-white/[0.09] hover:border-white/25 bg-zinc-900 shadow-lg shadow-black/30 transition-colors duration-300 h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
              >
                {/* Image with title overlay */}
                <div className="relative h-52 overflow-hidden bg-zinc-800">
                  {exp.image_url ? (
                    <Image
                      src={exp.image_url}
                      alt={exp.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                  ) : (
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          CATEGORY_GRADIENTS[exp.category] ??
                          "linear-gradient(135deg, #1c1917, #292524)",
                      }}
                    />
                  )}
                  <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 px-4 pb-4">
                    <h3 className="font-[family-name:var(--font-heading)] text-base font-bold text-white group-hover:text-brand-green transition-colors duration-200 leading-snug line-clamp-2">
                      {exp.title}
                    </h3>
                  </div>
                </div>

                {/* Meta row */}
                {(exp.price || exp.duration) && (
                  <div className="flex items-center gap-4 px-4 py-3 flex-wrap">
                    {exp.price && (
                      <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                        <Banknote className="w-3.5 h-3.5 shrink-0" strokeWidth={1.75} />
                        <span>{exp.price}</span>
                      </div>
                    )}
                    {exp.duration && (
                      <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                        <Clock className="w-3.5 h-3.5 shrink-0" strokeWidth={1.75} />
                        <span>{exp.duration}</span>
                      </div>
                    )}
                  </div>
                )}
              </Link>
            </motion.li>
          ))}
        </ul>
      )}
    </div>
  );
}
