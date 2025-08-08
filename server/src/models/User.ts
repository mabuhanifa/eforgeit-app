import bcrypt from "bcrypt";
import { Document, Schema, model } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "Student" | "Admin" | "Supervisor";
  isVerified: boolean;
  failedStep1: boolean;
  comparePassword(password: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["Student", "Admin", "Supervisor"],
      default: "Student",
    },
    isVerified: { type: Boolean, default: false },
    failedStep1: { type: Boolean, default: false },
  },
  { timestamps: true }
);

UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.comparePassword = function (
  password: string
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

export default model<IUser>("User", UserSchema);
