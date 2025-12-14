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

export const getByUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await UserSchema.findById(userId);

    return res.status(200).json({
      message: "user exits",
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server Error",
    });
  }
};
