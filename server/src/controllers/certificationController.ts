import dotenv from "dotenv";
import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import Assessment from "../models/Assessment";
dotenv.config();

export const getMyCertification = async (req: AuthRequest, res: Response) => {
  const user = req.user!;
  try {
    const assessments = await Assessment.find({
      user: user._id,
      status: "Completed",
    }).sort({ createdAt: -1 });

    if (assessments.length === 0) {
      return res.status(200).json({
        message: "No certifications found.",
        highestLevel: "Not Certified",
      });
    }

    const levelsOrder = ["A1", "A2", "B1", "B2", "C1", "C2"];
    let highestLevel = "Not Certified";
    let highestIndex = -1;

    for (const assessment of assessments) {
      if (assessment.levelAchieved) {
        const currentIndex = levelsOrder.indexOf(assessment.levelAchieved);
        if (currentIndex > highestIndex) {
          highestIndex = currentIndex;
          highestLevel = assessment.levelAchieved;
        }
      }
    }

    res.status(200).json({ highestLevel, history: assessments });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error", error: (error as Error).message });
  }
};
