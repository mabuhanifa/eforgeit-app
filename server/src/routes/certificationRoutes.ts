import { Router } from "express";
import { getMyCertification } from "../controllers/certificationController";
import { authenticate } from "../middleware/authMiddleware";

const router = Router();

router.get("/me", authenticate, getMyCertification);

export default router;
