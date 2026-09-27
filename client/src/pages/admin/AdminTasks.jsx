import { useEffect, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import TaskTable from "../../components/admin/TaskTable";
import Modal from "../../components/common/Modal";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import useTasks from "../../hooks/useTasks";
import useProjects from "../../hooks/useProjects";
import {
  createTask,
  updateTask,
  deleteTask,
} from "../../services/taskService";

const AdminTasks = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const { tasks, loading, setTasks } = useTasks();
  const { projects, loading: projectsLoading } = useProjects();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    project: "",
    assignee: "",
    status: "todo",
    priority: "medium",
    dueDate: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOpenCreate = () => {
    setEditingTask(null);

    setFormData({
      title: "",
      description: "",
      project: "",
      assignee: "",
      status: "todo",
      priority: "medium",
      dueDate: "",
    });

    setIsModalOpen(true);
  };

  const handleEdit = (task) => {
    setEditingTask(task);

    setFormData({
      title: task.title || "",
      description: task.description || "",
      project: task.project?._id || "",
      assignee: task.assignedTo?._id || "",
      status: task.status || "todo",
      priority: task.priority || "medium",
      dueDate: task.dueDate
        ? new Date(task.dueDate).toISOString().split("T")[0]
        : "",
    });

    setIsModalOpen(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const taskData = {
        title: formData.title,
        description: formData.description,
        project: formData.project,
        assignedTo: formData.assignee || null,
        status: formData.status,
        priority: formData.priority,
        dueDate: formData.dueDate,
      };

      if (editingTask) {
        const data = await updateTask(
          editingTask._id,
          taskData
        );

        setTasks((prev) =>
          prev.map((task) =>
            task._id === editingTask._id
              ? data.task
              : task
          )
        );
      } else {
        const data = await createTask(taskData);

        setTasks((prev) => [data.task, ...prev]);
      }

      setFormData({
        title: "",
        description: "",
        project: "",
        assignee: "",
        status: "todo",
        priority: "medium",
        dueDate: "",
      });

      setEditingTask(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmed) return;

    try {
      await deleteTask(id);

      setTasks((prev) =>
        prev.filter((task) => task._id !== id)
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Tasks
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage project tasks and assignments.
          </p>
        </div>

        <Button onClick={handleOpenCreate}>
          <Plus size={17} />
          Add Task
        </Button>
      </div>

      {loading ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-500">
          Loading tasks...
        </div>
      ) : (
        <TaskTable
          tasks={tasks}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(null);
        }}
        title={editingTask ? "Edit Task" : "Create Task"}
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Task Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter task title"
            required
          />

          <Input
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter task description"
          />

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Project
            </label>

            <select
              name="project"
              value={formData.project}
              onChange={handleChange}
              required
              disabled={projectsLoading}
              className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-slate-400 disabled:bg-slate-50"
            >
              <option value="">
                {projectsLoading
                  ? "Loading projects..."
                  : "Select project"}
              </option>

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

          <Input
            label="Assignee ID"
            name="assignee"
            value={formData.assignee}
            onChange={handleChange}
            placeholder="Enter team member ID"
          />

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
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Priority
            </label>

            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-slate-400"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <Input
            label="Due Date"
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            required
          />

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setIsModalOpen(false);
                setEditingTask(null);
              }}
            >
              Cancel
            </Button>

            <Button type="submit">
              {editingTask ? "Update Task" : "Create Task"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminTasks;