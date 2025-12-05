import express from "express";
import { connectDb } from "./db/connect.js";
import dotenv from "dotenv";
import authRouter from "./router/auth.route.js";
import { verifyToken } from "./middleware/verify-token.js";
import messageRouter from "./router/message.route.js";
import userRouter from "./router/user.route.js";
import { app, server } from "./socket/message.socket.js";
import cors from "cors";

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*", // frontend URL
    credentials: true, // cookies or auth headers allow
  })
);

app.get("/", (req, res) => res.status(200).json({ message: "HELLO GUY" }));
app.get("/api/me", verifyToken, (req, res) =>
  res.status(200).json({ message: "success", data: req.user })
);

app.use("/api/auth", authRouter);
app.use("/api/message", verifyToken, messageRouter);
app.use("/api", verifyToken, userRouter);
connectDb();
server.listen(3000, () => {
  console.log("Localhost : 3K");
});
