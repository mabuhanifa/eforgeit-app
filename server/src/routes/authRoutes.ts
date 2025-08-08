import { Router } from "express";
import {
  forgotPassword,
  loginUser,
  logoutUser,
  refreshToken,
  registerUser,
  resetPassword,
  sendOtp,
  verifyOtp,
} from "../controllers/authController";
import { authenticate } from "../middleware/authMiddleware";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh", refreshToken);
router.post("/logout", authenticate, logoutUser);
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
