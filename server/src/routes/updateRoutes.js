import express from "express";
import {
  getUpdates,
  createUpdate,
  deleteUpdate,
} from "../controllers/updateController.js";
import {
  protect,
  authorize,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/",
  protect,
  authorize("admin", "client"),
  getUpdates
);

router.post(
  "/",
  protect,
  authorize("admin"),
  createUpdate
);

router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteUpdate
);

export default router;