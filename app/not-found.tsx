import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-8 text-center bg-[#0a0a0a]">
      <p className="text-6xl font-bold font-[family-name:var(--font-heading)] text-white mb-2">
        404
      </p>
      <p className="text-zinc-500 text-base mb-8">
        This page doesn't exist. Madrid still does, though.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-xl bg-brand-green hover:bg-brand-green-deep text-white font-semibold text-sm transition-colors duration-200"
      >
        Back to Nomad
      </Link>
    </div>
  );
}
