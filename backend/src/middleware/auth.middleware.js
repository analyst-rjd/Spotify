import { clerkClient } from "@clerk/express";

export const protectRoute = async (req, res, next) => {
  if (!req.auth.userId) {
    return res
      .status(401)
      .json({ message: "Unauthorized - You must be logged in" });
  }
  next();
};

export const requireAdmin = async (req, res, next) => {
  try {
    const currentUser = await req.auth.userId;
    const isAdmin =
      process.env.ADMIN ===
      (await currentUser.primaryEmailAddress?.emailAddress);

    if (!isAdmin) {
      return res
        .status(403)
        .json({ message: "Forbidden - You must be an admin" });
    }
    next();
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
