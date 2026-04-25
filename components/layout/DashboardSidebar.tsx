"use client";

import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { Home, Compass, Users, User, Flame } from "lucide-react";

const navItems = [
  { label: "Home",    href: "/dashboard",   icon: Home    },
  { label: "Explore", href: "/dashboard/explore", icon: Compass },
  { label: "Social",  href: "/social",      icon: Users   },
  { label: "Profile", href: "/profile",     icon: User    },
];

const STREAK_DAYS = 14;
const ease = [0.22, 1, 0.36, 1] as const;

export default function DashboardSidebar() {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  const isActive = (href: string) =>
    pathname === href || (href !== "/dashboard" && pathname.startsWith(href));

  return (
    <>
    {/* Desktop sidebar */}
    <nav className="hidden lg:flex flex-col h-screen sticky top-0 w-[260px] shrink-0 bg-[#0a0a0a] border-r border-white/[0.07] px-5 py-8">

      <motion.div
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease, delay: 0.05 }}
        className="font-[family-name:var(--font-heading)] text-white text-xl font-bold tracking-tight select-none px-3"
      >
        Nomad
      </motion.div>

      <ul className="mt-10 flex-1 space-y-1">
        {navItems.map((item, i) => {
          const active = isActive(item.href);
          return (
            <motion.li
              key={item.href}
              initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease, delay: 0.15 + i * 0.06 }}
            >
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors duration-200 ${
                  active
                    ? "text-brand-green bg-brand-green/10"
                    : "text-zinc-400 hover:text-white hover:bg-white/[0.05]"
                }`}
              >
                <item.icon className="w-4 h-4 shrink-0" strokeWidth={1.75} />
                {item.label}
              </Link>
            </motion.li>
          );
        })}
      </ul>

      <motion.div
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease, delay: 0.45 }}
        className="mt-auto bg-white/[0.04] border border-white/[0.07] rounded-2xl px-4 py-4"
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-brand-orange/15 border border-brand-orange/20 shrink-0">
            <Flame className="w-4 h-4 text-brand-orange" />
          </div>
          <div className="min-w-0">
            <p className="text-white text-sm font-semibold leading-tight">{STREAK_DAYS}-day streak</p>
            <p className="text-zinc-500 text-xs mt-0.5">Keep it going!</p>
          </div>
          <span className="ml-auto font-[family-name:var(--font-heading)] text-2xl font-bold text-brand-orange shrink-0">
            {STREAK_DAYS}
          </span>
        </div>
        <div className="flex gap-1.5 mt-3">
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-1.5 rounded-full ${
                i < (STREAK_DAYS % 7 || 7) ? "bg-brand-orange" : "bg-zinc-800"
              }`}
            />
          ))}
        </div>
      </motion.div>
    </nav>

    {/* Mobile bottom tab bar */}
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0a0a0a]/95 backdrop-blur border-t border-white/[0.07] flex items-stretch h-16 safe-area-pb">
      {navItems.map((item) => {
        const active = isActive(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`flex-1 flex flex-col items-center justify-center gap-1 min-h-[44px] transition-colors duration-200 ${
              active ? "text-brand-green" : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <item.icon className="w-5 h-5 shrink-0" strokeWidth={1.75} />
            <span className="text-[10px] font-medium leading-none">{item.label}</span>
          </Link>
        );
      })}
    </nav>
    </>
  );
}
