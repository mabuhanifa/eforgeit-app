import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAnalytics,
  getAssessmentReports,
  getUserById,
  getUsers,
  updateUser,
} from "../controllers/adminController";
import {
  createQuestion,
  deleteQuestion,
  getQuestionById,
  getQuestions,
  updateQuestion,
} from "../controllers/questionController";
import { authenticate, authorize } from "../middleware/authMiddleware";

const router = Router();

// Protect all admin routes
router.use(authenticate, authorize(["Admin"]));

// User management routes
router.route("/users").get(getUsers).post(createUser);
router.route("/users/:id").get(getUserById).put(updateUser).delete(deleteUser);

// Question management routes
router.route("/questions").get(getQuestions).post(createQuestion);
router
  .route("/questions/:id")
  .get(getQuestionById)
  .put(updateQuestion)
  .delete(deleteQuestion);

// Reporting routes
router.get("/reports/assessments", getAssessmentReports);
router.get("/reports/analytics", getAnalytics);

export default router;
