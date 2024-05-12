const Cart = require("../../models/cart/cartModel")

const getAllCart = async (req, res) => {
    try {
      const carts = await Cart.find({})
    res.status(200).json(carts)
    } catch (error) {
      res.status(500).json({ message: error.message });
    console.log(error);
    }
}

const addToCart = async (req, res) => {
    try {
        const cart = await Cart.create(req.body);
        res.status(201).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getCartByUserId = async (req, res, next) => {
    try {
      const userId = req.params.userId;
      const cart = await Cart.findOne({ user: userId });
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
      res.json(cart);
    } catch (error) {
      next(error);
    }
  };

  const deleteCartById = async (req, res, next) => {
    try {
      const cartId = req.params.cartId;
      const deletedCart = await Cart.findByIdAndDelete(cartId);
      if (!deletedCart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
      res.json({ message: 'Cart deleted successfully' });
    } catch (error) {
      next(error);
    }
  };

module.exports = {
    addToCart,
    getCartByUserId,
    deleteCartById,
    getAllCart
}