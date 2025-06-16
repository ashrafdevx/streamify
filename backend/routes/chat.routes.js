import express from "express";
import protectedRoute from "../middleware/protectedRoute.js";
export const chatRoutes = express.Router();

chatRoutes.get("/stram-token", protectedRoute, getStreamToken);
