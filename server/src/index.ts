import cors from "cors";
import dotenv from "dotenv";
import express, { Application, Request, Response } from "express";
import { connectDB } from "./config/db";
import { errorHandler, notFound } from "./middleware/errorMiddleware";
import adminRoutes from "./routes/adminRoutes";
import assessmentRoutes from "./routes/assessmentRoutes";
import authRoutes from "./routes/authRoutes";
import certificationRoutes from "./routes/certificationRoutes";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/assessments", assessmentRoutes);
app.use("/api/certifications", certificationRoutes);

app.get("/api/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "ok" });
});

app.get("/", (req: Request, res: Response) => {
  res.send("API is running...");
});

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
