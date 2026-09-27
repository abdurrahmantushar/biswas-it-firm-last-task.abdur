import {
  CheckCircle2,
  ClipboardList,
  FolderKanban,
  Users,
  WalletCards,
} from "lucide-react";
import Card from "../../components/common/Card";
import StatusBadge from "../../components/common/SatatusBadge";

const AdminDashboard = () => {
  const recentProjects = [
    {
      id: 1,
      name: "E-commerce Website",
      client: "Rahim Ahmed",
      progress: 72,
      status: "In Progress",
    },
    {
      id: 2,
      name: "Business Website",
      client: "Nadia Karim",
      progress: 100,
      status: "Completed",
    },
    {
      id: 3,
      name: "Mobile Application",
      client: "Tanvir Hasan",
      progress: 35,
      status: "In Progress",
    },
  ];

  const recentTasks = [
    {
      id: 1,
      title: "Homepage UI implementation",
      project: "E-commerce Website",
      status: "In Progress",
    },
    {
      id: 2,
      title: "Payment integration",
      project: "E-commerce Website",
      status: "Pending",
    },
    {
      id: 3,
      title: "Final testing",
      project: "Business Website",
      status: "Completed",
    },
  ];

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
              <h3 className="mt-2 text-2xl font-bold text-slate-900">48</h3>
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
              <h3 className="mt-2 text-2xl font-bold text-slate-900">26</h3>
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
              <h3 className="mt-2 text-2xl font-bold text-slate-900">84</h3>
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
              <h3 className="mt-2 text-2xl font-bold text-slate-900">142</h3>
            </div>

            <div className="rounded-xl bg-slate-100 p-3 text-slate-700">
              <CheckCircle2 size={21} />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Pending Payments</p>
              <h3 className="mt-2 text-2xl font-bold text-slate-900">
                ৳185K
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
                    key={project.id}
                    className="border-b border-slate-50 last:border-0"
                  >
                    <td className="py-4 text-sm font-medium text-slate-900">
                      {project.name}
                    </td>

                    <td className="py-4 text-sm text-slate-500">
                      {project.client}
                    </td>

                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className="h-full rounded-full bg-slate-900"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>

                        <span className="text-xs font-medium text-slate-500">
                          {project.progress}%
                        </span>
                      </div>
                    </td>

                    <td className="py-4">
                      <StatusBadge status={project.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card
          title="Recent Tasks"
          description="Latest task activity."
        >
          <div className="space-y-4">
            {recentTasks.map((task) => (
              <div
                key={task.id}
                className="rounded-xl border border-slate-100 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">
                      {task.title}
                    </h3>

                    <p className="mt-1 text-xs text-slate-500">
                      {task.project}
                    </p>
                  </div>

                  <StatusBadge status={task.status} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;