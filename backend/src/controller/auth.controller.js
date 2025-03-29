import { User } from "../models/user.model.js";

export const authCallback = async (req, res, next) => {
  try {
    const { id, firstName, lastName, imageUrl } = req.body;

    let user = await User.findOne({ clerkId: id });

    if (!user) {
      try {
        user = await User.create({
          clerkId: id,
          fullName: `${firstName} ${lastName}`,
          imageUrl: imageUrl,
        });
      } catch (dbError) {
        if (dbError.code === 11000) {
          return next({ status: 400, message: "User already exists" });
        }
        return next(dbError); // Pass other errors to middleware
      }
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    next(error); // Pass error to middleware
  }
};
