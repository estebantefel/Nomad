export const dynamic = 'force-dynamic';

import Link from "next/link";
import DashboardFeed from "@/components/sections/DashboardFeed";
import { getTopPick, getDashboardFeed } from "@/lib/supabase";

const USER_INITIALS = "AG";

export default async function DashboardPage() {
  const [topPick, allFeed] = await Promise.all([
    getTopPick(),
    getDashboardFeed(9),
  ]);

  const featured = topPick ?? allFeed[0] ?? null;
  const feed = topPick ? allFeed : allFeed.slice(1);

  return (
    <>
      <div className="sticky top-0 z-20 flex justify-end px-8 pt-6 pointer-events-none">
        <Link
          href="/profile"
          className="pointer-events-auto w-10 h-10 rounded-full bg-brand-green flex items-center justify-center text-sm font-bold text-white hover:bg-brand-green-deep transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-green/50 focus:ring-offset-2 focus:ring-offset-[#0a0a0a] select-none shadow-lg shadow-brand-green/20"
          aria-label="Go to profile"
        >
          {USER_INITIALS}
        </Link>
      </div>
      <div className="-mt-16 pb-12">
        <DashboardFeed topPick={featured} feed={feed} />
      </div>
    </>
  );
}
