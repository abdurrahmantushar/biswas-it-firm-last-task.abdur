import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    url: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      default: "",
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
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    size: {
      type: Number,
      default: 0,
    },
    type: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const File = mongoose.model("File", fileSchema);

export default File;