import express from "express";
import dotenv from "dotenv";
import dbConnection from "./config/db.js";
import UserRouter from "./routes/user.routes.js";

const PORT = process.env.PORT || 1900;

const app = express();

app.use(express.json());

app.use("/api", UserRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on PORT : ${PORT}`);
  dbConnection();
});
