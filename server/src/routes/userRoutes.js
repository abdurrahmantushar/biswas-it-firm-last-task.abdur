import express from "express";
import {
  getClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
} from "../controllers/userController.js";
import {
  protect,
  authorize,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/clients",
  protect,
  authorize("admin"),
  getClients
);

router.get(
  "/clients/:id",
  protect,
  authorize("admin"),
  getClientById
);

router.post(
  "/clients",
  protect,
  authorize("admin"),
  createClient
);

router.put(
  "/clients/:id",
  protect,
  authorize("admin"),
  updateClient
);

router.delete(
  "/clients/:id",
  protect,
  authorize("admin"),
  deleteClient
);

export default router;