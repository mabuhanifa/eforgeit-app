import { Router } from "express";
import {
  createQuestion,
  deleteQuestion,
  getQuestionById,
  getQuestions,
  updateQuestion,
} from "../controllers/questionController";
import { authenticate, authorize } from "../middleware/authMiddleware";

const router = Router();

// Protect all routes in this file and allow only Admins
router.use(authenticate, authorize(["Admin"]));

router.route("/").post(createQuestion).get(getQuestions);
router
  .route("/:id")
  .get(getQuestionById)
  .put(updateQuestion)
  .delete(deleteQuestion);

export default router;
