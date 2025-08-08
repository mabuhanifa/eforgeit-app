import { Document, Schema, Types, model } from "mongoose";

export interface IPasswordResetToken extends Document {
  user: Types.ObjectId;
  token: string;
  expiresAt: Date;
}

const PasswordResetTokenSchema = new Schema<IPasswordResetToken>({
  user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  token: { type: String, required: true, unique: true },
  expiresAt: { type: Date, required: true },
});

PasswordResetTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default model<IPasswordResetToken>(
  "PasswordResetToken",
  PasswordResetTokenSchema
);
