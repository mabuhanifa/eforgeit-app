import { Request, Response } from "express";

export const getAdminDashboard = (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to the Admin Dashboard!",
    data: "This is protected data only for admins.",
  });
};
