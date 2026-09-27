import express from "express";
import {
  login,
  logout,
  getCurrentUser,
  register,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", protect, getCurrentUser);

export default router;