import { ConversationSchema } from "../model/conversation.model.js";
import { MessageSchema } from "../model/message.model.js";
import { getReceiverId, io } from "../socket/message.socket.js";

export const sendMessage = async (req, res) => {
  try {
    const { message, receiverId } = req.body;
    const senderId = req.user.id;

    // return res.json({
    //   message,
    //   receiverId,
    // });

    let charts = await ConversationSchema.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!charts) {
      charts = await ConversationSchema.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new MessageSchema({
      senderId,
      receiverId,
      message,
      conversationId: charts._id,
    });

    if (newMessage) {
      charts.message.push(newMessage._id);
    }

    await Promise.all([charts.save(), newMessage.save()]);

    const receiverIdData = getReceiverId(receiverId);
    if (receiverIdData) {
      io.to(receiverIdData).emit("newMessage", newMessage);
    }

    res.status(201).json({
      message: "Send Message",
      data: newMessage,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server Error",
      err,
    });
  }
};

export const getMessage = async (req, res) => {
  try {
    const { receiverId } = req.query;
    const senderId = req.user.id;

    const charts = await ConversationSchema.findOne({
      participants: [senderId, receiverId],
    })
      .populate("message", "message receiverId senderId ")
      .populate("participants", "username email");

    if (!charts) {
      return res.status(400).json({
        message: "U are bad 😩",
      });
    }

    return res.status(200).json({
      message: "Fetched successfully",
      data: charts,
    });
  } catch (err) {
    return res.status(500).json({
      message: "မလုပ်ပါနဲ့ မလုပ်ပါနဲ့",
      err,
    });
  }
};
