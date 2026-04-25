import type { Metadata } from "next";
import ExperiencesGrid from "@/components/sections/ExperiencesGrid";

export const metadata: Metadata = {
  title: "Experiences in Madrid — Nomad",
  description:
    "Discover what to do in Madrid this week — from mountain hikes to dinner with strangers. New experiences every Monday.",
  openGraph: {
    title: "Experiences in Madrid — Nomad",
    description:
      "Discover what to do in Madrid this week — from mountain hikes to dinner with strangers. New experiences every Monday.",
  },
};

export default function ExperiencesPage() {
  return (
    <main>
      <ExperiencesGrid />
    </main>
  );
}
