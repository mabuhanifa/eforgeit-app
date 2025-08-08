import cors from "cors";
import dotenv from "dotenv";
import express, { Application, Request, Response } from "express";
import { connectDB } from "./config/db";
import authRoutes from "./routes/authRoutes";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("API is running...");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
