import express from "express";
import {
  createChannel,
  getChannels,
  deleteChannel,
} from "../controllers/channelController";

import { authMiddleware } from "../middleware/authMiddleware";
const router = express.Router();

router.post("/", authMiddleware, createChannel);

router.get("/:workspaceId", authMiddleware, getChannels);

router.delete("/:id", authMiddleware, deleteChannel);

export default router;