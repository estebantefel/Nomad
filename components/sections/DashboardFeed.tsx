"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Clock, Banknote, MapPin, Star } from "lucide-react";
import type { ExperienceDB } from "@/types/experience";

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

const USER_INITIALS = "TÚ"; // TODO: replace with real user initials from auth session

interface Props {
  topPick: ExperienceDB | null;
  feed: ExperienceDB[];
}

export default function DashboardFeed({ topPick, feed }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long", day: "numeric", month: "long",
  });

  return (
    <div ref={ref} className="flex flex-col gap-8 px-8 py-8">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -8 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease, delay: 0.05 }}
        className="flex items-start justify-between"
      >
        <div>
          <p className="text-zinc-500 text-sm capitalize">{today}</p>
          <h1 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-white mt-0.5">
            Dashboard
          </h1>
        </div>
        <Link
          href="/profile"
          aria-label="Go to profile"
          className="shrink-0 mt-1 w-10 h-10 rounded-full bg-brand-green flex items-center justify-center text-sm font-bold text-white hover:bg-brand-green-deep transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] select-none shadow-lg shadow-brand-green/20"
        >
          {USER_INITIALS}
        </Link>
      </motion.div>

      {/* Hero — top pick */}
      {topPick && (
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
          whileHover={shouldReduceMotion ? {} : { y: -4 }}
          whileTap={shouldReduceMotion ? {} : { scale: 0.99 }}
        >
          <Link
            href={`/dashboard/experience/${topPick.id}`}
            className="group block rounded-2xl overflow-hidden border border-white/20 hover:border-white/40 transition-colors duration-300 shadow-xl shadow-black/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
          >
            <div className="relative h-60 overflow-hidden">
              {topPick.image_url ? (
                <Image
                  src={topPick.image_url}
                  alt={topPick.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  unoptimized
                />
              ) : (
                <div
                  className="absolute inset-0"
                  style={{ background: CATEGORY_GRADIENTS[topPick.category] }}
                />
              )}
              <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 to-transparent" />
              <div className="absolute bottom-0 left-0 px-6 pb-5">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold text-white bg-brand-green/20 border border-brand-green/30 mb-2">
                  <Star className="w-3 h-3" strokeWidth={2} />
                  This week&apos;s pick
                </span>
                <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-white group-hover:text-brand-green transition-colors duration-200 leading-tight">
                  {topPick.title}
                </h2>
                <div className="flex gap-4 mt-2 flex-wrap">
                  {topPick.price && (
                    <div className="flex items-center gap-1.5 text-xs text-white/60">
                      <Banknote className="w-3 h-3 shrink-0" strokeWidth={1.75} />
                      <span>{topPick.price}</span>
                    </div>
                  )}
                  {topPick.duration && (
                    <div className="flex items-center gap-1.5 text-xs text-white/60">
                      <Clock className="w-3 h-3 shrink-0" strokeWidth={1.75} />
                      <span>{topPick.duration}</span>
                    </div>
                  )}
                  {topPick.location && (
                    <div className="flex items-center gap-1.5 text-xs text-white/60">
                      <MapPin className="w-3 h-3 shrink-0" strokeWidth={1.75} />
                      <span>{topPick.location}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      )}

      {/* Feed */}
      <div>
        <p className="text-zinc-500 text-xs font-semibold uppercase tracking-widest mb-4">
          Discover Madrid
        </p>
        {feed.length === 0 ? (
          <p className="text-zinc-500 text-sm">Experiences loading — check back shortly.</p>
        ) : (
          <ul className="flex flex-col gap-3">
            {feed.map((exp, i) => (
              <motion.li
                key={exp.id}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, ease, delay: 0.2 + i * 0.07 }}
                whileHover={shouldReduceMotion ? {} : { y: -3 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
              >
                <Link
                  href={`/dashboard/experience/${exp.id}`}
                  className="group flex rounded-2xl overflow-hidden border border-white/[0.09] hover:border-white/25 transition-colors duration-300 bg-zinc-900 shadow-md shadow-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
                >
                  <div className="relative w-32 sm:w-40 shrink-0 bg-zinc-800">
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
                  </div>

                  <div className="flex flex-col justify-center px-4 py-4 min-w-0 gap-2">
                    <h3 className="font-[family-name:var(--font-heading)] text-base font-bold text-white group-hover:text-brand-green transition-colors duration-200 leading-snug line-clamp-2">
                      {exp.title}
                    </h3>
                    {exp.description && (
                      <p className="text-zinc-500 text-xs leading-relaxed line-clamp-2">
                        {exp.description}
                      </p>
                    )}
                    <div className="flex items-center gap-3 flex-wrap">
                      {exp.price && (
                        <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                          <Banknote className="w-3 h-3 shrink-0" strokeWidth={1.75} />
                          <span>{exp.price}</span>
                        </div>
                      )}
                      {exp.duration && (
                        <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                          <Clock className="w-3 h-3 shrink-0" strokeWidth={1.75} />
                          <span>{exp.duration}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.li>
            ))}
          </ul>
        )}
      </div>

    </div>
  );
}
