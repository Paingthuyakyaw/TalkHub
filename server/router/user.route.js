import express from "express";
import { getAllUser, getByUser } from "../controller/user.controller.js";

const userRouter = express.Router();

userRouter.get("/users", getAllUser);
userRouter.get("/users/:id", getByUser);

export default userRouter;
