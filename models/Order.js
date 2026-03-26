const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  productName: String,
  price: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", orderSchema);