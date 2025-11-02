const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// GET /products - fetch all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 }).lean();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// POST /products - add a new product
router.post("/", async (req, res) => {
  try {
    const { name, description, price, inStock } = req.body;
    const product = new Product({ name, description, price, inStock });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error(err);

    res.status(400).json({ error: "Invalid data" });
  }
});

// PUT /products/:id - update a product
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;
    const product = await Product.findByIdAndUpdate(id, update, { new: true });
    if (!product) return res.status(404).json({ error: "Not found" });
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Invalid request" });
  }
});

// DELETE /products/:id - delete a product
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const removed = await Product.findByIdAndDelete(id);
    if (!removed) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Invalid request" });
  }
});

module.exports = router;
