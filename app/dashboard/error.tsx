"use client";

import { useEffect } from "react";
import { RefreshCw } from "lucide-react";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-8 text-center">
      <p className="text-zinc-500 text-sm mb-6">
        We couldn't load your feed. Madrid isn't going anywhere.
      </p>
      <button
        onClick={reset}
        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-sm font-semibold transition-colors duration-200"
      >
        <RefreshCw className="w-4 h-4" strokeWidth={1.75} />
        Try again
      </button>
    </div>
  );
}
