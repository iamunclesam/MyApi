const Checkout = require("../../models/checkout/checkoutModel");

const {
  calculateTotalAmount,
  clearCart,
} = require("../../helpers/checkout/index");

const checkoutCartItems = async (req, res) => {
  try {
    const { userId, billingDetails, paymentStatus, items } = req.body;

    // Calculate total order amount based on cart items
    const totalAmount = calculateTotalAmount(items);

    // Create order document
    const order = new Checkout({
      userId: userId,
      billingDetails: billingDetails,
      items: items,
      totalAmount: totalAmount,
      paymentStatus: paymentStatus, // from paystack popup
      orderStatus: "pending", // default status
    });

    const savedOrder = await order.save();

    await clearCart(userId);

    res
      .status(201)
      .json({ message: "Order placed successfully", order: savedOrder });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




module.exports = { checkoutCartItems };
