import { Router } from "express";
import { createWorkspace, joinWorkspace, getMyWorkspaces } from "../controllers/workspaceController";
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.post("/", protect, createWorkspace);
router.post("/join", protect, joinWorkspace);
router.get("/", protect, getMyWorkspaces);

export default router;