const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

router.post("/buy", async (req, res) => {
  await new Order({
    productName: req.body.name,
    price: req.body.price
  }).save();

  res.redirect("/orders");
});

router.get("/orders", async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.render("orders", { orders });
});

module.exports = router;