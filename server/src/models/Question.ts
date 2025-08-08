import { Document, Schema, model } from "mongoose";

export interface IQuestion extends Document {
  competency: string;
  level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
  questionText: string;
  options: string[];
  correctAnswer: string;
}

const QuestionSchema = new Schema<IQuestion>(
  {
    competency: { type: String, required: true },
    level: {
      type: String,
      enum: ["A1", "A2", "B1", "B2", "C1", "C2"],
      required: true,
    },
    questionText: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctAnswer: { type: String, required: true },
  },
  { timestamps: true }
);

export default model<IQuestion>("Question", QuestionSchema);
