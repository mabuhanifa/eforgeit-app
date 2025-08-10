export interface User {
  _id: string;
  name: string;
  email: string;
  role: "Student" | "Admin" | "Supervisor";
  isVerified: boolean;
  failedStep1: boolean;
}

export interface Question {
  _id: string;
  competency: string;
  level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
  questionText: string;
  options: string[];
}
