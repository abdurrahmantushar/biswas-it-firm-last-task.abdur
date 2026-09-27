import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  CreditCard,
  Files,
  BellRing,
  Headphones,
  Users,
  X,
  LogOut
} from "lucide-react";
import useAuth from "../../hooks/useAuth";

  const Sidebar = ({ role = "client", isOpen, setIsOpen }) => {
  const { logout } = useAuth();
  const clientItems = [
    {
      label: "Dashboard",
      path: "/client",
      icon: LayoutDashboard,
    },
    {
      label: "Projects",
      path: "/client/projects",
      icon: FolderKanban,
    },
    {
      label: "Tasks",
      path: "/client/tasks",
      icon: CheckSquare,
    },
    {
      label: "Payments",
      path: "/client/payments",
      icon: CreditCard,
    },
    {
      label: "Files",
      path: "/client/files",
      icon: Files,
    },
    {
      label: "Updates",
      path: "/client/updates",
      icon: BellRing,
    },
    {
      label: "Support",
      path: "/client/support",
      icon: Headphones,
    },
  ];

  const adminItems = [
    {
      label: "Dashboard",
      path: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Clients",
      path: "/admin/clients",
      icon: Users,
    },
    {
      label: "Projects",
      path: "/admin/projects",
      icon: FolderKanban,
    },
    {
      label: "Tasks",
      path: "/admin/tasks",
      icon: CheckSquare,
    },
    {
      label: "Payments",
      path: "/admin/payments",
      icon: CreditCard,
    },
    {
      label: "Updates",
      path: "/admin/updates",
      icon: BellRing,
    },
  ];

  const navItems = role === "admin" ? adminItems : clientItems;

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-300 lg:static lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-20 items-center justify-between border-b border-slate-100 px-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-sm font-bold text-white">
              BI
            </div>

            <div>
              <h1 className="text-sm font-bold text-slate-900">
                Biswas IT Firm
              </h1>
              <p className="text-xs text-slate-400">
                {role === "admin" ? "Admin Portal" : "Client Portal"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 lg:hidden"
          >
            <X size={19} />
          </button>
        </div>

        <div className="px-4 pt-6">
          <p className="mb-3 px-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Main Menu
          </p>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `group flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium transition-all ${
                      isActive
                        ? "bg-slate-900 text-white shadow-sm"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`
                  }
                >
                  <Icon size={18} strokeWidth={1.8} />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

      <div className="mt-auto p-4">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs font-semibold text-slate-700">
            Need assistance?
          </p>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            Contact our support team whenever you need help.
          </p>

          <button
            type="button"
            className="mt-3 text-xs font-semibold text-slate-900 hover:underline"
          >
            Contact Support →
          </button>
        </div>

        <button
          type="button"
          onClick={logout}
          className="mt-3 flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium text-red-500 transition hover:bg-red-50"
        >
          <LogOut size={18} strokeWidth={1.8} />
          <span>Logout</span>
        </button>
      </div>
      </aside>
    </>
  );
};

export default Sidebar;