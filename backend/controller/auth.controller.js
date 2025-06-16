import { upsertStreamUser } from "../lib/stream.js";
import { User } from "../models/user.models.js";
import { GenerateToken } from "../utils/generateToken.js";
import bcrypt from "bcryptjs";

// Register
export const Register = async (req, res) => {
  try {
    const {
      fullname,
      email,
      password,
      bio,
      profilePic,
      nativeLanguage,
      learningLanguage,
      location,
    } = req.body;

    // Step 1: Check for empty required fields manually (extra layer)
    if (!fullname || !password || !email) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be greater then 6 charater." });
    }
    // Step 2: Check emailte formate
    const emailregx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailregx.test(email)) {
      return res.json({ message: "Invalid email format." });
    }
    // Step 3: Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already registered" });
    }

    const idx = Math.floor(Math.random() * 100) * 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

    const savedUser = await User.create({
      fullname,
      email,
      password,
      bio,
      profilePic: randomAvatar,
      nativeLanguage,
      learningLanguage,
      location,
    });

    // Stream User
    try {
      console.log(savedUser);
      await upsertStreamUser({
        id: savedUser._id.toString(),
        name: savedUser.fullname,
        image: savedUser.profilePic || "",
      });
    } catch (error) {
      console.log("Stream error for User :", error.message);
    }
    GenerateToken(savedUser._id, res);
    return res.status(201).json({ success: true, user: savedUser });
  } catch (error) {
    console.log("error in register ", error.message);
    res.json({ message: "server error in register" });
  }
};

//  Login
export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Step 1: Check for empty required fields manually (extra layer)
    if (!password || !email) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be greater then 6 charater." });
    }
    // Step 3: Check for existing user
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "User not registered" });
    }

    const isPasswordCorrect = await existingUser.matchPassword(password);

    if (!isPasswordCorrect)
      return res.status(404).json({ message: "Invalid Credentials" });

    await GenerateToken(existingUser._id, res);
    return res
      .status(200)
      .json({ message: "Login Successfuly", user: existingUser });
  } catch (error) {
    console.log("error in Login ", error.message);
    res.json({ message: "server error in Login" });
  }
};

// Logout
export const Logout = (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.status(200).json({ message: "Logout successfully." });
  } catch (error) {
    console.error("Error in Logout:", error.message);
    res.status(500).json({ message: "Server error during logout." });
  }
};

// Onboarding

export const Onboarding = async (req, res) => {
  try {
    const {
      fullname,
      bio,
      nativeLanguage,
      learningLanguage,
      location,
      isOnBoard,
    } = req.body;
    const { _id } = req.user;

    if (!fullname || !bio || !nativeLanguage || !learningLanguage || !location)
      return res.status(400).json({ message: "All field are required." });

    const updateUser = await User.findByIdAndUpdate(
      _id,
      {
        ...req.body,
        isOnBoard: true,
      },
      { new: true }
    );

    if (!updateUser) {
      return res.status(404).json({ message: "User not updated!!!." });
    }
    // Stream User
    try {
      await upsertStreamUser({
        id: updateUser._id.toString(),
        name: updateUser.fullname,
        image: updateUser.profilePic || "",
      });
    } catch (error) {
      res.json({ message: error.message });
      console.log("Stream error for User Updates:", error.message);
    }
    res.status(200).json({ message: "User Onboarded.", user: updateUser });
  } catch (error) {
    console.error("Onboard error ", error.message);
    res.json({ message: error.message });
  }
};

// me for authenticating route
export const checkAuth = async (req, res) => {
  try {
    return res.status(200).json({ user: req.user });
  } catch (error) {
    console.error("Check Auth error ", error.message);
    res.json({ message: error.message });
  }
};
