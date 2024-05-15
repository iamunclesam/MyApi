const mongoose = require("mongoose");

const checkoutSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    billingDetails: [
      {
        firstName: {
          type: String,
          required: true
        },

        lastName: {
          type: String,
          required: true
        },

        email: {
          type: String,
          required: true
        },

        phone: {
          type: String,
          required: true
        },

        address: {
          type: String,
          required: true
        }
      }
    ],
  
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },

    paymentStatus: {
      type: String,
      required: true,
    },

    orderStatus: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Checkout = mongoose.model("Checkout", checkoutSchema);

module.exports = Checkout;
