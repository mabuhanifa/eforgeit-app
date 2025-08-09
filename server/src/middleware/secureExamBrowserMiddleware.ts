import { NextFunction, Request, Response } from "express";

// This is a bonus feature for Secure Exam Browser (SEB) support.
// SEB can be configured to send a specific header with a secret key.
const SEB_HEADER_KEY = process.env.SEB_HEADER_KEY || "X-Safe-Exam-Browser";
const SEB_HEADER_VALUE = process.env.SEB_HEADER_VALUE;

export const verifySEB = (req: Request, res: Response, next: NextFunction) => {
  // Bypass this check if the value is not set in environment variables (for development)
  if (!SEB_HEADER_VALUE) {
    return next();
  }

  const sebHeader = req.headers[SEB_HEADER_KEY.toLowerCase()];

  if (!sebHeader || sebHeader !== SEB_HEADER_VALUE) {
    return res.status(403).json({
      message: "This action must be performed within the Secure Exam Browser.",
    });
  }

  next();
};
