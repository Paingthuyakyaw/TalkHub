import expres from "express";
import { getMessage, sendMessage } from "../controller/message.controller.js";

const messageRouter = expres.Router();

messageRouter.post("/send", sendMessage);
messageRouter.get("/", getMessage);

export default messageRouter;
