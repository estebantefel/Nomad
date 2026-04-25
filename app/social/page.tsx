import type { Metadata } from "next";
import DashboardSidebar from "@/components/layout/DashboardSidebar";
import SocialContent from "@/components/sections/SocialContent";
import SocialLeaderboard from "@/components/sections/SocialLeaderboard";

export const metadata: Metadata = {
  title: "Social — Nomad",
  description: "Connect with friends, join group activities, and see what Madrid is exploring right now.",
  robots: { index: false },
};

export default function SocialPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-[#0a0a0a]">
      <DashboardSidebar />
      <main className="flex-1 overflow-y-auto min-w-0 pb-16 lg:pb-0">
        <SocialContent />
      </main>
      <aside className="hidden xl:flex flex-col w-[300px] shrink-0 border-l border-white/[0.07] overflow-y-auto">
        <SocialLeaderboard />
      </aside>
    </div>
  );
}
