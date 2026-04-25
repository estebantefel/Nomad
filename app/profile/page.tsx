export const dynamic = 'force-dynamic';

import type { Metadata } from "next";
import DashboardSidebar from "@/components/layout/DashboardSidebar";
import ProfileContent from "@/components/sections/ProfileContent";
import { getTopPick, getDashboardFeed } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Profile — Nomad",
  description: "Your Nomad profile, streak, achievements, and recent Madrid experiences.",
  robots: { index: false },
};

export default async function ProfilePage() {
  const [activeBooking, allExperiences] = await Promise.all([
    getTopPick(),
    getDashboardFeed(),
  ]);

  return (
    <div className="flex h-screen overflow-hidden bg-[#0a0a0a]">
      <DashboardSidebar />
      <main className="flex-1 overflow-y-auto min-w-0 pb-16 lg:pb-0">
        <ProfileContent
          activeBooking={activeBooking}
          recentExperiences={allExperiences.slice(0, 6)}
        />
      </main>
    </div>
  );
}
