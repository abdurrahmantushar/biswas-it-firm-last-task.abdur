import Card from "../../components/common/Card";
import UpdateTimeline from "../../components/client/UpdateTimeline";

const ClientUpdates = () => {
  const updates = [
    {
      id: 1,
      title: "Homepage design completed",
      description:
        "The homepage UI has been completed and is ready for client review.",
      date: "Sep 26, 2026",
    },
    {
      id: 2,
      title: "Payment integration started",
      description:
        "The development team has started implementing the payment module.",
      date: "Sep 24, 2026",
    },
    {
      id: 3,
      title: "Product section updated",
      description:
        "Product listing and product details sections have been updated.",
      date: "Sep 22, 2026",
    },
    {
      id: 4,
      title: "Project kickoff completed",
      description:
        "The project requirements and initial development plan were confirmed.",
      date: "Sep 18, 2026",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Project Updates
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Follow the latest updates from your project team.
        </p>
      </div>

      <Card>
        <UpdateTimeline updates={updates} />
      </Card>
    </div>
  );
};

export default ClientUpdates;