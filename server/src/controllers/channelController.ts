import { Response } from "express";
import Channel from "../models/Channel";
import { AuthRequest } from "../middleware/authMiddleware";

export const createChannel = async (req: AuthRequest, res: Response) => {
  try {
    const { workspaceId, name } = req.body;

    const channel = await Channel.create({
      name,
      workspace: workspaceId,
      createdBy: req.userId,
    });

    res.status(201).json(channel);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

export const getChannels = async (req: AuthRequest, res: Response) => {
  try {
    const { workspaceId } = req.params;

    const channels = await Channel.find({
      workspace: workspaceId,
    }).sort({ createdAt: 1 });

    res.json(channels);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

export const deleteChannel = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const channel = await Channel.findByIdAndDelete(id);

    if (!channel) {
      return res.status(404).json({
        message: "Channel not found",
      });
    }

    res.json({
      message: "Channel deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};