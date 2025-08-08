import { Router } from "express";
import {
  loginUser,
  logoutUser,
  refreshToken,
  registerUser,
} from "../controllers/authController";
import { authenticate } from "../middleware/authMiddleware";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh", refreshToken);
router.post("/logout", authenticate, logoutUser);

export default router;
