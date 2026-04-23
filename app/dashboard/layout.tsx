import DashboardSidebar from "@/components/layout/DashboardSidebar";
import DashboardSocialPanel from "@/components/sections/DashboardSocialPanel";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-[#0a0a0a]">
      <DashboardSidebar />
      <main className="flex-1 overflow-y-auto min-w-0">
        {children}
      </main>
      <aside className="hidden xl:flex flex-col w-[300px] shrink-0 border-l border-white/[0.07] overflow-y-auto">
        <DashboardSocialPanel />
      </aside>
    </div>
  );
}
