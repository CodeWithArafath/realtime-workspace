import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import dns from "dns";
import authRoutes from "./routes/authRoutes";
import workspaceRoutes from "./routes/workspaceRoutes";
import { createServer } from "http";
import { initSocket } from "./config/socket";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

dotenv.config();
const app = express();
const httpServer = createServer(app);

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/workspaces", workspaceRoutes);

initSocket(httpServer);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI as string;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));