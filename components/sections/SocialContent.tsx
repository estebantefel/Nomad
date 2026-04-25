"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Plus, Users, Flame, MapPin, Calendar, Clock,
  Search, UserPlus, ChevronRight,
} from "lucide-react";

interface GroupActivity {
  id: string;
  title: string;
  category: string;
  categoryColor: string;
  location: string;
  date: string;
  time: string;
  attendees: number;
  maxAttendees: number;
  host: { name: string; initials: string; color: string };
}

interface FriendActivity {
  id: string;
  friend: { name: string; initials: string; color: string };
  type: "completed" | "upcoming";
  experience: string;
  location: string;
  when: string;
}

interface SuggestedFriend {
  name: string;
  initials: string;
  color: string;
  mutuals: number;
}

const groupActivities: GroupActivity[] = [
  {
    id: "1",
    title: "Retiro Park Morning Run",
    category: "Outdoor",
    categoryColor: "#059669",
    location: "Parque del Retiro",
    date: "Sat 3 May",
    time: "8:00 AM",
    attendees: 4,
    maxAttendees: 8,
    host: { name: "Miguel Torres", initials: "MT", color: "#3b82f6" },
  },
  {
    id: "2",
    title: "Flamenco Night at Casa Patas",
    category: "Culture",
    categoryColor: "#f97316",
    location: "Casa Patas, Lavapiés",
    date: "Fri 2 May",
    time: "9:30 PM",
    attendees: 3,
    maxAttendees: 6,
    host: { name: "Laura Sánchez", initials: "LS", color: "#f97316" },
  },
  {
    id: "3",
    title: "La Latina Tapas Crawl",
    category: "Food",
    categoryColor: "#facc15",
    location: "La Latina, Madrid",
    date: "Sun 4 May",
    time: "7:00 PM",
    attendees: 6,
    maxAttendees: 10,
    host: { name: "Rafa Delgado", initials: "RD", color: "#facc15" },
  },
];

const friendActivities: FriendActivity[] = [
  {
    id: "1",
    friend: { name: "Miguel Torres", initials: "MT", color: "#3b82f6" },
    type: "completed",
    experience: "Visit Museo Reina Sofía",
    location: "Atocha",
    when: "2h ago",
  },
  {
    id: "2",
    friend: { name: "Laura Sánchez", initials: "LS", color: "#f97316" },
    type: "upcoming",
    experience: "El Rastro flea market",
    location: "La Latina",
    when: "Tomorrow, 10:00 AM",
  },
  {
    id: "3",
    friend: { name: "Rafa Delgado", initials: "RD", color: "#facc15" },
    type: "completed",
    experience: "Tapas at Mercado de San Miguel",
    location: "Sol",
    when: "Yesterday",
  },
  {
    id: "4",
    friend: { name: "Isabel Moreno", initials: "IM", color: "#8b5cf6" },
    type: "upcoming",
    experience: "Guided tour of Palacio Real",
    location: "Opera",
    when: "Sat 3 May",
  },
];

