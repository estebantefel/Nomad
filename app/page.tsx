import Hero from "@/components/sections/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import ExperiencesGrid from "@/components/sections/ExperiencesGrid";

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <HowItWorks />
      <ExperiencesGrid />
    </main>
  );
}
