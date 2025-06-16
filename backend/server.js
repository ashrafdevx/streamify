import express from "express";
import ConnectDB from "./lib/db.js";
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";
const app = express();

const PORT = process.env.PORT || 8000;

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    // methods: ["POST", "GET", "PUT"],
    credentials: true,
  })
);
// Routes
app.use("/api/auth/", authRoutes);
app.use("/api/", userRoutes);
app.use("/chat/", userRoutes);

app.listen(PORT, () => {
  ConnectDB();
  console.log(`server running on ${PORT}`);
});
