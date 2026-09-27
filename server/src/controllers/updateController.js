import Update from "../models/Update.js";
import Project from "../models/Project.js";

export const getUpdates = async (req, res) => {
  try {
    if (req.user.role === "client") {
      const projects = await Project.find({
        client: req.user.id,
      }).select("_id");

      const projectIds = projects.map((project) => project._id);

      const updates = await Update.find({
        project: { $in: projectIds },
      })
        .populate("project", "name")
        .populate("createdBy", "name email")
        .sort({ createdAt: -1 });

      return res.json({
        success: true,
        updates,
      });
    }

    const updates = await Update.find()
      .populate("project", "name client")
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      updates,
    });
  } catch (error) {
    console.error("Get Updates Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to get updates",
    });
  }
};

export const createUpdate = async (req, res) => {
  try {
    const { title, description, project } = req.body;

    if (!title || !description || !project) {
      return res.status(400).json({
        success: false,
        message: "Title, description and project are required",
      });
    }

    const existingProject = await Project.findById(project);

    if (!existingProject) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    const update = await Update.create({
      title,
      description,
      project,
      createdBy: req.user.id,
    });

    const populatedUpdate = await Update.findById(update._id)
      .populate("project", "name client")
      .populate("createdBy", "name email");

    res.status(201).json({
      success: true,
      message: "Project update created successfully",
      update: populatedUpdate,
    });
  } catch (error) {
    console.error("Create Update Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create update",
    });
  }
};

export const deleteUpdate = async (req, res) => {
  try {
    const update = await Update.findById(req.params.id);

    if (!update) {
      return res.status(404).json({
        success: false,
        message: "Update not found",
      });
    }

    await update.deleteOne();

    res.json({
      success: true,
      message: "Project update deleted successfully",
    });
  } catch (error) {
    console.error("Delete Update Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete update",
    });
  }
};