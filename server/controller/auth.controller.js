import { UserSchema } from "../model/user.model.js";
import { compare, hash } from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const exitUser = await UserSchema.findOne({ email });

    if (!exitUser) {
      return res.status(400).json({
        message: "You need to create account",
      });
    }

    const comparePassword = await compare(password, exitUser.password);

    if (!comparePassword) {
      return res.status(400).json({
        message: "email or password wrong",
      });
    }

    const token = jwt.sign(
      { id: exitUser._id, email: exitUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      message: "Login success",
      token,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server Error",
      error: err,
    });
  }
};

export const registerController = async (req, res) => {
  try {
    const { username, email, gender, password, avatar } = req.body;

    const exitUser = await UserSchema.findOne({ email });

    if (exitUser) {
      return res.status(400).json({
        message: "User already exits",
      });
    }

    const hashPassword = await hash(password, 10);

    const data = await UserSchema.create({
      username,
      email,
      gender,
      avatar: avatar || "https://github.com/evilrabbit.png",
      password: hashPassword,
    });

    data.save();

    return res.status(201).json({
      message: "User created",
      data,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server Error",
      error: err,
    });
  }
};
