import { Document, Schema, Types, model } from "mongoose";

export interface IAssessment extends Document {
  user: Types.ObjectId;
  currentStep: number;
  status: "InProgress" | "Completed";
  score?: number;
  levelAchieved?: string;
  startTime: Date;
  endTime?: Date;
}

const AssessmentSchema = new Schema<IAssessment>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    currentStep: { type: Number, required: true },
    status: {
      type: String,
      enum: ["InProgress", "Completed"],
      default: "InProgress",
    },
    score: { type: Number },
    levelAchieved: { type: String },
    startTime: { type: Date, required: true },
    endTime: { type: Date },
  },
  { timestamps: true }
);

export default model<IAssessment>("Assessment", AssessmentSchema);
