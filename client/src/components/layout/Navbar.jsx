import { Bell, Menu, Search } from "lucide-react";

const Navbar = ({ onMenuClick, title = "Dashboard" }) => {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
      <div className="flex h-20 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 lg:hidden"
          >
            <Menu size={21} />
          </button>

          <div className="min-w-0">
            <h2 className="truncate text-lg font-bold text-slate-900">
              {title}
            </h2>
            <p className="hidden text-xs text-slate-400 sm:block">
              Manage your workspace with ease
            </p>
          </div>
        </div>

        <div className="hidden w-full max-w-sm md:block">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search anything..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-700 outline-none transition focus:border-slate-300 focus:bg-white focus:ring-4 focus:ring-slate-900/5"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            className="relative rounded-xl p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
          >
            <Bell size={19} />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
          </button>

          <div className="hidden h-8 w-px bg-slate-200 sm:block" />

          <button
            type="button"
            className="flex items-center gap-2 rounded-xl p-1.5 transition hover:bg-slate-50"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-xs font-bold text-white">
              AT
            </div>

            <div className="hidden text-left sm:block">
              <p className="text-sm font-semibold text-slate-800">
                Abdur Rahman
              </p>
              <p className="text-[11px] text-slate-400">Client</p>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;