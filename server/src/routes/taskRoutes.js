import express from "express";

import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";

import {
  protect,
  authorize,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getTasks);

router.get("/:id", protect, getTaskById);

router.post("/", protect, authorize("admin"), createTask);

router.put("/:id", protect, authorize("admin"), updateTask);

router.delete("/:id", protect, authorize("admin"), deleteTask);

export default router;