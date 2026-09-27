import Project from "../models/Project.js";

export const getProjects = async (req, res) => {
  try {
    const filter = req.user.role === "admin"
      ? {}
      : { client: req.user.id };

    const projects = await Project.find(filter)
      .populate("client", "name email company")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      projects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get projects",
    });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate("client", "name email company");

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    if (
      req.user.role === "client" &&
      project.client._id.toString() !== req.user.id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    res.json({
      success: true,
      project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get project",
    });
  }
};

export const createProject = async (req, res) => {
  try {
    const {
      name,
      description,
      client,
      status,
      progress,
      startDate,
      deadline,
    } = req.body;

    if (!name || !client) {
      return res.status(400).json({
        success: false,
        message: "Project name and client are required",
      });
    }

    const project = await Project.create({
      name,
      description: description || "",
      client,
      status: status || "pending",
      progress: progress ?? 0,
      startDate,
      deadline,
    });

    const populatedProject = await Project.findById(project._id)
      .populate("client", "name email company");

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      project: populatedProject,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create project",
    });
  }
};

export const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    const {
      name,
      description,
      client,
      status,
      progress,
      startDate,
      deadline,
    } = req.body;

    project.name = name ?? project.name;
    project.description = description ?? project.description;
    project.client = client ?? project.client;
    project.status = status ?? project.status;
    project.progress = progress ?? project.progress;
    project.startDate = startDate ?? project.startDate;
    project.deadline = deadline ?? project.deadline;

    await project.save();

    const updatedProject = await Project.findById(project._id)
      .populate("client", "name email company");

    res.json({
      success: true,
      message: "Project updated successfully",
      project: updatedProject,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update project",
    });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    await project.deleteOne();

    res.json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete project",
    });
  }
};