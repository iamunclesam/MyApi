const createHttpError = require("http-errors");
const User = require("../../models/User/userModel.js");
const { authSchema } = require("../../helpers/validate_schema.js");
const { signAccessToken, signRefreshToken } = require("../../helpers/jwt_helper.js");

const createNewUser = async (req, res) => {
  try {
    const result = await authSchema.validateAsync(req.body);
    const doesExist = await User.findOne({ email: result.email });

    if (doesExist) throw createHttpError.Conflict(`${email} is already registered`);

    const user = new User(result);
    const savedUser = await user.save();
    const accessToken = await signAccessToken(savedUser.id)
    const refreshToken = await signRefreshToken(savedUser.id)

    res.send({accessToken, refreshToken})

  } catch (error) {
    if(error.isJoi === true) error.status = 422
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const result = await authSchema.validateAsync(req.body);
    
    const user = await User.findOne({ email:result.email
    })

    if(!user) throw createHttpError.NotFound("User not registered")

    const isMatch = await user.isValidPassword(result.password)

    if(!isMatch) throw createHttpError.Unauthorized("Email or password not valid")

    const accessToken = await signAccessToken(user.id)
    const refreshToken = await signRefreshToken(user.id)
    res.send({accessToken, refreshToken})

  } catch (error) {
    if(error.isJoi == true) return next(createHttpError.BadRequest("Invalid Email/Password"))
    next(error);
  }
};

const getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUserById = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  createNewUser,
  loginUser,
  getAllUser,
  getUserById,
  updateUserById,
  deleteUserById
}


