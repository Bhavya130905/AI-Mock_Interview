import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppSidebar, AppTopbar } from "@/components/app/AppSidebar";

export const Route = createFileRoute("/_app")({
  component: AppLayout,
});

function AppLayout() {
  return (
    <div className="min-h-screen">
      <AppSidebar />
      <AppTopbar />
      <main className="lg:pl-64">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
