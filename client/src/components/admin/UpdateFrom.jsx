import { useState } from "react";
import { Send } from "lucide-react";
import Button from "../common/Button";
import Input from "../common/Input";
import useProjects from "../../hooks/useProjects";

const UpdateForm = ({ onSubmit }) => {
  const { projects, loading: projectsLoading } = useProjects();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    project: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !formData.title.trim() ||
      !formData.description.trim() ||
      !formData.project
    ) {
      return;
    }

    onSubmit?.(formData);

    setFormData({
      title: "",
      description: "",
      project: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm"
    >
      <div className="mb-5">
        <h3 className="text-base font-bold text-slate-900">
          Create Project Update
        </h3>

        <p className="mt-1 text-xs text-slate-400">
          Share important progress or announcements with clients.
        </p>
      </div>

      <div className="space-y-4">
        <Input
          label="Update Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter update title"
          required
        />

        <div>
          <label
            htmlFor="project"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Project
          </label>

          <select
            id="project"
            name="project"
            value={formData.project}
            onChange={handleChange}
            required
            disabled={projectsLoading}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-900/5 disabled:bg-slate-50"
          >
            <option value="">
              {projectsLoading ? "Loading projects..." : "Select project"}
            </option>

            {projects.map((project) => (
              <option key={project._id} value={project._id}>
                {project.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Description
          </label>

          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Write your project update..."
            rows={5}
            required
            className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-900/5"
          />
        </div>

        <div className="flex justify-end pt-2">
          <Button type="submit" className="gap-2">
            <Send size={16} />
            Publish Update
          </Button>
        </div>
      </div>
    </form>
  );
};

export default UpdateForm;