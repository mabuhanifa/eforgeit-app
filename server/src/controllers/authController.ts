import crypto from "crypto";
import dotenv from "dotenv";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import OTP from "../models/OTP";
import PasswordResetToken from "../models/PasswordResetToken";
import User from "../models/User";
import { sendEmail } from "../services/emailService";
import { generateAccessToken, generateRefreshToken } from "../utils/tokenUtils";
dotenv.config();

const sendVerificationOtp = async (email: string) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  await OTP.findOneAndUpdate(
    { email },
    { email, otp, expiresAt },
    { upsert: true, new: true }
  );

  await sendEmail({
    to: email,
    subject: "Verify Your Email Address",
    text: `Your OTP for email verification is: ${otp}. It will expire in 10 minutes.`,
  });
};

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = await User.create({ name, email, password });

    await sendVerificationOtp(user.email);

    res.status(201).json({
      message:
        "User registered successfully. Please check your email for an OTP to verify your account.",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error", error: (error as Error).message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await user.comparePassword(password))) {
      if (!user.isVerified) {
        return res.status(403).json({
          message: "Account not verified. Please check your email for an OTP.",
        });
      }
      const accessToken = generateAccessToken(String(user._id));
      const refreshToken = generateRefreshToken(String(user._id));
      res.json({
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        accessToken,
        refreshToken,
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error", error: (error as Error).message });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  const { token } = req.body;
  if (!token) {
    return res.status(401).json({ message: "No refresh token provided" });
  }
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_REFRESH_SECRET as string
    ) as { id: string };
    const accessToken = generateAccessToken(decoded.id);
    res.json({ accessToken });
  } catch (error) {
    return res
      .status(403)
      .json({ message: "Invalid or expired refresh token" });
  }
};

export const logoutUser = async (req: Request, res: Response) => {
  res.status(200).json({ message: "Logged out successfully" });
};

export const sendOtp = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.isVerified) {
      return res.status(400).json({ message: "Account is already verified" });
    }

    await sendVerificationOtp(email);

    res.status(200).json({ message: "A new OTP has been sent to your email." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error", error: (error as Error).message });
  }
};

export const verifyOtp = async (req: Request, res: Response) => {
  const { email, otp } = req.body;
  try {
    const otpDoc = await OTP.findOne({ email, otp });
    if (!otpDoc) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    if (otpDoc.expiresAt < new Date()) {
      return res.status(400).json({ message: "OTP has expired" });
    }

    const user = await User.findOne({ email });
    if (user) {
      user.isVerified = true;
      await user.save();
    }

    await OTP.deleteOne({ _id: otpDoc._id });

    res.status(200).json({ message: "Email verified successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error", error: (error as Error).message });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(200).json({
        message:
          "If an account with that email exists, a password reset link has been sent.",
      });
    }

    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    await PasswordResetToken.create({ user: user._id, token, expiresAt });

    const resetLink = `${
      process.env.FRONTEND_URL || "http://localhost:3000"
    }/reset-password/${token}`;

    await sendEmail({
      to: user.email,
      subject: "Password Reset Request",
      text: `Click this link to reset your password: ${resetLink}. This link expires in 15 minutes.`,
    });

    res.status(200).json({
      message:
        "If an account with that email exists, a password reset link has been sent.",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error", error: (error as Error).message });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  const { token, newPassword } = req.body;
  try {
    const resetToken = await PasswordResetToken.findOne({ token });
    if (!resetToken || resetToken.expiresAt < new Date()) {
      return res
        .status(400)
        .json({ message: "Invalid or expired password reset token." });
    }

    const user = await User.findById(resetToken.user);
    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }

    user.password = newPassword;
    await user.save();

    await PasswordResetToken.deleteOne({ _id: resetToken._id });

    res.status(200).json({ message: "Password has been reset successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error", error: (error as Error).message });
  }
};
