const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// HOME
router.get("/", async (req, res) => {
  const products = await Product.find().limit(4);
  res.render("index", { products });
});

// PRODUCTS
router.get("/products", async (req, res) => {
  const products = await Product.find();
  res.render("products", { products });
});

// PRODUCT DETAIL
router.get("/product/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.render("product", { product });
});

// ADD PRODUCT PAGE
router.get("/add-product", (req, res) => {
  res.render("add-product");
});

// ADD PRODUCT
router.post("/add-product", async (req, res) => {
  await new Product(req.body).save();
  res.redirect("/products");
});

// SEARCH
router.get("/search", async (req, res) => {
  const q = req.query.q;
  const products = await Product.find({
    name: { $regex: q, $options: "i" }
  });
  res.render("products", { products });
});

module.exports = router;