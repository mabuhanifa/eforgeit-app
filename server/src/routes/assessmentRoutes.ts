import { Router } from "express";
import {
  startAssessment,
  submitAssessment,
} from "../controllers/assessmentController";
import { authenticate, authorize } from "../middleware/authMiddleware";
import { verifySEB } from "../middleware/secureExamBrowserMiddleware";

const router = Router();

router.use(authenticate, authorize(["Student"]), verifySEB);

router.post("/start", startAssessment);
router.post("/:id/submit", submitAssessment);

export default router;
