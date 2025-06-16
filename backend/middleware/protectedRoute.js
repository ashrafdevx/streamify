import { configDotenv } from "dotenv";
import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";
configDotenv();
const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token)
      return res.status(404).json({ message: "Unauthenticated - user!!!" });

    const decode = jwt.verify(token, process.env.SECRETE_KEY);
    const userId = decode?.userId;

    const user = await User.findById({ _id: userId }).select("-password");

    req.user = user;
    next();
  } catch (error) {
    console.error("Protected Route :", error.message);
    res.json({ message: "Server error" });
  }
};

export default protectedRoute;
