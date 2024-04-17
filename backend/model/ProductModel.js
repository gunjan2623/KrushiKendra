const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  Vendor_Email: {
    type: String,
    required: true,
  },
  Product_name: {
    type: String,
    required: true,
  },
  Product_category: {
    type: String,
    required: true,
  },
  filename: {
    type: String,
    default: "default",
  },
  img: {
    data: Buffer,
    contentType: String,
  },
  Vendor_address: {
    type: String,
    required: true,
  },
  Product_price: {
    type: Number,
    required: true,
  },
  Product_quantity: {
    type: Number,
    required: true,
  },
});

const ProductModel = mongoose.model("Product", ProductSchema);

module.exports = ProductModel;
