import { uploadImageCloude } from "../config/clodinary.js";
import File from "../models/File.js";

export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "File is required",
      });
    }

    const { client, project } = req.body;

    if (!client || !project) {
      return res.status(400).json({
        success: false,
        message: "Client and project are required",
      });
    }

    const uploadResult = await uploadImageCloude(req.file);

    const file = await File.create({
      name: req.file.originalname,
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id,
      client,
      project,
      uploadedBy: req.user.id,
      size: req.file.size,
      type: req.file.mimetype,
    });

    const populatedFile = await File.findById(file._id)
      .populate("client", "name email company")
      .populate("project", "name")
      .populate("uploadedBy", "name email");

    res.status(201).json({
      success: true,
      message: "File uploaded successfully",
      file: populatedFile,
    });
  } catch (error) {
    console.error("Upload File Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to upload file",
    });
  }
};

export const getFiles = async (req, res) => {
  try {
    const filter =
      req.user.role === "client"
        ? { client: req.user.id }
        : {};

    const files = await File.find(filter)
      .populate("client", "name email company")
      .populate("project", "name")
      .populate("uploadedBy", "name email")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      files,
    });
  } catch (error) {
    console.error("Get Files Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to get files",
    });
  }
};

export const getFileById = async (req, res) => {
  try {
    const file = await File.findById(req.params.id)
      .populate("client", "name email company")
      .populate("project", "name")
      .populate("uploadedBy", "name email");

    if (!file) {
      return res.status(404).json({
        success: false,
        message: "File not found",
      });
    }

    if (
      req.user.role === "client" &&
      file.client._id.toString() !== req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    res.json({
      success: true,
      file,
    });
  } catch (error) {
    console.error("Get File Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to get file",
    });
  }
};

export const deleteFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);

    if (!file) {
      return res.status(404).json({
        success: false,
        message: "File not found",
      });
    }

    await file.deleteOne();

    res.json({
      success: true,
      message: "File deleted successfully",
    });
  } catch (error) {
    console.error("Delete File Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete file",
    });
  }
};