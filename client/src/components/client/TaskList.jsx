import { CheckCircle2, Circle, Clock3 } from "lucide-react";
import { formatDate } from "../../utils/formatDate";
import StatusBadge from "../common/SatatusBadge";

const TaskList = ({ tasks = [] }) => {
  if (!tasks.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-center">
        <p className="text-sm font-medium text-slate-600">
          No tasks found
        </p>

        <p className="mt-1 text-xs text-slate-400">
          Your assigned tasks will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
      <div className="divide-y divide-slate-100">
        {tasks.map((task) => {
          const completed = task.status === "completed";

          return (
            <div
              key={task._id}
              className="flex items-center gap-4 px-5 py-4 transition hover:bg-slate-50"
            >
              <div
                className={`shrink-0 ${
                  completed
                    ? "text-emerald-500"
                    : "text-slate-300"
                }`}
              >
                {completed ? (
                  <CheckCircle2 size={21} />
                ) : (
                  <Circle size={21} />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <h4 className="truncate text-sm font-semibold text-slate-800">
                  {task.title}
                </h4>

                {task.description && (
                  <p className="mt-1 truncate text-xs text-slate-400">
                    {task.description}
                  </p>
                )}

                {task.project?.name && (
                  <p className="mt-1 text-xs text-slate-400">
                    {task.project.name}
                  </p>
                )}
              </div>

              <div className="hidden items-center gap-1.5 text-xs text-slate-400 sm:flex">
                <Clock3 size={14} />

                {task.dueDate
                  ? formatDate(task.dueDate)
                  : "No deadline"}
              </div>

              <StatusBadge status={task.status || "todo"} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TaskList;