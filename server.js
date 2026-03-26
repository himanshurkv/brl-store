const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
require("dotenv").config();

const app = express();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use(session({
  secret: "brl-secret",
  resave: false,
  saveUninitialized: true
}));

app.use((req, res, next) => {
  if (!req.session.cart) req.session.cart = [];
  next();
});

const Product = require("./models/Product");
const Order = require("./models/Order");

// HOME
app.get("/", async (req, res) => {
  const products = await Product.find().limit(4);
  res.render("index", { products });
});

// PRODUCTS
app.get("/products", async (req, res) => {
  const products = await Product.find();
  res.render("products", { products });
});

// SEARCH
app.get("/search", async (req, res) => {
  const q = req.query.q || "";
  const products = await Product.find({
    name: { $regex: q, $options: "i" }
  });
  res.render("products", { products });
});

// PRODUCT PAGE
app.get("/product/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.render("product", { product });
});

// ADD TO CART
app.post("/add-to-cart", (req, res) => {
  const { name, price, qty } = req.body;

  req.session.cart.push({
    name,
    price: Number(price),
    qty: Number(qty)
  });

  res.redirect("/cart");
});

// CART PAGE
app.get("/cart", (req, res) => {
  res.render("cart", { cart: req.session.cart });
});

// PAYPAL SUCCESS
app.post("/paypal-success", async (req, res) => {
  const { cart } = req.body;

  if (Array.isArray(cart)) {
    for (const item of cart) {
      await new Order({
        productName: `${item.name} x${item.qty}`,
        price: Number(item.price) * Number(item.qty)
      }).save();
    }
  }

  req.session.cart = [];
  res.json({ success: true });
});

// ORDERS
app.get("/orders", async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.render("orders", { orders });
});

app.listen(3000, () => console.log("http://localhost:3000"));