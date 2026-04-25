"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Flame, Pencil, Clock, Banknote, Star,
  Lock, Trophy, MapPin, Compass,
} from "lucide-react";
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

const USER = {
  initials: "ET",
  name: "Esteban Tefel",
  status: "Exploring Madrid one experience at a time 🗺️",
  currentStreak: 14,
  longestStreak: 21,
};

const STATS = [
  { label: "Completed",  value: "12"       },
  { label: "Favourite",  value: "Outdoors"  },
  { label: "Explored",   value: "34 h"      },
  { label: "Districts",  value: "6"         },
];

const BADGES = [
  {
    id: "first-step",
    label: "First Step",
    description: "Completed your first experience",
    Icon: Star,
    color: "#f97316",
    bg: "bg-brand-orange/10",
    border: "border-brand-orange/20",
    locked: false,
  },
  {
    id: "on-fire",
    label: "On Fire",
    description: "7-day streak achieved",
    Icon: Flame,
    color: "#f97316",
    bg: "bg-brand-orange/10",
    border: "border-brand-orange/20",
    locked: false,
  },
  {
    id: "explorer",
    label: "Explorer",
    description: "Completed 10 experiences",
    Icon: Compass,
    color: "#059669",
    bg: "bg-brand-green/10",
    border: "border-brand-green/20",
    locked: false,
  },
  {
    id: "centurion",
    label: "Centurion",
    description: "Complete 100 experiences",
    Icon: Trophy,
    color: "#71717a",
    bg: "bg-zinc-800/60",
    border: "border-zinc-700/60",
    locked: true,
  },
  {
    id: "month-strong",
    label: "Month Strong",
    description: "Achieve a 30-day streak",
    Icon: Flame,
    color: "#71717a",
    bg: "bg-zinc-800/60",
    border: "border-zinc-700/60",
    locked: true,
  },
];

interface ProfileContentProps {
  activeBooking: ExperienceDB | null;
  recentExperiences: ExperienceDB[];
}

