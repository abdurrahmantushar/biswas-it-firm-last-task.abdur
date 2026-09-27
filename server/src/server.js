

import express from "express";
import cors from "cors";
import dns from "dns";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import supportRequestRoutes from "./routes/supportRequestRoutes.js";
import updateRoutes from "./routes/updateRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import fileRoutes from "./routes/fileRoutes.js";

const app = express();

dns.setServers([
  "1.1.1.1",
  "8.8.8.8",
]);

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Client Portal API is running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);
app.use("/api/support-requests", supportRequestRoutes);
app.use("/api/updates", updateRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/files", fileRoutes);

const PORT = process.env.PORT || 4500;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();