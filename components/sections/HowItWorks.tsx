"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Every week, a new experience",
    description: "Nomad picks something happening in Madrid you haven't done yet.",
  },
  {
    number: "02",
    title: "Go and do it",
    description: "Show up, explore, check it in.",
  },
  {
    number: "03",
    title: "Build your streak, beat your friends",
    description: "Keep your streak alive and climb the leaderboard.",
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section ref={sectionRef} className="relative z-10 bg-white">
      <div className="max-w-5xl mx-auto px-16 py-32">

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="text-xs font-semibold tracking-[0.2em] uppercase text-zinc-400"
        >
          How it works
        </motion.p>

        <ul className="mt-12">
          {steps.map((step, i) => (
            <motion.li
              key={step.number}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
            >
              <div className="border-t border-zinc-200 py-10 grid grid-cols-[80px_1fr_auto] gap-8 items-center group">
                <span className="font-[family-name:var(--font-heading)] text-sm font-semibold text-zinc-500">
                  {step.number}
                </span>
                <h2 className="font-[family-name:var(--font-heading)] text-4xl font-bold text-zinc-900 leading-tight tracking-tight group-hover:text-zinc-600 transition-colors duration-300">
                  {step.title}
                </h2>
                <p className="text-zinc-500 text-base leading-relaxed max-w-xs text-right">
                  {step.description}
                </p>
              </div>
            </motion.li>
          ))}
          <div className="border-t border-zinc-200" />
        </ul>

      </div>
    </section>
  );
}
