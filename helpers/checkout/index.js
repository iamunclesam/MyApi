const Cart = require("../../models/cart/cartModel")


const calculateTotalAmount = (cartItems) => {
    let totalAmount = 0;
    cartItems.forEach((item) => {
      totalAmount += item.price * item.quantity;
    });
    return totalAmount;
  };
  

  const clearCart = async (userId, req, res) => {
    try {
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
          return res.status(404).json({ message: 'Cart not found' });
        }
        res.json(cart);
      } catch (error) {
        console.log(error)
      }
  };

  module.exports = {
    calculateTotalAmount,
    clearCart
  }