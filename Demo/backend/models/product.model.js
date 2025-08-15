const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  stock: {
    type: Number,
    required: true,
    min: 0
  },
  brand: {
    type: String,
    required: true,
    trim: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // This should match your User model name
  }
}, { timestamps: true });

const ProductModel = mongoose.model("Product", productSchema);

module.exports=ProductModel