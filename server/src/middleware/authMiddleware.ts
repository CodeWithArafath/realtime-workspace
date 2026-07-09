import express from "express";
import {
  createChannel,
  getChannels,
  deleteChannel,
} from "../controllers/channelController";

import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", protect, createChannel);

router.get("/:workspaceId", protect, getChannels);

router.delete("/:id", protect, deleteChannel);

export default router;