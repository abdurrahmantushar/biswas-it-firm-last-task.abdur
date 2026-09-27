import ProjectCard from "../../components/client/ProjectCard";
import Card from "../../components/common/Card";
import useProjects from "../../hooks/useProjects";

const ClientProjects = () => {
  const { projects, loading } = useProjects();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Projects
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          View and track all your projects.
        </p>
      </div>

      {loading ? (
        <div className="py-10 text-center text-sm text-slate-500">
          Loading projects...
        </div>
      ) : projects.length === 0 ? (
        <Card>
          <div className="py-10 text-center">
            <p className="text-sm text-slate-500">
              No projects found.
            </p>
          </div>
        </Card>
      ) : (
        <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project._id}
              project={{
                ...project,
                id: project._id,
                status:
                  project.status === "in-progress"
                    ? "In Progress"
                    : project.status.charAt(0).toUpperCase() +
                      project.status.slice(1),
                deadline: project.deadline,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ClientProjects;