const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")

const UserSchema = mongoose.Schema(
  {
    // fullName: {
    //   type: String,
    //   required: [true, "Pls enter Full name"],
    //   lowercase: true,
    //   unique: true
    // },

    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true
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

UserSchema.pre('save', async function (next) {
    try {
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(this.password, salt)
      this.password = hashedPassword;
      next()
    }

    catch(error) {
      next(error)
    }
})

UserSchema.methods.isValidPassword = async function (password) {
  try {
   return await bcrypt.compare(password, this.password)
  } catch (error) {
    throw error
    
  }
}

const User = mongoose.model("User", UserSchema)

module.exports = User