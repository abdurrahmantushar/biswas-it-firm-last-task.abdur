import { ArrowUpRight, CalendarDays, CheckCircle2 } from "lucide-react";
import Card from "../common/Card";
import StatusBadge from "../common/SatatusBadge";

const ProjectCard = ({ project }) => {
  const {
    name,
    description,
    status,
    progress = 0,
    deadline,
    completedTasks = 0,
    totalTasks = 0,
  } = project || {};

  return (
    <Card className="group">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="mb-3 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-slate-900" />
            <span className="text-xs font-medium text-slate-400">
              Project
            </span>
          </div>

          <h3 className="truncate text-base font-bold text-slate-900">
            {name || "Untitled Project"}
          </h3>

          <p className="mt-1.5 line-clamp-2 text-sm leading-6 text-slate-500">
            {description || "No project description available."}
          </p>
        </div>

        <button
          type="button"
          className="rounded-xl border border-slate-200 p-2 text-slate-400 transition group-hover:border-slate-300 group-hover:text-slate-900"
        >
          <ArrowUpRight size={17} />
        </button>
      </div>

      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-medium text-slate-500">
            Project Progress
          </span>

          <span className="text-sm font-bold text-slate-900">
            {progress}%
          </span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-slate-900 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
        <StatusBadge status={status || "pending"} />

        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <CheckCircle2 size={15} />
          {completedTasks}/{totalTasks} tasks
        </div>

        {deadline && (
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <CalendarDays size={15} />
            {deadline}
          </div>
        )}
      </div>
    </Card>
  );
};

export default ProjectCard;