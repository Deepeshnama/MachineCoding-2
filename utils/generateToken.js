import jwt from "jsonwebtoken";
import dotenv from "dotenv"

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      name: user.userName,
    },
    process.env.JWT_SECRET
  );
};

export default generateToken;