export default function ProfileContent({ activeBooking, recentExperiences }: ProfileContentProps) {
  const shouldReduceMotion = useReducedMotion();

  const headerRef  = useRef<HTMLDivElement>(null);
  const streakRef  = useRef<HTMLDivElement>(null);
  const bookingRef = useRef<HTMLDivElement>(null);
  const statsRef   = useRef<HTMLDivElement>(null);
  const badgesRef  = useRef<HTMLDivElement>(null);
  const recentRef  = useRef<HTMLDivElement>(null);

  const headerInView  = useInView(headerRef,  { once: true, margin: "-40px" });
  const streakInView  = useInView(streakRef,  { once: true, margin: "-40px" });
  const bookingInView = useInView(bookingRef, { once: true, margin: "-40px" });
  const statsInView   = useInView(statsRef,   { once: true, margin: "-40px" });
  const badgesInView  = useInView(badgesRef,  { once: true, margin: "-40px" });
  const recentInView  = useInView(recentRef,  { once: true, margin: "-40px" });

  return (
    <div className="flex flex-col gap-10 px-8 py-8">

      {/* Profile header */}
      <motion.section
        ref={headerRef}
        aria-labelledby="profile-heading"
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -8 }}
        animate={headerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, ease, delay: 0.05 }}
        className="flex items-start gap-5"
      >
        <div
          className="w-20 h-20 rounded-full bg-brand-green flex items-center justify-center text-2xl font-bold text-white shrink-0 shadow-lg shadow-brand-green/20 select-none"
          aria-hidden="true"
        >
          {USER.initials}
        </div>

        <div className="flex-1 min-w-0 pt-2">
          <h1
            id="profile-heading"
            className="font-[family-name:var(--font-heading)] text-3xl font-bold text-white leading-tight"
          >
            {USER.name}
          </h1>
          <div className="flex items-center gap-2 mt-1.5">
            <p className="text-zinc-400 text-sm leading-relaxed">{USER.status}</p>
            <button
              aria-label="Edit status"
              className="shrink-0 text-zinc-600 hover:text-zinc-400 transition-colors duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-brand-green/60 focus-visible:rounded-sm"
            >
              <Pencil className="w-3.5 h-3.5" strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </motion.section>

      {/* Streak */}
      <motion.section
        ref={streakRef}
        aria-label="Streak stats"
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
        animate={streakInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease, delay: 0.1 }}
        className="bg-white/[0.03] border border-white/[0.07] rounded-2xl px-6 py-5 flex flex-wrap items-center gap-6"
      >
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <motion.div
            animate={shouldReduceMotion ? {} : { scale: [1, 1.08, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-orange/10 border border-brand-orange/20 shrink-0"
            aria-hidden="true"
          >
            <Flame className="w-7 h-7 text-brand-orange" strokeWidth={1.75} />
          </motion.div>
          <div>
            <p className="text-zinc-500 text-xs font-semibold uppercase tracking-widest">Current streak</p>
            <p className="font-[family-name:var(--font-heading)] text-4xl font-bold text-brand-orange leading-tight">
              {USER.currentStreak}
              <span className="text-lg font-medium text-zinc-500 ml-1.5">days</span>
            </p>
          </div>
        </div>

        <div className="w-px h-10 bg-white/[0.07] shrink-0 hidden sm:block" aria-hidden="true" />

        <div>
          <p className="text-zinc-500 text-xs font-semibold uppercase tracking-widest">Best</p>
          <p className="font-[family-name:var(--font-heading)] text-2xl font-bold text-zinc-300 leading-tight mt-0.5">
            {USER.longestStreak}
            <span className="text-sm font-medium text-zinc-500 ml-1.5">days</span>
          </p>
        </div>

        <div className="flex flex-col gap-1.5 shrink-0">
          <p className="text-zinc-600 text-xs">This week</p>
          <div className="flex gap-1.5" aria-label={`${USER.currentStreak % 7 || 7} of 7 days this week`}>
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                aria-hidden="true"
                className={`w-2.5 h-2.5 rounded-full ${
                  i < (USER.currentStreak % 7 || 7) ? "bg-brand-orange" : "bg-zinc-800"
                }`}
              />
            ))}
          </div>
        </div>
      </motion.section>

      {/* Active booking */}
      {activeBooking && (
        <motion.section
          ref={bookingRef}
          aria-labelledby="booking-heading"
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
          animate={bookingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease, delay: 0.15 }}
        >
          <h2
            id="booking-heading"
            className="text-zinc-500 text-xs font-semibold uppercase tracking-widest mb-3"
          >
            Up next
          </h2>
          <motion.div
            whileHover={shouldReduceMotion ? {} : { y: -4 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.99 }}
          >
            <Link
              href={`/dashboard/experience/${activeBooking.id}`}
              className="group block rounded-2xl overflow-hidden border border-brand-green/20 hover:border-brand-green/40 bg-zinc-900 transition-colors duration-300 shadow-lg shadow-black/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
            >
              <div className="flex items-stretch">
                <div className="relative w-36 shrink-0 bg-zinc-800 min-h-[120px]">
                  {activeBooking.image_url ? (
                    <Image
                      src={activeBooking.image_url}
                      alt={activeBooking.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                  ) : (
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          CATEGORY_GRADIENTS[activeBooking.category] ??
                          "linear-gradient(135deg, #1c1917, #292524)",
                      }}
                    />
                  )}
                </div>
                <div className="flex flex-col justify-center px-5 py-4 gap-2 min-w-0">
                  <span className="inline-flex items-center gap-1.5 w-fit px-2 py-0.5 rounded-full text-xs font-semibold text-brand-green bg-brand-green/10 border border-brand-green/20">
                    <Star className="w-3 h-3" strokeWidth={2} aria-hidden="true" />
                    This Saturday
                  </span>
                  <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-white group-hover:text-brand-green transition-colors duration-200 leading-snug line-clamp-2">
                    {activeBooking.title}
                  </h3>
                  <div className="flex items-center gap-3 flex-wrap">
                    {activeBooking.price && (
                      <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                        <Banknote className="w-3.5 h-3.5 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                        <span>{activeBooking.price}</span>
                      </div>
                    )}
                    {activeBooking.duration && (
                      <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                        <Clock className="w-3.5 h-3.5 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                        <span>{activeBooking.duration}</span>
                      </div>
                    )}
                    {activeBooking.location && (
                      <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                        <MapPin className="w-3.5 h-3.5 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                        <span>{activeBooking.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </motion.section>
      )}

      {/* Stats */}
      <motion.section
        ref={statsRef}
        aria-label="Profile statistics"
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
        animate={statsInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease, delay: 0.1 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-3"
      >
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, ease, delay: 0.1 + i * 0.07 }}
            className="flex flex-col gap-1 bg-white/[0.03] border border-white/[0.07] rounded-xl px-4 py-4"
          >
            <p className="font-[family-name:var(--font-heading)] text-2xl font-bold text-white leading-tight">
              {stat.value}
            </p>
            <p className="text-zinc-500 text-xs">{stat.label}</p>
          </motion.div>
        ))}
      </motion.section>

      {/* Badges */}
      <motion.section
        ref={badgesRef}
        aria-labelledby="badges-heading"
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
        animate={badgesInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease, delay: 0.1 }}
      >
        <h2
          id="badges-heading"
          className="text-zinc-500 text-xs font-semibold uppercase tracking-widest mb-3"
        >
          Achievements
        </h2>
        <ul className="flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {BADGES.map((badge, i) => {
            const { Icon } = badge;
            return (
              <motion.li
                key={badge.id}
                initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 12 }}
                animate={badgesInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.45, ease, delay: 0.1 + i * 0.07 }}
                title={badge.description}
                className={`flex flex-col items-center gap-2.5 shrink-0 w-28 px-3 py-4 rounded-2xl border ${badge.bg} ${badge.border} ${badge.locked ? "opacity-40" : ""}`}
              >
                <div
                  className={`flex items-center justify-center w-11 h-11 rounded-xl ${badge.bg} border ${badge.border}`}
                  aria-hidden="true"
                >
                  {badge.locked ? (
                    <Lock className="w-5 h-5 text-zinc-500" strokeWidth={1.75} />
                  ) : (
                    <Icon className="w-5 h-5" style={{ color: badge.color }} strokeWidth={1.75} />
                  )}
                </div>
                <p
                  className={`text-xs font-semibold text-center leading-snug ${
                    badge.locked ? "text-zinc-600" : "text-white"
                  }`}
                >
                  {badge.label}
                </p>
                {badge.locked && (
                  <span className="sr-only">(locked)</span>
                )}
              </motion.li>
            );
          })}
        </ul>
      </motion.section>

      {/* Recent experiences */}
      {recentExperiences.length > 0 && (
        <motion.section
          ref={recentRef}
          aria-labelledby="recent-heading"
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
          animate={recentInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease, delay: 0.1 }}
          className="pb-4"
        >
          <h2
            id="recent-heading"
            className="text-zinc-500 text-xs font-semibold uppercase tracking-widest mb-3"
          >
            Recently explored
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentExperiences.map((exp, i) => (
              <motion.li
                key={exp.id}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
                animate={recentInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease, delay: 0.15 + Math.min(i * 0.05, 0.35) }}
                whileHover={shouldReduceMotion ? {} : { y: -4 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
              >
                <Link
                  href={`/dashboard/experience/${exp.id}`}
                  className="group block rounded-2xl overflow-hidden border border-white/[0.09] hover:border-white/25 bg-zinc-900 shadow-lg shadow-black/30 transition-colors duration-300 h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
                >
                  <div className="relative h-44 overflow-hidden bg-zinc-800">
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
                      <h3 className="font-[family-name:var(--font-heading)] text-sm font-bold text-white group-hover:text-brand-green transition-colors duration-200 leading-snug line-clamp-2">
                        {exp.title}
                      </h3>
                    </div>
                  </div>
                  {(exp.price || exp.duration) && (
                    <div className="flex items-center gap-4 px-4 py-3 flex-wrap">
                      {exp.price && (
                        <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                          <Banknote className="w-3.5 h-3.5 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                          <span>{exp.price}</span>
                        </div>
                      )}
                      {exp.duration && (
                        <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                          <Clock className="w-3.5 h-3.5 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                          <span>{exp.duration}</span>
                        </div>
                      )}
                    </div>
                  )}
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.section>
      )}

    </div>
  );
}
