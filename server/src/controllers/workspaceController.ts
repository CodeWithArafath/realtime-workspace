import { Response } from "express";
import crypto from "crypto";
import Workspace from "../models/Workspace";
import { AuthRequest } from "../middleware/authMiddleware";

export const createWorkspace = async (req: AuthRequest, res: Response) => {
  try {
    const { name } = req.body;
    const inviteCode = crypto.randomBytes(4).toString("hex");

    const workspace = await Workspace.create({
  name,
  owner: req.userId as string,
  members: [req.userId as string],
  inviteCode,
});

    res.status(201).json(workspace);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

export const joinWorkspace = async (req: AuthRequest, res: Response) => {
  try {
    const { inviteCode } = req.body;

    const workspace = await Workspace.findOne({ inviteCode });
    if (!workspace) {
      return res.status(404).json({ message: "Invalid invite code" });
    }

    if (!workspace.members.includes(req.userId as any)) {
      workspace.members.push(req.userId as any);
      await workspace.save();
    }

    res.json(workspace);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

export const getMyWorkspaces = async (req: AuthRequest, res: Response) => {
  try {
    const workspaces = await Workspace.find({ members: req.userId });
    res.json(workspaces);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};