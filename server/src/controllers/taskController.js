import Task from "../models/Task.js";
import Project from "../models/Project.js";

export const getTasks = async (req, res) => {
  try {
    if (req.user.role === "client") {
      const clientId = req.user.id;

      const projects = await Project.find({
        client: clientId,
      }).select("_id");

      const projectIds = projects.map((project) => project._id);

      const tasks = await Task.find({
        project: { $in: projectIds },
      })
        .populate("project", "name client")
        .populate("assignedTo", "name email")
        .sort({ createdAt: -1 });

      return res.json({
        success: true,
        tasks,
      });
    }

    const tasks = await Task.find()
      .populate("project", "name client")
      .populate("assignedTo", "name email")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      tasks,
    });
  } catch (error) {
    console.error("Get Tasks Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to get tasks",
    });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate("project", "name client")
      .populate("assignedTo", "name email");

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    if (req.user.role === "client") {
      const project = await Project.findOne({
        _id: task.project._id,
        client: req.user.id,
      });

      if (!project) {
        return res.status(403).json({
          success: false,
          message: "Access denied",
        });
      }
    }

    res.json({
      success: true,
      task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get task",
    });
  }
};

export const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      project,
      assignedTo,
      status,
      priority,
      dueDate,
    } = req.body;

    if (!title || !project) {
      return res.status(400).json({
        success: false,
        message: "Task title and project are required",
      });
    }

    const existingProject = await Project.findById(project);

    if (!existingProject) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    const task = await Task.create({
      title,
      description: description || "",
      project,
      assignedTo: assignedTo || null,
      status: status || "todo",
      priority: priority || "medium",
      dueDate,
    });

    const populatedTask = await Task.findById(task._id)
      .populate("project", "name client")
      .populate("assignedTo", "name email");

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      task: populatedTask,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create task",
    });
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    const {
      title,
      description,
      project,
      assignedTo,
      status,
      priority,
      dueDate,
    } = req.body;

    if (project) {
      const existingProject = await Project.findById(project);

      if (!existingProject) {
        return res.status(404).json({
          success: false,
          message: "Project not found",
        });
      }
    }

    task.title = title ?? task.title;
    task.description = description ?? task.description;
    task.project = project ?? task.project;
    task.assignedTo = assignedTo ?? task.assignedTo;
    task.status = status ?? task.status;
    task.priority = priority ?? task.priority;
    task.dueDate = dueDate ?? task.dueDate;

    await task.save();

    const updatedTask = await Task.findById(task._id)
      .populate("project", "name client")
      .populate("assignedTo", "name email");

    res.json({
      success: true,
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update task",
    });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    await task.deleteOne();

    res.json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete task",
    });
  }
};