"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff, Flame, CheckCircle2 } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const router = useRouter();

  const panelVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.9, ease: "easeOut" as const } },
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.07,
        delayChildren: 0.25,
      },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
  };

  const streakPerks = [
    "New Madrid experiences every week",
    "Streak tracking with your friends",
    "Rewards for completing challenges",
  ];

  return (
    <main className="min-h-screen bg-[#0a0a0a] flex overflow-hidden">

      {/* ── Left panel: atmospheric Madrid ── */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={panelVariants}
        className="hidden lg:flex relative lg:w-[52%] xl:w-[55%] flex-shrink-0"
      >
        <Image
          src="/images/royal-palace-of-madrid.jpg"
          alt="Royal Palace of Madrid at dusk"
          fill
          className="object-cover object-center"
          priority
        />

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30" />
        {/* Subtle green bleed at bottom edge */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-brand-green/8 to-transparent pointer-events-none" />

        {/* Left content */}
        <div className="relative z-10 flex flex-col justify-between h-full p-12 xl:p-16">

          {/* Wordmark */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.1 }}
            className="font-[family-name:var(--font-heading)] text-white text-2xl font-bold tracking-tight select-none"
          >
            Nomad
          </motion.div>

          {/* Hero statement */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {/* Eyebrow */}
            <motion.div variants={fadeUp} className="flex items-center gap-2.5 mb-7">
              <div className="flex items-center gap-1.5 bg-brand-green/15 border border-brand-green/25 rounded-full px-3.5 py-1.5">
                <Flame className="w-3.5 h-3.5 text-brand-green" />
                <span className="text-brand-green text-xs font-semibold tracking-wide uppercase">
                  Start your streak today
                </span>
              </div>
            </motion.div>

            {/* Main headline */}
            <motion.h1
              variants={fadeUp}
              className="font-[family-name:var(--font-heading)] text-5xl xl:text-[3.75rem] font-bold text-white leading-[1.04] tracking-tight"
            >
              Madrid is waiting.
              <br />
              <span className="text-white/70">Are you?</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 text-white/50 text-lg leading-relaxed max-w-xs xl:max-w-sm"
            >
              Discover the city. Build your streak. Beat your friends.
            </motion.p>

            {/* Perks list */}
            <motion.ul variants={fadeUp} className="mt-8 space-y-3">
              {streakPerks.map((perk) => (
                <li key={perk} className="flex items-center gap-3 text-white/60 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-brand-green flex-shrink-0" strokeWidth={2} />
                  {perk}
                </li>
              ))}
            </motion.ul>

            {/* Streak preview card */}
            <motion.div
              variants={fadeUp}
              className="mt-10 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl px-5 py-4"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-brand-green/15 border border-brand-green/20">
                  <Flame className="w-4 h-4 text-brand-green" />
                </div>
                <div>
                  <p className="text-white text-sm font-semibold leading-tight">Build a 7-day streak</p>
                  <p className="text-white/40 text-xs mt-0.5">One Madrid experience · every day</p>
                </div>
              </div>
              <div className="flex gap-1.5">
                {[...Array(7)].map((_, i) => (
                  <div
                    key={i}
                    className={`flex-1 h-1.5 rounded-full ${
                      i === 0
                        ? "bg-brand-green/40 border border-brand-green/30"
                        : "bg-white/[0.08]"
                    }`}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-brand-green/60 text-[10px] font-medium">Day 1 · starts here</span>
                <span className="text-white/25 text-[10px]">Day 7</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex items-center gap-3"
          >
            <div className="flex -space-x-2.5">
              {[
                { letter: "A", color: "#059669" },
                { letter: "M", color: "#3b82f6" },
                { letter: "L", color: "#f97316" },
                { letter: "R", color: "#facc15" },
              ].map(({ letter, color }) => (
                <div
                  key={letter}
                  className="w-8 h-8 rounded-full border-2 border-[#0a0a0a] flex items-center justify-center text-xs font-bold text-black select-none"
                  style={{ backgroundColor: color }}
                >
                  {letter}
                </div>
              ))}
            </div>
            <p className="text-white/35 text-sm">
              <span className="text-white/60 font-medium">2,400+ explorers</span> in Madrid
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Right panel: form ── */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-12 lg:px-14 xl:px-20 py-12 overflow-y-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-[420px] w-full mx-auto"
        >
          {/* Mobile wordmark */}
          <motion.div
            variants={fadeUp}
            className="lg:hidden mb-10 font-[family-name:var(--font-heading)] text-white text-2xl font-bold tracking-tight"
          >
            Nomad
          </motion.div>

          {/* Heading */}
          <motion.div variants={fadeUp} className="mb-9">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-[2.15rem] font-bold text-white tracking-tight leading-tight">
              Create your account
            </h2>
            <p className="mt-3 text-white/40 text-[0.9375rem]">
              Already exploring?{" "}
              <Link
                href="/login"
                className="text-brand-green hover:text-brand-green/80 transition-colors duration-150 font-medium"
              >
                Sign in
              </Link>
            </p>
          </motion.div>

          <form className="space-y-5" noValidate onSubmit={(e) => { e.preventDefault(); router.push("/dashboard"); }}>

            {/* Full name */}
            <motion.div variants={fadeUp}>
              <label
                htmlFor="name"
                className="block text-[0.6875rem] font-semibold text-white/35 uppercase tracking-[0.1em] mb-2"
              >
                Full name
              </label>
              <input
                id="name"
                type="text"
                autoComplete="name"
                placeholder="Ana García"
                className="w-full bg-white/[0.04] border border-white/[0.09] rounded-xl px-4 py-3.5 text-white text-[0.9375rem] placeholder:text-white/20
                  focus:outline-none focus:border-brand-green/50 focus:bg-white/[0.06] focus:ring-1 focus:ring-brand-green/20
                  transition-all duration-200 autofill:bg-transparent"
              />
            </motion.div>

            {/* Email */}
            <motion.div variants={fadeUp}>
              <label
                htmlFor="email"
                className="block text-[0.6875rem] font-semibold text-white/35 uppercase tracking-[0.1em] mb-2"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="ana@madrid.es"
                className="w-full bg-white/[0.04] border border-white/[0.09] rounded-xl px-4 py-3.5 text-white text-[0.9375rem] placeholder:text-white/20
                  focus:outline-none focus:border-brand-green/50 focus:bg-white/[0.06] focus:ring-1 focus:ring-brand-green/20
                  transition-all duration-200"
              />
            </motion.div>

            {/* Password */}
            <motion.div variants={fadeUp}>
              <label
                htmlFor="password"
                className="block text-[0.6875rem] font-semibold text-white/35 uppercase tracking-[0.1em] mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Min. 8 characters"
                  className="w-full bg-white/[0.04] border border-white/[0.09] rounded-xl px-4 py-3.5 pr-12 text-white text-[0.9375rem] placeholder:text-white/20
                    focus:outline-none focus:border-brand-green/50 focus:bg-white/[0.06] focus:ring-1 focus:ring-brand-green/20
                    transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-white/25 hover:text-white/55 transition-colors duration-150 rounded-md focus:outline-none focus:ring-1 focus:ring-white/20"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div variants={fadeUp} className="pt-1">
              <button
                type="submit"
                className="w-full bg-brand-green text-white font-semibold text-[0.9375rem] rounded-xl py-[0.9375rem]
                  hover:bg-brand-green-deep active:scale-[0.98] transition-all duration-200
                  focus:outline-none focus:ring-2 focus:ring-brand-green/40 focus:ring-offset-2 focus:ring-offset-[#0a0a0a]
                  flex items-center justify-center gap-2.5 shadow-lg shadow-brand-green/15"
              >
                <Flame className="w-4 h-4" />
                Build your streak
              </button>
            </motion.div>

            {/* Divider */}
            <motion.div variants={fadeUp} className="relative py-1">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/[0.07]" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-[#0a0a0a] px-4 text-[0.6875rem] text-white/20 uppercase tracking-[0.12em]">
                  or
                </span>
              </div>
            </motion.div>

            {/* Google */}
            <motion.div variants={fadeUp}>
              <button
                type="button"
                className="w-full bg-white/[0.04] border border-white/[0.09] text-white/80 font-medium text-[0.9375rem] rounded-xl py-3.5
                  hover:bg-white/[0.08] hover:border-white/[0.14] transition-all duration-200
                  focus:outline-none focus:ring-1 focus:ring-white/20
                  flex items-center justify-center gap-3"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Continue with Google
              </button>
            </motion.div>
          </form>

          {/* Fine print */}
          <motion.p
            variants={fadeUp}
            className="mt-8 text-[0.75rem] text-white/18 text-center leading-relaxed"
          >
            By creating an account you agree to our{" "}
            <Link href="/terms" className="underline underline-offset-2 hover:text-white/40 transition-colors duration-150">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline underline-offset-2 hover:text-white/40 transition-colors duration-150">
              Privacy Policy
            </Link>
            .
          </motion.p>
        </motion.div>
      </div>
    </main>
  );
}
