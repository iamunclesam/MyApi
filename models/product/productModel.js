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
      required: true
    },

    ratings: [
      {
        value: {
          type: Number,
          required: true,
          min: 1,
          max: 5,
          default: 1,
        }
      }
    ]
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", ProductSchema)

module.exports = Product