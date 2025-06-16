import express from "express";
import {
  getMyFriends,
  RecommendedUsers,
  SendFriendRequest,
  AcceptFriendRequest,
  getFriendRequest,
  outgoingFriendRequest,
} from "../controller/user.controller.js";
import protectedRoute from "../middleware/protectedRoute.js";
const userRoutes = express.Router();

userRoutes.get("/recommend", protectedRoute, RecommendedUsers);
userRoutes.get("/friends", protectedRoute, getMyFriends);

userRoutes.post("/friendsrequest/:id", protectedRoute, SendFriendRequest);
userRoutes.put("/accept-request/:id", protectedRoute, AcceptFriendRequest);

userRoutes.get("/friend-requests", protectedRoute, getFriendRequest);
userRoutes.get(
  "/outgoing-friend-requests",
  protectedRoute,
  outgoingFriendRequest
);

export default userRoutes;
