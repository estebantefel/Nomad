"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const dimOpacity = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [0, 0.85]
  );

  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.4],
    shouldReduceMotion ? [1, 1] : [1, 0]
  );

  const contentY = useTransform(
    scrollYProgress,
    [0, 0.4],
    shouldReduceMotion ? [0, 0] : [0, -40]
  );

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
  });

  return (
    <section
      ref={sectionRef}
      className="sticky top-0 z-0 relative min-h-screen flex items-center overflow-hidden"
    >
      <Image
        src="/images/royal-palace-of-madrid.jpg"
        alt="Royal Palace of Madrid"
        fill
        className="object-cover object-center"
        priority
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10" />

      {/* Scroll-driven dim overlay */}
      <motion.div
        className="absolute inset-0 bg-black pointer-events-none"
        style={{ opacity: dimOpacity }}
      />

      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-16 text-center"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        <motion.h1
          {...fadeUp(0)}
          className="font-[family-name:var(--font-heading)] text-9xl font-bold text-white leading-none tracking-tight"
        >
          Madrid never
          <br />
          repeats itself.
        </motion.h1>

        <motion.p
          {...fadeUp(0.18)}
          className="mt-8 text-xl text-white/60 max-w-lg mx-auto leading-relaxed"
        >
          Discover new places, build your streak, and beat your friends.
        </motion.p>

        <motion.div {...fadeUp(0.34)} className="mt-10 flex justify-center">
          <Link
            href="/signup"
            className="inline-flex items-center px-10 py-4 bg-brand-green text-white font-semibold text-base rounded-full hover:bg-brand-green-deep transition-colors duration-200"
          >
            Build your streak
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
