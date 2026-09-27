import express from "express";
import multer from "multer";

import {
  uploadFile,
  getFiles,
  getFileById,
  deleteFile,
} from "../controllers/fileController.js";

import {
  protect,
  authorize,
} from "../middleware/authMiddleware.js";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

router.get(
  "/",
  protect,
  authorize("admin", "client"),
  getFiles
);

router.get(
  "/:id",
  protect,
  authorize("admin", "client"),
  getFileById
);

router.post(
  "/upload",
  protect,
  authorize("admin"),
  upload.single("file"),
  uploadFile
);

router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteFile
);

export default router;