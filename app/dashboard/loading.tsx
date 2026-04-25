export default function DashboardLoading() {
  return (
    <div className="pb-12 animate-pulse">
      {/* Profile button placeholder */}
      <div className="flex justify-end px-8 pt-6">
        <div className="w-10 h-10 rounded-full bg-zinc-800" />
      </div>

      <div className="px-8 -mt-6">
        {/* Greeting + date */}
        <div className="mb-6 space-y-2">
          <div className="h-7 w-48 rounded-lg bg-zinc-800" />
          <div className="h-4 w-32 rounded-md bg-zinc-800/60" />
        </div>

        {/* Featured card */}
        <div className="rounded-2xl overflow-hidden bg-zinc-900 border border-white/[0.06] mb-6">
          <div className="h-56 bg-zinc-800" />
          <div className="p-5 space-y-3">
            <div className="h-3 w-20 rounded bg-zinc-700" />
            <div className="h-6 w-3/4 rounded-lg bg-zinc-700" />
            <div className="flex gap-3">
              <div className="h-3 w-24 rounded bg-zinc-800" />
              <div className="h-3 w-16 rounded bg-zinc-800" />
            </div>
          </div>
        </div>

        {/* Feed section label */}
        <div className="h-4 w-28 rounded bg-zinc-800 mb-4" />

        {/* Feed items */}
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="flex gap-4 rounded-2xl border border-white/[0.06] bg-zinc-900 p-4 mb-3"
          >
            <div className="w-20 h-20 rounded-xl bg-zinc-800 shrink-0" />
            <div className="flex-1 space-y-2 py-1">
              <div className="h-3 w-16 rounded bg-zinc-700" />
              <div className="h-5 w-full rounded-lg bg-zinc-700" />
              <div className="h-5 w-2/3 rounded-lg bg-zinc-800" />
              <div className="flex gap-3">
                <div className="h-3 w-20 rounded bg-zinc-800" />
                <div className="h-3 w-14 rounded bg-zinc-800" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
