import express from "express";
import Product from "../models/product.model.js";

const addProduct = async (req, res) => {
  try {
    const { title, description, quantity, price } = req.body;

    const product = new Product({
      title,
      description,
      quantity,
      price,
    });

    await product.save();

    // console.log("Product added");

    res.status(201).json({ message: "Product added succesfully" });
  } catch (error) {
    res.status(400).json("Something went wrong");
  }
};

const getProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await Product.findById(id);

    if (!data) {
      return res.status(400).json("Meal not found");
    }

    return res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export { addProduct , getProduct };
