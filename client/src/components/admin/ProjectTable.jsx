import { CalendarDays, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { formatDate } from "../../utils/formatDate";
import StatusBadge from "../common/SatatusBadge";

const ProjectTable = ({ projects = [],onEdit,onDelete,}) => {
  if (!projects.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-10 text-center">
        <p className="text-sm font-semibold text-slate-700">
          No projects found
        </p>

        <p className="mt-1 text-xs text-slate-400">
          Project records will appear here.
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
                Project
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold text-slate-500">
                Client
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold text-slate-500">
                Progress
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold text-slate-500">
                Status
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold text-slate-500">
                Deadline
              </th>

              <th className="px-5 py-4 text-right text-xs font-semibold text-slate-500">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {projects.map((project) => (
              <tr
                key={project._id}
                className="transition hover:bg-slate-50/70"
              >
                <td className="px-5 py-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      {project.name}
                    </p>

                    <p className="mt-1 max-w-xs truncate text-xs text-slate-400">
                      {project.description || "No description"}
                    </p>
                  </div>
                </td>

                <td className="px-5 py-4">
                  <div>
                    <p className="text-sm font-medium text-slate-700">
                      {project.client?.name || "Unknown Client"}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {project.client?.company || "Individual Client"}
                    </p>
                  </div>
                </td>

                <td className="px-5 py-4">
                  <div className="w-32">
                    <div className="mb-1.5 flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-500">
                        Progress
                      </span>

                      <span className="text-xs font-semibold text-slate-700">
                        {project.progress || 0}%
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-slate-900 transition-all"
                        style={{
                          width: `${project.progress || 0}%`,
                        }}
                      />
                    </div>
                  </div>
                </td>

                <td className="px-5 py-4">
                  <StatusBadge status={project.status || "pending"} />
                </td>

                <td className="px-5 py-4">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <CalendarDays size={14} />
                    {project.deadline
                      ? formatDate(project.deadline)
                      : "No deadline"}
                  </div>
                </td>

              <td className="px-5 py-4">
                <div className="flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => onEdit?.(project)}
                    className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:bg-slate-100 hover:text-slate-900"
                    title="Edit project"
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    type="button"
                    onClick={() => onDelete?.(project._id)}
                    className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                    title="Delete project"
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

export default ProjectTable;