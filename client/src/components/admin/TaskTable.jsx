import { CalendarDays, Pencil, Trash2 } from "lucide-react";
import { formatDate } from "../../utils/formatDate";
import StatusBadge from "../common/SatatusBadge";

const TaskTable = ({
  tasks = [],
  onEdit,
  onDelete,
}) => {
  if (!tasks.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-10 text-center">
        <p className="text-sm font-semibold text-slate-700">
          No tasks found
        </p>

        <p className="mt-1 text-xs text-slate-400">
          Task records will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[850px]">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/70">
              <th className="px-5 py-4 text-left text-xs font-semibold text-slate-500">
                Task
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold text-slate-500">
                Project
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold text-slate-500">
                Assignee
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold text-slate-500">
                Due Date
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold text-slate-500">
                Status
              </th>

              <th className="px-5 py-4 text-right text-xs font-semibold text-slate-500">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {tasks.map((task) => (
              <tr
                key={task._id}
                className="transition hover:bg-slate-50/70"
              >
                <td className="px-5 py-4">
                  <p className="text-sm font-semibold text-slate-800">
                    {task.title}
                  </p>

                  <p className="mt-1 max-w-[220px] truncate text-xs text-slate-400">
                    {task.description || "No description available"}
                  </p>
                </td>

                <td className="px-5 py-4 text-sm text-slate-600">
                  {task.project?.name || "Unknown Project"}
                </td>

                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-[10px] font-bold text-slate-700">
                      {task.assignedTo?.name
                        ?.split(" ")
                        .map((name) => name[0])
                        .slice(0, 2)
                        .join("")
                        .toUpperCase() || "NA"}
                    </div>

                    <span className="text-xs font-medium text-slate-600">
                      {task.assignedTo?.name || "Not assigned"}
                    </span>
                  </div>
                </td>

                <td className="px-5 py-4">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <CalendarDays size={14} />

                    {task.dueDate
                      ? formatDate(task.dueDate)
                      : "No deadline"}
                  </div>
                </td>

                <td className="px-5 py-4">
                  <StatusBadge status={task.status || "todo"} />
                </td>

                <td className="px-5 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => onEdit?.(task)}
                      className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-900"
                      title="Edit task"
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      type="button"
                      onClick={() => onDelete?.(task._id)}
                      className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                      title="Delete task"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskTable;