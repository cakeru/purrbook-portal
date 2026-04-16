import Sidebar from "./components/Sidebar";

export const metadata = {
  title: "PurrBook Portal | Provider Dashboard",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-surface overflow-hidden">
      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Scrollable Content Area */}
      <div className="flex-1 ml-60 flex flex-col h-screen overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
