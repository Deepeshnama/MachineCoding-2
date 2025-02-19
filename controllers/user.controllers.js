import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import dotenv from "dotenv"

dotenv.config()

const registerUser = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
      return res.status(400).json("All fields are required");
    }

    if (password.length < 5) {
      return res.status(400).json("Password length should be greater than 5");
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json("Email Already Exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      userName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ msg: "User registered succesfully", user: newUser });
  } catch (error) {
    return res.status(500).json("Internal server error");
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

    // console.log(email , password)
    
  if (!email || !password) {
    return res.status(400).json("Invalid credentials");
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({
      msg: "Please register first",
    });
  } else {
    const isValiPassword = await bcrypt.compare(password, user.password);

    if (!isValiPassword) {
      return res.status(400).json({
        msg: "Invalid Password",
      });
    } else {
      res.status(200).json({
        msg: "Logged In succesfully",
        token: generateToken(user)
      });
    }
  }
};

export { registerUser, loginUser };
