import express from "express";
import {
  createSupportRequest,
  getSupportRequests,
  updateSupportRequest,
} from "../controllers/supportRequestController.js";
import {
  protect,
  authorize,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/",
  protect,
  authorize("admin", "client"),
  getSupportRequests
);

router.post(
  "/",
  protect,
  authorize("client"),
  createSupportRequest
);

router.put(
  "/:id",
  protect,
  authorize("admin"),
  updateSupportRequest
);

export default router;