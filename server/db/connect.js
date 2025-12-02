import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MOGODB_URL);
    console.log("MongoDB connected");
  } catch (err) {
    console.log(err, "fail");
  }
};
