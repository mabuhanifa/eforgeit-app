import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Question {
  _id: string;
  questionText: string;
  options: string[];
}

interface AssessmentResult {
  score: number;
  levelAchieved: string;
  unlocksNextStep: boolean;
}

interface AssessmentState {
  questions: Question[];
  answers: Record<string, string>;
  currentQuestionIndex: number;
  status: "idle" | "in-progress" | "submitted";
  endTime: string | null;
  assessmentId: string | null;
  lastResult: AssessmentResult | null;
}

const initialState: AssessmentState = {
  questions: [],
  answers: {},
  currentQuestionIndex: 0,
  status: "idle",
  endTime: null,
  assessmentId: null,
  lastResult: null,
};

const assessmentSlice = createSlice({
  name: "assessment",
  initialState,
  reducers: {
    startTest: (
      state,
      action: PayloadAction<{
        questions: Question[];
        endTime: string;
        assessmentId: string;
      }>
    ) => {
      state.questions = action.payload.questions;
      state.endTime = action.payload.endTime;
      state.assessmentId = action.payload.assessmentId;
      state.status = "in-progress";
      state.currentQuestionIndex = 0;
      state.answers = {};
      state.lastResult = null; // Clear previous result
    },
    answerQuestion: (
      state,
      action: PayloadAction<{ questionId: string; answer: string }>
    ) => {
      state.answers[action.payload.questionId] = action.payload.answer;
    },
    nextQuestion: (state) => {
      if (state.currentQuestionIndex < state.questions.length - 1) {
        state.currentQuestionIndex++;
      }
    },
    previousQuestion: (state) => {
      if (state.currentQuestionIndex > 0) {
        state.currentQuestionIndex--;
      }
    },
    submitTest: (state, action: PayloadAction<AssessmentResult>) => {
      state.status = "submitted";
      state.lastResult = action.payload;
    },
    resetAssessment: () => initialState,
  },
});

export const {
  startTest,
  answerQuestion,
  nextQuestion,
  previousQuestion,
  submitTest,
  resetAssessment,
} = assessmentSlice.actions;

export default assessmentSlice.reducer;
