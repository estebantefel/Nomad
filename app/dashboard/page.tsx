export const dynamic = 'force-dynamic';

import type { Metadata } from "next";
import DashboardFeed from "@/components/sections/DashboardFeed";
import { getTopPick, getDashboardFeed } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Dashboard — Nomad",
  description: "Your Madrid experience feed, your streak, and your friends' rankings.",
  robots: { index: false },
};

export default async function DashboardPage() {
  const [topPick, allFeed] = await Promise.all([
    getTopPick(),
    getDashboardFeed(),
  ]);

  const featured = topPick ?? allFeed[0] ?? null;
  const feed = topPick ? allFeed : allFeed.slice(1);

  return <DashboardFeed topPick={featured} feed={feed} />;
}
