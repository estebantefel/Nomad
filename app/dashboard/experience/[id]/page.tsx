import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin, Clock, Banknote, Calendar, Tag, Users, Gauge, Globe, ExternalLink } from "lucide-react";
import { getExperienceById } from "@/lib/supabase";
import { CATEGORY_LABELS, type ExperienceCategory } from "@/types/experience";

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params;
  const experience = await getExperienceById(id);
  if (!experience) return { title: "Experiencia — Nomad" };
  return {
    title: `${experience.title} — Nomad`,
    description: experience.description ?? `Discover ${experience.title} in Madrid with Nomad.`,
    robots: { index: false },
    openGraph: {
      title: `${experience.title} — Nomad`,
      description: experience.description ?? `Discover ${experience.title} in Madrid with Nomad.`,
      ...(experience.image_url ? { images: [experience.image_url] } : {}),
    },
  };
}

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

const CATEGORY_DIFFICULTY: Record<ExperienceCategory, string> = {
  outdoors:  "Medium",
  mind:      "Easy",
  learning:  "Easy",
  creative:  "Easy",
  social:    "Easy",
  food:      "Easy",
  lifestyle: "Easy",
  sports:    "Medium–Hard",
};

const DIFFICULTY_COLOR: Record<string, string> = {
  "Easy":        "text-brand-green",
  "Medium":      "text-brand-orange",
  "Medium–Hard": "text-brand-orange",
  "Hard":        "text-red-400",
};

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex flex-col gap-2 rounded-2xl border border-white/[0.08] bg-zinc-900 p-5">
      <div className="flex items-center gap-2 text-zinc-500 text-xs font-semibold uppercase tracking-widest">
        {icon}
        {label}
      </div>
      <p className="text-white font-semibold text-base leading-snug">{value}</p>
    </div>
  );
}

export default async function ExperienceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const experience = await getExperienceById(id);
  if (!experience) notFound();

  const difficulty = CATEGORY_DIFFICULTY[experience.category];
  const gradient = CATEGORY_GRADIENTS[experience.category];

  const stats = [
    experience.location   && { icon: <MapPin className="w-3.5 h-3.5" strokeWidth={1.75} />,     label: "Location",    value: experience.location },
    experience.price      && { icon: <Banknote className="w-3.5 h-3.5" strokeWidth={1.75} />,   label: "Price",       value: experience.price },
    experience.languages  && { icon: <Globe className="w-3.5 h-3.5" strokeWidth={1.75} />,      label: "Language",    value: experience.languages },
    experience.duration   && { icon: <Clock className="w-3.5 h-3.5" strokeWidth={1.75} />,      label: "Duration",    value: experience.duration },
    experience.date_range && { icon: <Calendar className="w-3.5 h-3.5" strokeWidth={1.75} />,   label: "When",        value: experience.date_range },
    { icon: <Tag className="w-3.5 h-3.5" strokeWidth={1.75} />,     label: "Category",    value: CATEGORY_LABELS[experience.category] },
    { icon: <Users className="w-3.5 h-3.5" strokeWidth={1.75} />,   label: "Group size",  value: "Open to all" },
    { icon: <Gauge className="w-3.5 h-3.5" strokeWidth={1.75} />,   label: "Difficulty",  value: difficulty,    valueClass: DIFFICULTY_COLOR[difficulty] },
  ].filter(Boolean) as { icon: React.ReactNode; label: string; value: string; valueClass?: string }[];

  return (
    <div className="pb-16">

      {/* Back nav */}
      <div className="px-8 pt-8 pb-4">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-white text-sm transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4" strokeWidth={1.75} />
          Back
        </Link>
      </div>

      {/* Hero image */}
      <div className="relative h-72 mx-8 rounded-2xl overflow-hidden">
        {experience.image_url ? (
          <Image
            src={experience.image_url}
            alt={experience.title}
            fill
            className="object-cover"
            unoptimized
          />
        ) : (
          <div className="absolute inset-0" style={{ background: gradient }} />
        )}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-0 left-0 px-6 pb-5">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-green">
            {CATEGORY_LABELS[experience.category]}
          </span>
          <h1 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-white mt-1 leading-tight">
            {experience.title}
          </h1>
        </div>
      </div>

      {/* Description */}
      {experience.description && (
        <div className="px-8 mt-6">
          <p className="text-zinc-400 text-sm leading-relaxed">{experience.description}</p>
        </div>
      )}

      {/* Stats grid */}
      <div className="px-8 mt-6 grid grid-cols-2 gap-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col gap-2 rounded-2xl border border-white/[0.08] bg-zinc-900 p-5"
          >
            <div className="flex items-center gap-2 text-zinc-500 text-xs font-semibold uppercase tracking-widest">
              {stat.icon}
              {stat.label}
            </div>
            <p className={`font-semibold text-base leading-snug ${stat.valueClass ?? "text-white"}`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Book Now */}
      <div className="px-8 mt-8">
        {experience.source_url ? (
          <a
            href={experience.source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-brand-green hover:bg-brand-green-deep text-white font-bold text-base transition-colors duration-200 shadow-lg shadow-brand-green/20"
          >
            Book Now
            <ExternalLink className="w-4 h-4" strokeWidth={2} />
          </a>
        ) : (
          <button
            disabled
            className="w-full py-4 rounded-2xl bg-zinc-800 text-zinc-600 font-bold text-base cursor-not-allowed"
          >
            Booking unavailable
          </button>
        )}
      </div>

    </div>
  );
}
