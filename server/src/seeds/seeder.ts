import dotenv from "dotenv";
import fs from "fs";
import mongoose from "mongoose";
import path from "path";

dotenv.config();

import Assessment from "../models/Assessment";
import Question from "../models/Question";
import User from "../models/User";

mongoose.connect(process.env.MONGO_URI as string);

const users = JSON.parse(
  fs.readFileSync(path.join(__dirname, "data", "users.json"), "utf-8")
);
const questions = JSON.parse(
  fs.readFileSync(path.join(__dirname, "data", "questions.json"), "utf-8")
);

const importData = async () => {
  try {
    await User.deleteMany();
    await Question.deleteMany();
    await Assessment.deleteMany();

    await User.create(users);
    await Question.create(questions);

    console.log("Data Imported...");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Question.deleteMany();
    await Assessment.deleteMany();
    console.log("Data Destroyed...");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--destroy") {
  destroyData();
} else {
  console.log("Please specify an option: --import or --destroy");
  process.exit();
}
