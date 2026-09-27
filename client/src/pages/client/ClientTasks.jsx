import { useState } from "react";
import TaskList from "../../components/client/TaskList";
import useTasks from "../../hooks/useTasks";

const ClientTasks = () => {
  const [filter, setFilter] = useState("all");

  const { tasks, loading } = useTasks();

  const filters = [
    { label: "All", value: "all" },
    { label: "Pending", value: "todo" },
    { label: "In Progress", value: "in-progress" },
    { label: "Completed", value: "completed" },
  ];

  const filteredTasks =
    filter === "all"
      ? tasks
      : tasks.filter((task) => task.status === filter);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Tasks
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Track the tasks assigned to your projects.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {filters.map((item) => (
          <button
            key={item.label}
            onClick={() => setFilter(item.value)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              filter === item.value
                ? "bg-slate-900 text-white"
                : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-500">
          Loading tasks...
        </div>
      ) : (
        <TaskList tasks={filteredTasks} />
      )}
    </div>
  );
};

export default ClientTasks;