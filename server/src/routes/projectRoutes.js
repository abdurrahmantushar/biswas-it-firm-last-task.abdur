import express from "express";

import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";

import {
  protect,
  authorize,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getProjects);

router.get("/:id", protect, getProjectById);

router.post("/", protect, authorize("admin"), createProject);

router.put("/:id", protect, authorize("admin"), updateProject);

router.delete("/:id", protect, authorize("admin"), deleteProject);

export default router;