const suggestedFriends: SuggestedFriend[] = [
  { name: "Carla Reyes",  initials: "CR", color: "#ec4899", mutuals: 3 },
  { name: "Jorge Molina", initials: "JM", color: "#06b6d4", mutuals: 2 },
  { name: "Sofía Vega",   initials: "SV", color: "#84cc16", mutuals: 1 },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function SocialContent() {
  const [friendsTab, setFriendsTab] = useState<"activity" | "find">("activity");
  const [findQuery, setFindQuery] = useState("");
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="px-5 py-8 md:px-8">

      {/* Host an Activity CTA */}
      <motion.div
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease, delay: 0.05 }}
        className="relative overflow-hidden rounded-2xl border border-brand-green/20 bg-brand-green/[0.06] p-5 md:p-6 mb-8"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-brand-green/10 via-transparent to-transparent pointer-events-none" />
        <div className="relative flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold text-brand-green uppercase tracking-widest mb-1">Community</p>
            <h2 className="font-[family-name:var(--font-heading)] text-white text-lg font-bold leading-snug mb-1.5">
              Host an experience
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
              Create a group activity and invite friends to join you in Madrid.
            </p>
          </div>
          <motion.button
            whileHover={shouldReduceMotion ? {} : { scale: 1.04 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
            className="shrink-0 flex items-center gap-2 bg-brand-green text-black text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors duration-200 hover:bg-brand-green/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] min-h-[44px]"
          >
            <Plus className="w-4 h-4" strokeWidth={2.25} />
            Create
          </motion.button>
        </div>
      </motion.div>

      {/* Group Activities */}
      <motion.section
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease, delay: 0.12 }}
        aria-labelledby="group-activities-heading"
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-[#3b82f6]" strokeWidth={1.75} />
            <h2 id="group-activities-heading" className="font-[family-name:var(--font-heading)] text-white text-base font-bold">
              Group Activities
            </h2>
          </div>
          <button className="flex items-center gap-0.5 text-xs text-zinc-500 hover:text-brand-green transition-colors duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-brand-green/60 focus-visible:rounded-sm min-h-[44px] px-1">
            See all <ChevronRight className="w-3 h-3" />
          </button>
        </div>
        <ul className="space-y-3">
          {groupActivities.map((activity, i) => (
            <motion.li
              key={activity.id}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease, delay: 0.18 + i * 0.08 }}
              className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-4 hover:bg-white/[0.05] hover:border-white/[0.12] transition-all duration-200"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="mb-1.5">
                    <span
                      className="inline-flex text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border"
                      style={{
                        color: activity.categoryColor,
                        borderColor: `${activity.categoryColor}40`,
                        backgroundColor: `${activity.categoryColor}15`,
                      }}
                    >
                      {activity.category}
                    </span>
                  </div>
                  <h3 className="text-white text-sm font-semibold leading-snug mb-2">{activity.title}</h3>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 shrink-0" strokeWidth={1.75} />
                      {activity.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 shrink-0" strokeWidth={1.75} />
                      {activity.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 shrink-0" strokeWidth={1.75} />
                      {activity.time}
                    </span>
                  </div>
                </div>
                <motion.button
                  whileHover={shouldReduceMotion ? {} : { scale: 1.04 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                  className="shrink-0 text-xs font-semibold text-brand-green border border-brand-green/30 px-3 py-1.5 rounded-lg hover:bg-brand-green/10 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/60 focus-visible:ring-offset-1 focus-visible:ring-offset-[#0a0a0a] min-h-[44px]"
                >
                  Join
                </motion.button>
              </div>
              <div className="mt-3 pt-3 border-t border-white/[0.05] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold text-black shrink-0"
                    style={{ backgroundColor: activity.host.color }}
                    aria-hidden="true"
                  >
                    {activity.host.initials}
                  </div>
                  <span className="text-xs text-zinc-500">
                    Hosted by <span className="text-zinc-400">{activity.host.name}</span>
                  </span>
                </div>
                <span className="text-xs text-zinc-500">
                  <span className="text-zinc-300 font-medium">{activity.attendees}</span>/{activity.maxAttendees} going
                </span>
              </div>
            </motion.li>
          ))}
        </ul>
      </motion.section>

      {/* Friends */}
      <motion.section
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease, delay: 0.22 }}
        aria-labelledby="friends-heading"
        className="mb-8"
      >
        {/* Header row: heading + inline search bar */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-2 shrink-0">
            <Flame className="w-4 h-4 text-brand-orange" strokeWidth={1.75} />
            <h2 id="friends-heading" className="font-[family-name:var(--font-heading)] text-white text-base font-bold">
              Friends
            </h2>
          </div>
          <div className="relative flex-1 min-w-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600 pointer-events-none" strokeWidth={1.75} />
            <input
              type="search"
              value={findQuery}
              onChange={(e) => {
                setFindQuery(e.target.value);
                if (e.target.value) setFriendsTab("find");
              }}
              onFocus={() => setFriendsTab("find")}
              placeholder="Find friends..."
              aria-label="Search for friends by name"
              className="w-full bg-white/[0.04] border border-white/[0.07] rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/60 focus-visible:ring-offset-1 focus-visible:ring-offset-[#0a0a0a] focus-visible:border-brand-green/20 transition-colors duration-200"
            />
          </div>
        </div>

        {/* Tabs */}
        <div
          className="flex gap-0 border-b border-white/[0.07] mb-4"
          role="tablist"
          aria-label="Friends view"
        >
          {([
            { key: "activity", label: "Activity" },
            { key: "find",     label: "Add Friends" },
          ] as const).map((t) => (
            <button
              key={t.key}
              role="tab"
              aria-selected={friendsTab === t.key}
              aria-controls={`friends-panel-${t.key}`}
              onClick={() => setFriendsTab(t.key)}
              className={`relative px-4 py-2 text-xs font-semibold transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/60 focus-visible:rounded-t-sm ${
                friendsTab === t.key ? "text-white" : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {t.label}
              {friendsTab === t.key && (
                <motion.span
                  layoutId="friends-tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-px bg-brand-green"
                  transition={{ duration: 0.25, ease }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Tab panels */}
        <AnimatePresence mode="wait">
          {friendsTab === "activity" ? (
            <motion.div
              key="activity"
              id="friends-panel-activity"
              role="tabpanel"
              aria-labelledby="tab-activity"
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -4 }}
              transition={{ duration: 0.2, ease }}
            >
              <ul className="space-y-2">
                {friendActivities.map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, ease, delay: i * 0.06 }}
                    className="flex items-center gap-3 px-3.5 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05] transition-all duration-200"
                  >
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-black shrink-0"
                      style={{ backgroundColor: item.friend.color }}
                      aria-hidden="true"
                    >
                      {item.friend.initials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-zinc-300 leading-snug">
                        <span className="text-white font-medium">{item.friend.name}</span>
                        {item.type === "completed" ? " visited " : " is heading to "}
                        <span className="text-zinc-200">{item.experience}</span>
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-zinc-600 flex items-center gap-1">
                          <MapPin className="w-2.5 h-2.5 shrink-0" strokeWidth={1.75} />
                          {item.location}
                        </span>
                        <span className="text-zinc-700" aria-hidden="true">·</span>
                        <span className="text-xs text-zinc-600">{item.when}</span>
                      </div>
                    </div>
                    <span
                      className={`shrink-0 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        item.type === "completed"
                          ? "text-brand-green bg-brand-green/10"
                          : "text-[#3b82f6] bg-[#3b82f6]/10"
                      }`}
                    >
                      {item.type === "completed" ? "Done" : "Soon"}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ) : (
            <motion.div
              key="find"
              id="friends-panel-find"
              role="tabpanel"
              aria-labelledby="tab-find"
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -4 }}
              transition={{ duration: 0.2, ease }}
            >
              <p className="text-[10px] text-zinc-600 uppercase tracking-widest font-semibold mb-3">
                Suggested
              </p>
              <ul className="space-y-2">
                {suggestedFriends.map((person, i) => (
                  <motion.li
                    key={person.name}
                    initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease, delay: i * 0.07 }}
                    className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]"
                  >
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-black shrink-0"
                      style={{ backgroundColor: person.color }}
                      aria-hidden="true"
                    >
                      {person.initials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-white font-medium leading-tight">{person.name}</p>
                      <p className="text-xs text-zinc-600 mt-0.5">{person.mutuals} mutual friends</p>
                    </div>
                    <motion.button
                      whileHover={shouldReduceMotion ? {} : { scale: 1.04 }}
                      whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                      aria-label={`Add ${person.name} as a friend`}
                      className="shrink-0 flex items-center gap-1.5 text-xs font-semibold text-[#3b82f6] border border-[#3b82f6]/30 px-3 py-1.5 rounded-lg hover:bg-[#3b82f6]/10 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]/60 focus-visible:ring-offset-1 focus-visible:ring-offset-[#0a0a0a] min-h-[44px]"
                    >
                      <UserPlus className="w-3 h-3" strokeWidth={2} />
                      Add
                    </motion.button>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>

    </div>
  );
}
