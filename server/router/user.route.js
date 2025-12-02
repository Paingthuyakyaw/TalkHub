import express from "express";
import { getAllUser } from "../controller/user.controller.js";

const userRouter = express.Router();

userRouter.get("/users", getAllUser);

export default userRouter;
