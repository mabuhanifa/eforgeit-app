import dotenv from "dotenv";
import { Request, Response } from "express";
import Question from "../models/Question";
dotenv.config();

// @desc    Create a new question
// @route   POST /api/questions
// @access  Private/Admin
export const createQuestion = async (req: Request, res: Response) => {
  const { competency, level, questionText, options, correctAnswer } = req.body;
  try {
    const question = new Question({
      competency,
      level,
      questionText,
      options,
      correctAnswer,
    });
    const createdQuestion = await question.save();
    res.status(201).json(createdQuestion);
  } catch (error) {
    res.status(400).json({
      message: "Invalid question data",
      error: (error as Error).message,
    });
  }
};

// @desc    Get all questions with filtering and pagination
// @route   GET /api/questions
// @access  Private/Admin
export const getQuestions = async (req: Request, res: Response) => {
  const pageSize = 10;
  const page = Number(req.query.page) || 1;
  const { level, competency } = req.query;

  const filter: any = {};
  if (level) filter.level = level;
  if (competency) filter.competency = { $regex: competency, $options: "i" };

  try {
    const count = await Question.countDocuments(filter);
    const questions = await Question.find(filter)
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({ questions, page, pages: Math.ceil(count / pageSize) });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error", error: (error as Error).message });
  }
};

// @desc    Get a single question by ID
// @route   GET /api/questions/:id
// @access  Private/Admin
export const getQuestionById = async (req: Request, res: Response) => {
  try {
    const question = await Question.findById(req.params.id);
    if (question) {
      res.json(question);
    } else {
      res.status(404).json({ message: "Question not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error", error: (error as Error).message });
  }
};

// @desc    Update a question
// @route   PUT /api/questions/:id
// @access  Private/Admin
export const updateQuestion = async (req: Request, res: Response) => {
  const { competency, level, questionText, options, correctAnswer } = req.body;
  try {
    const question = await Question.findById(req.params.id);
    if (question) {
      question.competency = competency || question.competency;
      question.level = level || question.level;
      question.questionText = questionText || question.questionText;
      question.options = options || question.options;
      question.correctAnswer = correctAnswer || question.correctAnswer;

      const updatedQuestion = await question.save();
      res.json(updatedQuestion);
    } else {
      res.status(404).json({ message: "Question not found" });
    }
  } catch (error) {
    res.status(400).json({
      message: "Invalid question data",
      error: (error as Error).message,
    });
  }
};

// @desc    Delete a question
// @route   DELETE /api/questions/:id
// @access  Private/Admin
export const deleteQuestion = async (req: Request, res: Response) => {
  try {
    const question = await Question.findById(req.params.id);
    if (question) {
      await question.deleteOne();
      res.json({ message: "Question removed" });
    } else {
      res.status(404).json({ message: "Question not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error", error: (error as Error).message });
  }
};
