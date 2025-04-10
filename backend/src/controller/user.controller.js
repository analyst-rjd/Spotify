import { User } from "../models/user.model.js";
import { clerkClient } from "@clerk/express";

export const getAllUsers = async (req, res, next) => {
  try {
    const currentUser = await req.auth.userId;
    const users = await User.find({ clerkId: { $ne: currentUser } });
    res.status(200).json(users);
  } catch (error) {
    console.log("Error getting all users", error);
    next(error);
  }
};
