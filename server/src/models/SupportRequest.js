import mongoose from "mongoose";

const supportRequestSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["open", "in-progress", "resolved", "closed"],
      default: "open",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    response: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const SupportRequest = mongoose.model(
  "SupportRequest",
  supportRequestSchema
);

export default SupportRequest;