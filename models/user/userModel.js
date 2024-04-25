const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Pls enter Full name"],
    },

    email: {
      type: String,
      required: true,
    },

    phone: {
      type: Number,
      required: true,
    },

    age: {
      type: Number,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema)

module.exports = User