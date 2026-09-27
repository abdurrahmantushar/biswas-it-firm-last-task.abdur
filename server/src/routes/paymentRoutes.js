import express from "express";

import {
  getPayments,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment,
} from "../controllers/paymentController.js";

import {
  protect,
  authorize,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/",
  protect,
  authorize("admin", "client"),
  getPayments
);

router.get(
  "/:id",
  protect,
  authorize("admin", "client"),
  getPaymentById
);

router.post(
  "/",
  protect,
  authorize("admin"),
  createPayment
);

router.put(
  "/:id",
  protect,
  authorize("admin"),
  updatePayment
);

router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deletePayment
);

export default router;