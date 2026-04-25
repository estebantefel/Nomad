export default function ExperienceDetailLoading() {
  return (
    <div className="pb-16 animate-pulse">
      {/* Back nav */}
      <div className="px-8 pt-8 pb-4">
        <div className="h-4 w-16 rounded bg-zinc-800" />
      </div>

      {/* Hero image */}
      <div className="h-72 mx-8 rounded-2xl bg-zinc-800" />

      {/* Title area */}
      <div className="px-8 mt-6 space-y-2">
        <div className="h-3 w-20 rounded bg-zinc-800" />
        <div className="h-8 w-3/4 rounded-lg bg-zinc-700" />
      </div>

      {/* Description */}
      <div className="px-8 mt-6 space-y-2">
        <div className="h-3 w-full rounded bg-zinc-800" />
        <div className="h-3 w-full rounded bg-zinc-800" />
        <div className="h-3 w-2/3 rounded bg-zinc-800" />
      </div>

      {/* Stats grid */}
      <div className="px-8 mt-6 grid grid-cols-2 gap-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-white/[0.06] bg-zinc-900 p-5 space-y-2"
          >
            <div className="h-3 w-16 rounded bg-zinc-800" />
            <div className="h-5 w-3/4 rounded-lg bg-zinc-700" />
          </div>
        ))}
      </div>

      {/* Book button */}
      <div className="px-8 mt-8">
        <div className="h-14 rounded-2xl bg-zinc-800" />
      </div>
    </div>
  );
}
