import {
  CheckCircle2,
  ClipboardList,
  FolderKanban,
  WalletCards,
} from "lucide-react";
import Card from "../../components/common/Card";
import ProjectCard from "../../components/client/ProjectCard";
import TaskList from "../../components/client/TaskList";
import ProgressCard from "../../components/client/ProgressCard";
import PaymentCard from "../../components/client/PaymentCard";
import UpdateTimeline from "../../components/client/UpdateTimeline";

const ClientDashboard = () => {
  const projects = [
    {
      id: 1,
      name: "E-commerce Website",
      description: "Modern e-commerce platform development.",
      status: "In Progress",
      progress: 72,
      deadline: "Oct 15, 2026",
    },
    {
      id: 2,
      name: "Business Website",
      description: "Professional corporate website redesign.",
      status: "Completed",
      progress: 100,
      deadline: "Sep 10, 2026",
    },
  ];

  const tasks = [
    {
      id: 1,
      title: "Homepage UI implementation",
      project: "E-commerce Website",
      status: "In Progress",
      dueDate: "Oct 02, 2026",
    },
    {
      id: 2,
      title: "Payment integration",
      project: "E-commerce Website",
      status: "Pending",
      dueDate: "Oct 07, 2026",
    },
    {
      id: 3,
      title: "Final testing",
      project: "Business Website",
      status: "Completed",
      dueDate: "Sep 08, 2026",
    },
  ];

  const updates = [
    {
      id: 1,
      title: "Homepage design completed",
      description: "The homepage UI has been completed and is ready for review.",
      date: "Sep 26, 2026",
    },
    {
      id: 2,
      title: "Payment integration started",
      description: "The development team has started the payment module.",
      date: "Sep 24, 2026",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Overview of your projects and activities.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Active Projects</p>
              <h3 className="mt-2 text-2xl font-bold text-slate-900">2</h3>
            </div>

            <div className="rounded-xl bg-slate-100 p-3 text-slate-700">
              <FolderKanban size={21} />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Pending Tasks</p>
              <h3 className="mt-2 text-2xl font-bold text-slate-900">4</h3>
            </div>

            <div className="rounded-xl bg-slate-100 p-3 text-slate-700">
              <ClipboardList size={21} />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Overall Progress</p>
              <h3 className="mt-2 text-2xl font-bold text-slate-900">72%</h3>
            </div>

            <div className="rounded-xl bg-slate-100 p-3 text-slate-700">
              <CheckCircle2 size={21} />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Due Payment</p>
              <h3 className="mt-2 text-2xl font-bold text-slate-900">
                ৳25,000
              </h3>
            </div>

            <div className="rounded-xl bg-slate-100 p-3 text-slate-700">
              <WalletCards size={21} />
            </div>
          </div>
        </Card>
      </div>

      <div>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Recent Projects
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Track your current projects.
            </p>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <TaskList tasks={tasks} />
        <ProgressCard progress={72} projectName="E-commerce Website" />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <PaymentCard
          amount={25000}
          status="Pending"
          dueDate="Oct 10, 2026"
        />

        <Card title="Recent Updates">
          <UpdateTimeline updates={updates} />
        </Card>
      </div>
    </div>
  );
};

export default ClientDashboard;