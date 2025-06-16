import { configDotenv } from "dotenv";
import jwt from "jsonwebtoken";
configDotenv();
export const GenerateToken = async (userId, res) => {
  const token = jwt.sign({ userId }, process.env.SECRETE_KEY);
  res.cookie("jwt", token, {
    maxAge: 24 * 60 * 60 * 10000,
    samesite: "strict",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
  return res;
};
