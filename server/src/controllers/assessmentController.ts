import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import Assessment from "../models/Assessment";
import Question from "../models/Question";
import { calculateScoreAndLevel } from "../services/scoringService";

interface UserAnswer {
  questionId: string;
  answer: string;
}

export const startAssessment = async (req: AuthRequest, res: Response) => {
  const user = req.user!;
  try {
    if (user.failedStep1) {
      return res
        .status(403)
        .json({ message: "You are not eligible to start a new assessment." });
    }

    const lastAssessment = await Assessment.findOne({
      user: user._id,
      status: "Completed",
    }).sort({ createdAt: -1 });

    let currentStep = 1;
    if (lastAssessment) {
      if (
        lastAssessment.score &&
        lastAssessment.score >= 75 &&
        lastAssessment.currentStep < 3
      ) {
        currentStep = lastAssessment.currentStep + 1;
      } else {
        return res
          .status(403)
          .json({ message: "You have not unlocked the next assessment step." });
      }
    }

    const levels: Record<number, string[]> = {
      1: ["A1", "A2"],
      2: ["B1", "B2"],
      3: ["C1", "C2"],
    };
    const questions = await Question.aggregate([
      { $match: { level: { $in: levels[currentStep] } } },
      { $sample: { size: 44 } },
      { $project: { correctAnswer: 0 } },
    ]);

    if (questions.length < 44) {
      return res.status(500).json({
        message:
          "Not enough questions in the database to start the assessment.",
      });
    }

    const assessment = await Assessment.create({
      user: user._id,
      currentStep,
      startTime: new Date(),
      status: "InProgress",
    });

    res.status(200).json({ assessmentId: assessment._id, questions });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error", error: (error as Error).message });
  }
};

export const submitAssessment = async (req: AuthRequest, res: Response) => {
  const { id: assessmentId } = req.params;
  const { answers }: { answers: UserAnswer[] } = req.body;
  const user = req.user!;

  try {
    const assessment = await Assessment.findById(assessmentId);
    if (!assessment) {
      return res.status(404).json({ message: "Assessment not found." });
    }
    if (assessment.user.toString() !== String(user._id)) {
      return res
        .status(403)
        .json({ message: "You are not authorized to submit this assessment." });
    }
    if (assessment.status === "Completed") {
      return res
        .status(400)
        .json({ message: "This assessment has already been completed." });
    }

    const questionIds = answers.map((a: UserAnswer) => a.questionId);
    const correctQuestions = await Question.find({
      _id: { $in: questionIds },
    }).select("correctAnswer");

    let correctCount = 0;
    const correctAnswersMap = new Map(
      correctQuestions.map((q) => [String(q._id), q.correctAnswer])
    );

    for (const userAnswer of answers) {
      if (correctAnswersMap.get(userAnswer.questionId) === userAnswer.answer) {
        correctCount++;
      }
    }
    const percentageScore = (correctCount / 44) * 100;

    const scoringResult = calculateScoreAndLevel(
      assessment.currentStep,
      percentageScore
    );

    assessment.score = percentageScore;
    assessment.levelAchieved = scoringResult.levelAchieved;
    assessment.status = "Completed";
    assessment.endTime = new Date();
    await assessment.save();

    if (scoringResult.failed) {
      user.failedStep1 = true;
      await user.save();
    }

    res.status(200).json({
      message: "Assessment submitted successfully.",
      results: {
        score: assessment.score,
        levelAchieved: assessment.levelAchieved,
        unlocksNextStep: scoringResult.unlocksNextStep,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error", error: (error as Error).message });
  }
};
