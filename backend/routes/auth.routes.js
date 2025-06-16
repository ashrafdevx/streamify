import express from "express";
import {
  Login,
  Register,
  Logout,
  Onboarding,
  checkAuth,
} from "../controller/auth.controller.js";
import protectedRoute from "../middleware/protectedRoute.js";
const authRoutes = express.Router();

authRoutes.post("/register", Register);
authRoutes.post("/login", Login);
authRoutes.post("/logout", Logout);
authRoutes.put("/onboarding", protectedRoute, Onboarding);
authRoutes.get("/me", protectedRoute, checkAuth);

export default authRoutes;
