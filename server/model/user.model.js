import mongoose from "mongoose";

const userModel = new mongoose.Schema(
  {
    username: {
      required: true,
      type: String,
    },
    email: {
      required: true,
      type: String,
      unique: true,
    },
    gender: {
      required: true,
      type: String,
      enum: ["male", "female"],
    },
    password: {
      required: true,
      type: String,
    },
    avatar: {
      required: true,
      type: String,
      default: "https://github.com/evilrabbit.png",
    },
  },
  { timestamps: true }
);

export const UserSchema = mongoose.model("User", userModel);
