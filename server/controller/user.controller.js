import { UserSchema } from "../model/user.model.js";

export const getAllUser = async (req, res) => {
  try {
    const user = await UserSchema.find({
      _id: { $ne: req.user.id },
    }).select("-password");

    return res.status(200).json({
      message: "Get All User",
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server Error",
    });
  }
};
