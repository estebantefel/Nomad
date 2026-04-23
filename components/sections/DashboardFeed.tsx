"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock, Banknote, Star } from "lucide-react";
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

function CardImage({
  src,
  alt,
  className,
  category,
  badge,
}: {
  src: string | null;
  alt: string;
  className: string;
  category: string;
  badge?: React.ReactNode;
}) {
  if (src) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image src={src} alt={alt} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
        {badge}
      </div>
    );
  }
  return (
    <div
      className={`flex items-center justify-center relative overflow-hidden ${className}`}
      style={{ background: CATEGORY_GRADIENTS[category] ?? "linear-gradient(135deg, #1c1917, #292524)" }}
    >
      {badge}
    </div>
  );
}

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

      <div>
        <p className="text-zinc-500 text-sm capitalize">{today}</p>
        <h1 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-white mt-0.5">
          Buenos días, Ana.
        </h1>
      </div>

      {/* Featured hero — top pick of the week */}
      {topPick && (
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
        >
          <Link
            href={topPick.source_url ?? "/experiences"}
            target={topPick.source_url ? "_blank" : undefined}
            rel={topPick.source_url ? "noopener noreferrer" : undefined}
            className="group block rounded-2xl overflow-hidden border border-white/20 hover:border-white/40 transition-all duration-300 shadow-xl shadow-black/60"
          >
            <div className="relative h-72 bg-black overflow-hidden">
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
              <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-xs font-semibold text-white bg-brand-green flex items-center gap-1.5">
                <Star className="w-3 h-3" strokeWidth={2} />
                This week&apos;s pick
              </span>
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 to-transparent" />
              <div className="absolute bottom-0 left-0 px-6 pb-5">
                <span className="text-brand-green text-xs font-semibold uppercase tracking-widest">Top pick</span>
                <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-white mt-1 leading-tight">
                  {topPick.title}
                </h2>
                <div className="flex gap-4 mt-2 flex-wrap">
                  {topPick.location && (
                    <div className="flex items-center gap-1.5 text-xs text-white/50">
                      <MapPin className="w-3 h-3 shrink-0" strokeWidth={1.75} />
                      <span>{topPick.location}</span>
                    </div>
                  )}
                  {topPick.duration && (
                    <div className="flex items-center gap-1.5 text-xs text-white/50">
                      <Clock className="w-3 h-3 shrink-0" strokeWidth={1.75} />
                      <span>{topPick.duration}</span>
                    </div>
                  )}
                  {topPick.price && (
                    <div className="flex items-center gap-1.5 text-xs text-white/50">
                      <Banknote className="w-3 h-3 shrink-0" strokeWidth={1.75} />
                      <span>{topPick.price}</span>
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
        <p className="text-zinc-400 text-xs font-semibold uppercase tracking-widest mb-4">Discover Madrid</p>
        {feed.length === 0 ? (
          <p className="text-zinc-600 text-sm">Experiences loading — check back shortly.</p>
        ) : (
          <ul className="flex flex-col gap-4">
            {feed.map((exp, i) => (
              <motion.li
                key={exp.id}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, ease, delay: 0.2 + i * 0.07 }}
              >
                <Link
                  href={exp.source_url ?? "/experiences"}
                  target={exp.source_url ? "_blank" : undefined}
                  rel={exp.source_url ? "noopener noreferrer" : undefined}
                  className="group flex rounded-2xl overflow-hidden border border-white/[0.09] hover:border-white/25 transition-all duration-300 bg-zinc-900 shadow-lg shadow-black/30"
                >
                  <CardImage
                    src={exp.image_url}
                    alt={exp.title}
                    className="w-44 shrink-0 bg-zinc-800"
                    category={exp.category}
                  />
                  <div className="flex flex-col justify-center px-5 py-4 min-w-0">
                    <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-white group-hover:text-brand-green transition-colors duration-300 leading-snug">
                      {exp.title}
                    </h3>
                    {exp.description && (
                      <p className="text-zinc-500 text-xs mt-1 line-clamp-2">{exp.description}</p>
                    )}
                    <div className="flex flex-col gap-1.5 mt-3">
                      {exp.location && (
                        <div className="flex items-center gap-2 text-xs text-zinc-500">
                          <MapPin className="w-3 h-3 shrink-0" strokeWidth={1.75} />
                          <span className="truncate">{exp.location}</span>
                        </div>
                      )}
                      {exp.duration && (
                        <div className="flex items-center gap-2 text-xs text-zinc-500">
                          <Clock className="w-3 h-3 shrink-0" strokeWidth={1.75} />
                          <span className="truncate">{exp.duration}</span>
                        </div>
                      )}
                      {exp.price && (
                        <div className="flex items-center gap-2 text-xs text-zinc-500">
                          <Banknote className="w-3 h-3 shrink-0" strokeWidth={1.75} />
                          <span className="truncate">{exp.price}</span>
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
