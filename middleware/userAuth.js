import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const roleAuth = async (req, res) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized access : Token is missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      res.status(401).json({ message: "Unauthorized access : Invalid token" });
    }

    const authUser = await User.findById(decoded.id);

    if (!authUser) {
      return res.status(404).json({ message: "User not found" });
    }

    next();
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

export default roleAuth;
