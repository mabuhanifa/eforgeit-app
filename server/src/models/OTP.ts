import { Document, Schema, model } from "mongoose";

export interface IOTP extends Document {
  email: string;
  otp: string;
  expiresAt: Date;
}

const OTPSchema = new Schema<IOTP>(
  {
    email: { type: String, required: true },
    otp: { type: String, required: true },
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true }
);

OTPSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default model<IOTP>("OTP", OTPSchema);
