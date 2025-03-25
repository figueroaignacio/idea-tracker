// Components
import { Outlet } from "react-router";
import { ProtectedRoute } from "~/components/protected-route";
import { MobileSidebar } from "~/modules/dashboard/components/mobile-sidebar";
import { Sidebar } from "~/modules/dashboard/components/sidebar";

export default function DashboardLayout() {
  return (
    <ProtectedRoute>
      <div className="min-h-dvh grid grid-cols-1 lg:grid-cols-9">
        <div className="lg:col-span-2">
          <Sidebar />
          <MobileSidebar />
        </div>
        <div className="lg:col-span-7 container">
          <Outlet />
        </div>
      </div>
    </ProtectedRoute>
  );
}
