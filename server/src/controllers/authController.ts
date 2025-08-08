import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { generateAccessToken, generateRefreshToken } from "../utils/tokenUtils";

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
    res.status(201).json({
      message: "User registered successfully. Please verify your email.",
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
      const accessToken = generateAccessToken(String(user._id));
      const refreshToken = generateRefreshToken(String(user._id));
      res.json({ accessToken, refreshToken });
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
