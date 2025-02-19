import express from "express";
import {
  addProduct,
  deleteProduct,
  getProduct,
  updateProduct,
} from "../controllers/product.controller.js";

const productRouter = express.Router();

productRouter.post("/create", addProduct);

productRouter.get("/:id", getProduct);

productRouter.put("/:id", updateProduct);

productRouter.delete("/:id", deleteProduct);

export default productRouter;
