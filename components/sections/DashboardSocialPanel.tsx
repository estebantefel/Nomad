"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";
import Link from "next/link";
import { Trophy, Flame, ChevronRight } from "lucide-react";

interface Friend {
  name: string;
  initials: string;
  color: string;
  streak: number;
  rank: number;
  isMe?: boolean;
}

const friends: Friend[] = [
  { name: "Miguel Torres",  initials: "MT", color: "#3b82f6", streak: 21, rank: 1 },
  { name: "Laura Sánchez",  initials: "LS", color: "#f97316", streak: 18, rank: 2 },
  { name: "Ana García",     initials: "AG", color: "#059669", streak: 14, rank: 3, isMe: true },
  { name: "Rafa Delgado",   initials: "RD", color: "#facc15", streak:  9, rank: 4 },
];

const rankColors: Record<number, string> = {
  1: "text-brand-yellow",
  2: "text-zinc-400",
  3: "text-brand-orange",
};

const ease = [0.22, 1, 0.36, 1] as const;

export default function DashboardSocialPanel() {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className="flex flex-col gap-5 px-5 py-8">

      <motion.div
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease, delay: 0.05 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-brand-yellow" strokeWidth={1.75} />
          <h2 className="font-[family-name:var(--font-heading)] text-white text-base font-bold">Friends</h2>
        </div>
        <Link
          href="/social"
          className="flex items-center gap-0.5 text-xs text-zinc-500 hover:text-brand-green transition-colors duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-brand-green/60 focus-visible:rounded-sm"
        >
          View all <ChevronRight className="w-3 h-3" />
        </Link>
      </motion.div>

      <ul className="space-y-2">
        {friends.map((friend, i) => (
          <motion.li
            key={friend.name}
            aria-current={friend.isMe ? "true" : undefined}
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 12 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, ease, delay: 0.1 + i * 0.08 }}
            className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-colors duration-200 ${
              friend.isMe
                ? "bg-brand-green/[0.07] border border-brand-green/20"
                : "hover:bg-white/[0.04]"
            }`}
          >
            <span className={`w-5 text-center text-xs font-bold shrink-0 ${rankColors[friend.rank] ?? "text-zinc-600"}`}>
              {friend.rank}
            </span>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-black select-none shrink-0 ${
                friend.isMe ? "ring-2 ring-brand-green ring-offset-1 ring-offset-[#0a0a0a]" : ""
              }`}
              style={{ backgroundColor: friend.color }}
            >
              {friend.initials}
            </div>
            <div className="min-w-0 flex-1">
              <p className={`text-sm font-medium leading-tight truncate ${friend.isMe ? "text-white" : "text-zinc-300"}`}>
                {friend.name}
                {friend.isMe && <span className="text-brand-green text-xs ml-1.5">you</span>}
              </p>
              <p className="text-xs text-zinc-600 mt-0.5">{friend.streak} day streak</p>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <Flame className={`w-3.5 h-3.5 ${friend.isMe ? "text-brand-green" : "text-brand-orange"}`} />
              <span className={`text-sm font-bold ${friend.isMe ? "text-brand-green" : "text-white"}`}>
                {friend.streak}
              </span>
            </div>
          </motion.li>
        ))}
      </ul>

      <motion.div
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease, delay: 0.5 }}
        className="bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3.5"
      >
        <p className="text-zinc-500 text-xs leading-relaxed">
          Miguel is 7 days ahead. Can you catch up this week?
        </p>
        <Link
          href="/social"
          className="mt-2.5 inline-flex items-center gap-1 text-brand-green text-xs font-semibold hover:text-brand-green/80 transition-colors duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-brand-green/60 focus-visible:rounded-sm"
        >
          See full leaderboard <ChevronRight className="w-3 h-3" />
        </Link>
      </motion.div>
    </div>
  );
}
