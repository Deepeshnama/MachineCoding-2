import express, { response } from "express";
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

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedBody = req.body;

    const updateTheProduct = await Product.findByIdAndUpdate(id, updatedBody, {
      new: true,
    });

    if (!updateTheProduct) {
      return res.status(404).json({ msg: `Meal with ID ${id} not found` });
    }

    res.status(200).json({
      msg: `Data of a user whose ID ${id} is updated`,
      updateTheProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await MealModel.findByIdAndDelete(id);

    res.status(200).send(`Data of a user whose ID ${id} is deleted`);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export { addProduct, getProduct , updateProduct , deleteProduct };
