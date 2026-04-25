"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock, Euro } from "lucide-react";

interface Experience {
  id: string;
  name: string;
  street: string;
  duration: string;
  price: string;
  image: string;
  badge?: { label: string; variant: "pick" | "urgent" };
}

const experiences: Experience[] = [
  {
    id: "prado",
    name: "Visit Museo del Prado",
    street: "Calle de Ruiz de Alarcón, 23",
    duration: "2–3 hours",
    price: "Free – €15",
    image: "/images/experiences/Museo del prado.jpg",
    badge: { label: "This week's pick", variant: "pick" },
  },
  {
    id: "rastro",
    name: "El Rastro flea market",
    street: "Calle de la Ribera de Curtidores",
    duration: "Sunday morning",
    price: "Free",
    image: "/images/experiences/El rastro.jpg",
    badge: { label: "Only this Sunday", variant: "urgent" },
  },
  {
    id: "retiro",
    name: "Paddleboating in Retiro",
    street: "Parque del Retiro",
    duration: "1 hour",
    price: "€6",
    image: "/images/experiences/RETIRO WATERBOARD.jpeg",
  },
];

function BadgePill({ label, variant }: { label: string; variant: "pick" | "urgent" }) {
  return (
    <span
      className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold text-white ${
        variant === "pick" ? "bg-brand-green" : "bg-brand-orange"
      }`}
    >
      {label}
    </span>
  );
}

export default function ExperiencesGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section ref={sectionRef} className="relative z-10 py-32 bg-black">
      <div className="max-w-7xl mx-auto px-8">

        <motion.h2
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl lg:text-7xl font-bold text-white tracking-tight leading-none px-4 lg:px-8"
        >
          This week in Madrid
        </motion.h2>

        <div className="mt-12 flex items-stretch gap-6">

          {/* Left dot grid — desktop only */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
            className="hidden lg:block w-16 shrink-0 self-stretch rounded-xl"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)",
              backgroundSize: "18px 18px",
            }}
          />

          {/* Cards */}
          <ul className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {experiences.map((exp, i) => (
              <motion.li
                key={exp.id}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 28 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.1 + i * 0.12,
                }}
              >
                <Link
                  href="/signup"
                  className="group block rounded-2xl overflow-hidden border border-white/20 hover:border-white/40 transition-all duration-300 shadow-lg shadow-black/50"
                >
                  <div className="relative h-64 bg-black overflow-hidden">
                    <Image
                      src={exp.image}
                      alt={exp.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {exp.badge && <BadgePill label={exp.badge.label} variant={exp.badge.variant} />}
                  </div>

                  <div className="p-6 bg-zinc-900 transition-transform duration-200 group-hover:-translate-y-1">
                    <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-white leading-snug group-hover:text-brand-green transition-colors duration-300">
                      {exp.name}
                    </h2>
                    <div className="mt-4 flex flex-col gap-2.5">
                      <div className="flex items-center gap-2 text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors duration-300">
                        <MapPin className="w-3.5 h-3.5 shrink-0 text-zinc-500" strokeWidth={1.75} />
                        <span>{exp.street}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors duration-300">
                        <Clock className="w-3.5 h-3.5 shrink-0 text-zinc-500" strokeWidth={1.75} />
                        <span>{exp.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors duration-300">
                        <Euro className="w-3.5 h-3.5 shrink-0 text-zinc-500" strokeWidth={1.75} />
                        <span>{exp.price}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.li>
            ))}
          </ul>

          {/* Right dot grid — desktop only */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
            className="hidden lg:block w-16 shrink-0 self-stretch rounded-xl"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)",
              backgroundSize: "18px 18px",
            }}
          />

        </div>
      </div>
    </section>
  );
}
