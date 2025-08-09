import generateToken from "../config/token.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signUp = async (req, res) => {
  try {
    let { firstName, lastName, userName, email, password } = req.body;

    let existingUser = await User.findOne({ email });
    let username = await User.findOne({ userName });

    if (existingUser || username) {
      return res
        .status(400)
        .json({ message: "Email or username already exists!" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      userName,
      email,
      password: hashedPassword,
    });

    let token = await generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });


    const userResponse = user.toObject();
    delete userResponse.password;

    return res.status(201).json({
        message: "User created successfully",
        user: userResponse
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Sign up error" });
  }
};

export const login = async (req, res) => {
  try {
    let { email, password } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User does not exist." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect Password." });
    }

    let token = await generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    const userResponse = user.toObject();
    delete userResponse.password;

    return res.status(200).json({
      message: "Login successful",
      user: userResponse,
    });
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "login error" });
  }
};

export const logOut = async (req, res) => {
  try {
  
    res.cookie("token", "", { httpOnly: true, expires: new Date(0) });

    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    return res.status(500).json({ message: "Logout error" });
  }
};