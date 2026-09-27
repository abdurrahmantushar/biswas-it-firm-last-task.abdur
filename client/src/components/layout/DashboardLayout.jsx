import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const DashboardLayout = ({ role = "client" }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex min-h-screen">
        <Sidebar
          role={role}
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
        />

        <div className="flex min-w-0 flex-1 flex-col">
          <Navbar
            onMenuClick={() => setSidebarOpen(true)}
            title={role === "admin" ? "Admin Dashboard" : "Dashboard"}
          />

          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            <div className="mx-auto w-full max-w-[1600px]">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;