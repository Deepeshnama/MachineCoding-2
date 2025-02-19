import express from "express";
import { loginUser, registerUser } from "../controllers/user.controllers.js";

const UserRouter = express.Router();

UserRouter.post("/register", registerUser);

UserRouter.post("/login", loginUser);

export default UserRouter;
