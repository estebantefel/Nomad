"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";
import { Trophy, Flame } from "lucide-react";

interface LeaderboardEntry {
  rank: number;
  name: string;
  initials: string;
  color: string;
  streak: number;
  points: number;
  isMe?: boolean;
}

const globalLeaderboard: LeaderboardEntry[] = [
  { rank: 1, name: "Miguel Torres",  initials: "MT", color: "#3b82f6", streak: 21, points: 2840 },
  { rank: 2, name: "Laura Sánchez",  initials: "LS", color: "#f97316", streak: 18, points: 2410 },
  { rank: 3, name: "Ana García",     initials: "AG", color: "#059669", streak: 14, points: 1920, isMe: true },
  { rank: 4, name: "Rafa Delgado",   initials: "RD", color: "#facc15", streak:  9, points: 1340 },
  { rank: 5, name: "Isabel Moreno",  initials: "IM", color: "#8b5cf6", streak:  7, points:  980 },
  { rank: 6, name: "Carlos Ruiz",    initials: "CR", color: "#ec4899", streak:  5, points:  720 },
];

const friendsLeaderboard: LeaderboardEntry[] = [
  { rank: 1, name: "Miguel Torres",  initials: "MT", color: "#3b82f6", streak: 21, points: 2840 },
  { rank: 2, name: "Laura Sánchez",  initials: "LS", color: "#f97316", streak: 18, points: 2410 },
  { rank: 3, name: "Ana García",     initials: "AG", color: "#059669", streak: 14, points: 1920, isMe: true },
  { rank: 4, name: "Rafa Delgado",   initials: "RD", color: "#facc15", streak:  9, points: 1340 },
];

const rankColors: Record<number, string> = {
  1: "text-brand-yellow",
  2: "text-zinc-400",
  3: "text-brand-orange",
};

const ease = [0.22, 1, 0.36, 1] as const;

export default function SocialLeaderboard() {
  const [tab, setTab] = useState<"global" | "friends">("global");
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  const entries = tab === "global" ? globalLeaderboard : friendsLeaderboard;

  return (
    <div ref={ref} className="flex flex-col gap-5 px-5 py-8">

      <motion.div
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease, delay: 0.05 }}
        className="flex items-center gap-2"
      >
        <Trophy className="w-4 h-4 text-brand-yellow" strokeWidth={1.75} />
        <h2 className="font-[family-name:var(--font-heading)] text-white text-base font-bold">Leaderboard</h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease, delay: 0.1 }}
        className="flex bg-white/[0.04] border border-white/[0.07] rounded-xl p-1"
        role="tablist"
        aria-label="Leaderboard filter"
      >
        {(["global", "friends"] as const).map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
            className={`flex-1 text-xs font-semibold capitalize py-1.5 rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/60 min-h-[44px] ${
              tab === t
                ? "bg-white/[0.08] text-white"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            {t}
          </button>
        ))}
      </motion.div>

      <ul className="space-y-1.5">
        {entries.map((entry, i) => (
          <motion.li
            key={entry.name}
            aria-current={entry.isMe ? "true" : undefined}
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 12 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, ease, delay: 0.15 + i * 0.07 }}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors duration-200 ${
              entry.isMe
                ? "bg-brand-green/[0.07] border border-brand-green/20"
                : "hover:bg-white/[0.04]"
            }`}
          >
            <span
              className={`w-5 text-center text-xs font-bold shrink-0 ${rankColors[entry.rank] ?? "text-zinc-600"}`}
              aria-label={`Rank ${entry.rank}`}
            >
              {entry.rank}
            </span>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-black select-none shrink-0 ${
                entry.isMe ? "ring-2 ring-brand-green ring-offset-1 ring-offset-[#0a0a0a]" : ""
              }`}
              style={{ backgroundColor: entry.color }}
              aria-hidden="true"
            >
              {entry.initials}
            </div>
            <div className="min-w-0 flex-1">
              <p className={`text-sm font-medium leading-tight truncate ${entry.isMe ? "text-white" : "text-zinc-300"}`}>
                {entry.name}
                {entry.isMe && (
                  <span className="text-brand-green text-xs ml-1.5" aria-label="(you)">you</span>
                )}
              </p>
              <p className="text-xs text-zinc-600 mt-0.5 tabular-nums">
                {entry.points.toLocaleString()} pts
              </p>
            </div>
            <div className="flex items-center gap-1 shrink-0" aria-label={`${entry.streak} day streak`}>
              <Flame
                className={`w-3.5 h-3.5 ${entry.isMe ? "text-brand-green" : "text-brand-orange"}`}
                aria-hidden="true"
              />
              <span className={`text-sm font-bold tabular-nums ${entry.isMe ? "text-brand-green" : "text-white"}`}>
                {entry.streak}
              </span>
            </div>
          </motion.li>
        ))}
      </ul>

      <motion.div
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease, delay: 0.65 }}
        className="bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3.5"
      >
        <p className="text-zinc-500 text-xs leading-relaxed">
          Miguel is 7 days ahead. Two more experiences this week and you close the gap.
        </p>
      </motion.div>

    </div>
  );
}
