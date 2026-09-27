import { useEffect, useState } from "react";
import {
  CheckCircle2,
  ClipboardList,
  FolderKanban,
  Users,
  WalletCards,
} from "lucide-react";
import Card from "../../components/common/Card";
import StatusBadge from "../../components/common/SatatusBadge";
import api from "../../services/api";

const AdminDashboard = () => {
  const [clients, setClients] = useState([]);
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      const [clientsResponse, projectsResponse, tasksResponse, paymentsResponse] =
        await Promise.all([
          api.get("/users/clients"),
          api.get("/projects"),
          api.get("/tasks"),
          api.get("/payments"),
        ]);

      setClients(clientsResponse.data.clients || []);
      setProjects(projectsResponse.data.projects || []);
      setTasks(tasksResponse.data.tasks || []);
      setPayments(paymentsResponse.data.payments || []);
    } catch (error) {
      console.error("Dashboard Data Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const completedTasks = tasks.filter(
    (task) => task.status === "completed"
  );

  const activeTasks = tasks.filter(
    (task) =>
      task.status === "todo" ||
      task.status === "in-progress"
  );

  const pendingPayments = payments.filter(
    (payment) =>
      payment.status === "pending" ||
      payment.status === "unpaid" ||
      payment.status === "overdue"
  );

  const pendingPaymentAmount = pendingPayments.reduce(
    (total, payment) => total + Number(payment.amount || 0),
    0
  );

  const recentProjects = projects.slice(0, 5);
  const recentTasks = tasks.slice(0, 5);

  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-500">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Admin Dashboard
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage clients, projects, tasks and payments.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Total Clients</p>

              <h3 className="mt-2 text-2xl font-bold text-slate-900">
                {clients.length}
              </h3>
            </div>

            <div className="rounded-xl bg-slate-100 p-3 text-slate-700">
              <Users size={21} />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Projects</p>

              <h3 className="mt-2 text-2xl font-bold text-slate-900">
                {projects.length}
              </h3>
            </div>

            <div className="rounded-xl bg-slate-100 p-3 text-slate-700">
              <FolderKanban size={21} />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Active Tasks</p>

              <h3 className="mt-2 text-2xl font-bold text-slate-900">
                {activeTasks.length}
              </h3>
            </div>

            <div className="rounded-xl bg-slate-100 p-3 text-slate-700">
              <ClipboardList size={21} />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Completed</p>

              <h3 className="mt-2 text-2xl font-bold text-slate-900">
                {completedTasks.length}
              </h3>
            </div>

            <div className="rounded-xl bg-slate-100 p-3 text-slate-700">
              <CheckCircle2 size={21} />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Pending Payments
              </p>

              <h3 className="mt-2 text-2xl font-bold text-slate-900">
                ৳{pendingPaymentAmount.toLocaleString()}
              </h3>
            </div>

            <div className="rounded-xl bg-slate-100 p-3 text-slate-700">
              <WalletCards size={21} />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <Card
          title="Recent Projects"
          description="Latest projects across your client workspace."
        >
          <div className="overflow-x-auto">
            {recentProjects.length === 0 ? (
              <p className="py-8 text-center text-sm text-slate-400">
                No projects found.
              </p>
            ) : (
              <table className="w-full min-w-[650px]">
                <thead>
                  <tr className="border-b border-slate-100 text-left">
                    <th className="pb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Project
                    </th>

                    <th className="pb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Client
                    </th>

                    <th className="pb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Progress
                    </th>

                    <th className="pb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {recentProjects.map((project) => (
                    <tr
                      key={project._id}
                      className="border-b border-slate-50 last:border-0"
                    >
                      <td className="py-4 text-sm font-medium text-slate-900">
                        {project.name}
                      </td>

                      <td className="py-4 text-sm text-slate-500">
                        {project.client?.name || "Unknown"}
                      </td>

                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-100">
                            <div
                              className="h-full rounded-full bg-slate-900"
                              style={{
                                width: `${project.progress || 0}%`,
                              }}
                            />
                          </div>

                          <span className="text-xs font-medium text-slate-500">
                            {project.progress || 0}%
                          </span>
                        </div>
                      </td>

                      <td className="py-4">
                        <StatusBadge
                          status={project.status || "pending"}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </Card>

        <Card
          title="Recent Tasks"
          description="Latest task activity."
        >
          <div className="space-y-4">
            {recentTasks.length === 0 ? (
              <p className="py-8 text-center text-sm text-slate-400">
                No tasks found.
              </p>
            ) : (
              recentTasks.map((task) => (
                <div
                  key={task._id}
                  className="rounded-xl border border-slate-100 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900">
                        {task.title}
                      </h3>

                      <p className="mt-1 text-xs text-slate-500">
                        {task.project?.name || "Project"}
                      </p>
                    </div>

                    <StatusBadge
                      status={task.status || "todo"}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;