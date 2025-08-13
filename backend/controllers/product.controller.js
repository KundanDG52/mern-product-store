import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const getStatus = (req, res) => {
  res.send("API is running...");
};

export const getProductById = async (req, res) => {
  const { id } = req.params;
  // get product by ID
  try {
    const product = await Product.findById(id);
    // Validate product
    if (!product) {
      return res
        .status(404)
        .json({ success: false, messsage: "Product not found" });
    }
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    // Handle errors
    console.error("Error in Fetching Product:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getProducts = async (req, res) => {
  // get all products
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    // Handle errors
    console.error("Error in fetching products:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createProduct = async (req, res) => {
  const product = req.body; // user will send this data
  // Validate product data
  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "please provide all fields" });
  }
  const newProduct = new Product(product);
  // Save/Create product
  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    // Handle errors
    console.error("Error in Create Product:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  // Validate ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: " Invalid Product ID" });
  }
  // Validate product data
  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "please provide all fields" });
  }
  // Update product
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    // Handle errors
    console.error("Error in Updating Product:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Product ID" });
  }

  // Delete product
  try {
    await Product.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    // Handle errors
    console.error("Error in Deleting Product:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
