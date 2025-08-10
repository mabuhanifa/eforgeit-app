import dotenv from "dotenv";
import { Request, Response } from "express";
import Assessment from "../models/Assessment";
import User from "../models/User";
dotenv.config();

export const getUsers = async (req: Request, res: Response) => {
  const pageSize = 10;
  const page = Number(req.query.page) || 1;
  try {
    const count = await User.countDocuments();
    const users = await User.find()
      .select("-password")
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    res.json({ users, page, pages: Math.ceil(count / pageSize) });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server Error", error: (error as Error).message });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server Error", error: (error as Error).message });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = await User.create({ name, email, password, role });
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Invalid user data", error: (error as Error).message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.role = req.body.role || user.role;
      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "Invalid user data", error: (error as Error).message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      await user.deleteOne();
      res.json({ message: "User removed" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server Error", error: (error as Error).message });
  }
};

export const getAssessmentReports = async (req: Request, res: Response) => {
  const pageSize = 10;
  const page = Number(req.query.page) || 1;
  const { userId, level, date } = req.query;

  const filter: any = {};
  if (userId) filter.user = userId;
  if (level) filter.levelAchieved = level;
  if (date) filter.createdAt = { $gte: new Date(date as string) };

  try {
    const count = await Assessment.countDocuments(filter);
    const assessments = await Assessment.find(filter)
      .populate("user", "name email")
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ createdAt: -1 });
    res.json({ assessments, page, pages: Math.ceil(count / pageSize) });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server Error", error: (error as Error).message });
  }
};

export const getAnalytics = async (req: Request, res: Response) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalAssessments = await Assessment.countDocuments({
      status: "Completed",
    });
    const passFailRates = await Assessment.aggregate([
      { $match: { status: "Completed", currentStep: 1 } },
      { $group: { _id: { $lt: ["$score", 25] }, count: { $sum: 1 } } },
      {
        $project: {
          status: { $cond: ["$_id", "Fail", "Pass"] },
          count: 1,
          _id: 0,
        },
      },
    ]);
    res.json({ totalUsers, totalAssessments, passFailRates });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server Error", error: (error as Error).message });
  }
};
