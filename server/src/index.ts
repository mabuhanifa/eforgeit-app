import express, { Application } from "express";
import { connectDB } from "./config";

const app: Application = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json());

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
