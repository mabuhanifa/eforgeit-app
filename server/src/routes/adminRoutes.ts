import { Router } from "express";
import { getAdminDashboard } from "../controllers/adminController";
import { authenticate, authorize } from "../middleware/authMiddleware";

const router = Router();

router.get("/dashboard", authenticate, authorize(["Admin"]), getAdminDashboard);

export default router;
