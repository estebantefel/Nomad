import type { Metadata } from "next";
import { createServerClient } from "@/lib/supabase-server";
import ExplorerGrid from "@/components/sections/ExplorerGrid";

export const metadata: Metadata = {
  title: "Explore Madrid — Nomad",
  description: "Browse all experiences available in Madrid — filter by category, price, and duration.",
  robots: { index: false },
  openGraph: {
    title: "Explore Madrid — Nomad",
    description: "Browse all experiences available in Madrid — filter by category, price, and duration.",
  },
};

export default async function ExplorePage() {
  const supabase = createServerClient();
  const { data: experiences } = await supabase
    .from("experiences")
    .select("*")
    .order("fetched_at", { ascending: false });

  return <ExplorerGrid experiences={experiences ?? []} />;
}
