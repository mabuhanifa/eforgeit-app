import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  role: z.enum(["Student", "Admin", "Supervisor"]),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .optional()
    .or(z.literal("")),
});

export type UserFormData = z.infer<typeof userSchema>;

export const questionSchema = z.object({
  competency: z.string().min(3, "Competency is required"),
  level: z.enum(["A1", "A2", "B1", "B2", "C1", "C2"]),
  questionText: z.string().min(10, "Question text is required"),
  options: z.string().min(1, "At least one option is required"),
  correctAnswer: z.string().min(1, "Correct answer is required"),
});

export type QuestionFormData = z.infer<typeof questionSchema>;
