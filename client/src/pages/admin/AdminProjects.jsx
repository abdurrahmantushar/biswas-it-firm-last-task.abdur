import { useEffect, useState } from "react";
import {
  FileText,
  Plus,
  Search,
  Trash2,
  Upload,
} from "lucide-react";
import Button from "../../components/common/Button";
import Card from "../../components/common/Card";
import Input from "../../components/common/Input";
import Modal from "../../components/common/Modal";
import ProjectTable from "../../components/admin/ProjectTable";
import useProjects from "../../hooks/useProjects";
import {
  createProject,
  updateProject,
  deleteProject,
} from "../../services/projectService";
import api from "../../services/api";

const AdminProjects = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [editingProject, setEditingProject] = useState(null);
  const [clients, setClients] = useState([]);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const { projects, loading, setProjects } = useProjects();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    client: "",
    startDate: "",
    deadline: "",
    status: "active",
    progress: 0,
  });

  const [fileData, setFileData] = useState({
    client: "",
    project: "",
    file: null,
  });

  const filteredProjects = projects.filter((project) =>
    `${project.name} ${project.client?.name || ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const fetchClients = async () => {
    try {
      const response = await api.get("/users/clients");

      setClients(response.data.clients || []);
    } catch (error) {
      console.error(error);
      setClients([]);
    }
  };

  const fetchFiles = async () => {
    try {
      const response = await api.get("/files");

      setFiles(response.data.files || []);
    } catch (error) {
      console.error("Fetch Files Error:", error);
      setFiles([]);
    }
  };

  useEffect(() => {
    fetchClients();
    fetchFiles();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOpenCreate = () => {
    setEditingProject(null);

    setFormData({
      name: "",
      description: "",
      client: "",
      startDate: "",
      deadline: "",
      status: "active",
      progress: 0,
    });

    setIsModalOpen(true);
  };

  const handleEdit = (project) => {
    setEditingProject(project);

    setFormData({
      name: project.name || "",
      description: project.description || "",
      client: project.client?._id || "",
      startDate: project.startDate
        ? new Date(project.startDate).toISOString().split("T")[0]
        : "",
      deadline: project.deadline
        ? new Date(project.deadline).toISOString().split("T")[0]
        : "",
      status: project.status || "pending",
      progress: project.progress || 0,
    });

    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const projectData = {
        name: formData.name,
        description: formData.description,
        client: formData.client,
        startDate: formData.startDate,
        deadline: formData.deadline,
        status: formData.status,
        progress: Number(formData.progress),
      };

      if (editingProject) {
        const data = await updateProject(
          editingProject._id,
          projectData
        );

        setProjects((prev) =>
          prev.map((project) =>
            project._id === editingProject._id
              ? data.project
              : project
          )
        );
      } else {
        const data = await createProject(projectData);

        setProjects((prev) => [data.project, ...prev]);
      }

      setFormData({
        name: "",
        description: "",
        client: "",
        startDate: "",
        deadline: "",
        status: "active",
        progress: 0,
      });

      setEditingProject(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmed) return;

    try {
      await deleteProject(id);

      setProjects((prev) =>
        prev.filter((project) => project._id !== id)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();

    if (
      !fileData.client ||
      !fileData.project ||
      !fileData.file
    ) {
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();

      formData.append("file", fileData.file);
      formData.append("client", fileData.client);
      formData.append("project", fileData.project);

      await api.post("/files/upload", formData);

      setFileData({
        client: "",
        project: "",
        file: null,
      });

      e.target.reset();

      await fetchFiles();
    } catch (error) {
      console.error("Upload File Error:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteFile = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this file?"
    );

    if (!confirmed) return;

    try {
      await api.delete(`/files/${id}`);

      setFiles((prev) =>
        prev.filter((file) => file._id !== id)
      );
    } catch (error) {
      console.error("Delete File Error:", error);
    }
  };

  const formatSize = (size) => {
    if (!size) return "—";

    const mb = size / (1024 * 1024);

    return `${mb.toFixed(1)} MB`;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Projects
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage and monitor all client projects.
          </p>
        </div>

        <Button onClick={handleOpenCreate}>
          <Plus size={17} />
          Add Project
        </Button>
      </div>

      <Card>
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Project List
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              {filteredProjects.length} projects found
            </p>
          </div>

          <div className="relative w-full sm:max-w-xs">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search projects..."
              className="h-10 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-700 outline-none transition focus:border-slate-400"
            />
          </div>
        </div>

        {loading ? (
          <div className="py-10 text-center text-sm text-slate-500">
            Loading projects...
          </div>
        ) : (
          <ProjectTable
            projects={filteredProjects}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </Card>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <div className="mb-5">
            <h2 className="text-base font-bold text-slate-900">
              Upload Project File
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              Share files with a client through their project.
            </p>
          </div>

          <form
            onSubmit={handleFileUpload}
            className="space-y-4"
          >
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Client
              </label>

              <select
                value={fileData.client}
                onChange={(e) =>
                  setFileData((prev) => ({
                    ...prev,
                    client: e.target.value,
                  }))
                }
                required
                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-slate-400"
              >
                <option value="">Select client</option>

                {clients.map((client) => (
                  <option
                    key={client._id}
                    value={client._id}
                  >
                    {client.name}
                    {client.company
                      ? ` - ${client.company}`
                      : ""}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Project
              </label>

              <select
                value={fileData.project}
                onChange={(e) =>
                  setFileData((prev) => ({
                    ...prev,
                    project: e.target.value,
                  }))
                }
                required
                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-slate-400"
              >
                <option value="">Select project</option>

                {projects.map((project) => (
                  <option
                    key={project._id}
                    value={project._id}
                  >
                    {project.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                File
              </label>

              <input
                type="file"
                onChange={(e) =>
                  setFileData((prev) => ({
                    ...prev,
                    file: e.target.files?.[0] || null,
                  }))
                }
                required
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-600"
              />
            </div>

            <Button
              type="submit"
              disabled={uploading}
              className="w-full justify-center"
            >
              <Upload size={16} />

              {uploading
                ? "Uploading..."
                : "Upload File"}
            </Button>
          </form>
        </Card>

        <Card>
          <div className="mb-5">
            <h2 className="text-base font-bold text-slate-900">
              Uploaded Files
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              {files.length} files uploaded
            </p>
          </div>

          {files.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-200 p-8 text-center">
              <FileText
                className="mx-auto text-slate-300"
                size={30}
              />

              <p className="mt-3 text-sm font-medium text-slate-600">
                No files uploaded yet.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {files.map((file) => (
                <div
                  key={file._id}
                  className="flex flex-col gap-3 rounded-xl border border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="shrink-0 rounded-lg bg-slate-100 p-2 text-slate-600">
                      <FileText size={18} />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-900">
                        {file.name}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {file.client?.name || "Client"}{" "}
                        •{" "}
                        {file.project?.name || "Project"}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {formatSize(file.size)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={file.url}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-50"
                    >
                      View
                    </a>

                    <button
                      type="button"
                      onClick={() =>
                        handleDeleteFile(file._id)
                      }
                      className="rounded-lg border border-red-100 p-2 text-red-500 transition hover:bg-red-50"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingProject(null);
        }}
        title={
          editingProject
            ? "Edit Project"
            : "Add New Project"
        }
        size="md"
      >
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <Input
            label="Project Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter project name"
            required
          />

          <Input
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter project description"
          />

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Client
            </label>

            <select
              name="client"
              value={formData.client}
              onChange={handleChange}
              required
              className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-slate-400"
            >
              <option value="">Select client</option>

              {clients.map((client) => (
                <option
                  key={client._id}
                  value={client._id}
                >
                  {client.name}
                  {client.company
                    ? ` - ${client.company}`
                    : ""}
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Input
              label="Start Date"
              name="startDate"
              type="date"
              value={formData.startDate}
              onChange={handleChange}
            />

            <Input
              label="Deadline"
              name="deadline"
              type="date"
              value={formData.deadline}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Status
            </label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-slate-400"
            >
              <option value="active">Active</option>
              <option value="in-progress">
                In Progress
              </option>
              <option value="completed">
                Completed
              </option>
              <option value="pending">Pending</option>
            </select>
          </div>

          <Input
            label="Progress"
            name="progress"
            type="number"
            min="0"
            max="100"
            value={formData.progress}
            onChange={handleChange}
            placeholder="0"
          />

          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setIsModalOpen(false);
                setEditingProject(null);
              }}
            >
              Cancel
            </Button>

            <Button type="submit">
              {editingProject
                ? "Update Project"
                : "Create Project"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminProjects;