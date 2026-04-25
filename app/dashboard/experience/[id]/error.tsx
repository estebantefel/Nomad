"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, RefreshCw } from "lucide-react";

export default function ExperienceError({
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
    <div className="pb-16">
      <div className="px-8 pt-8 pb-4">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-white text-sm transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4" strokeWidth={1.75} />
          Back
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center min-h-[50vh] px-8 text-center">
        <p className="text-zinc-500 text-sm mb-6">
          Couldn't load this experience. It might have moved.
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-sm font-semibold transition-colors duration-200"
        >
          <RefreshCw className="w-4 h-4" strokeWidth={1.75} />
          Try again
        </button>
      </div>
    </div>
  );
}
