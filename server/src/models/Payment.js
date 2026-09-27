import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ["paid", "pending", "unpaid", "overdue"],
      default: "pending",
    },
    dueDate: {
      type: Date,
    },
    invoice: {
      type: String,
      default: "",
    },
    paidAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;