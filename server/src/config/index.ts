require("dotenv").config();
const mongoose = require("mongoose");

export const PORT = process.env.PORT || 5000;

export const connectDB = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI;
    await mongoose.connect(MONGO_URI);
    console.log(`MongoDB connected successfully to ${MONGO_URI}`);
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};
