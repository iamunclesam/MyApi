const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Pls enter product name"],
    },

    quantity: {
      type: Number,
      required: true,
      default: 0,
    },

    price: {
      type: Number,
      required: true,
    },

    image: {
      type: String,
      required: false,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    }
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", ProductSchema)

module.exports = Product