const Order = require("../../models/orders/index.js");
const Checkout = require("../../models/checkout/checkoutModel.js");

const getSuccessfulCheckouts = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Retrieve successful checkouts for the user
    const successfulCheckouts = await Checkout.find({ userId, paymentStatus: "Success" });

    res.status(200).json(successfulCheckouts);
  } catch (error) {
    console.error("Error retrieving successful checkouts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getOrderByUserId = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const order = await Order.findOne({ user: userId });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};

const updateOrderStatus = async (req, res) => {

  try {
    const userId = req.params.userId;
    // Retrieve successful checkouts for the user
    const successfulCheckouts = await Checkout.find({ userId, paymentStatus: "Success" });

    res.status(200).json(successfulCheckouts);
  } catch (error) {
    console.error("Error retrieving successful checkouts:", error);
    res.status(500).json({ message: "Internal server error" });
  }




   // Update order status for each successful checkout
   for (const checkout of successfulCheckouts) {
    // Update order status to "completed" for each successful checkout
    await Order.findOneAndUpdate(
      { _id: checkout.orderId }, // Assuming there's an orderId field in Checkout model
      { orderStatus: "completed" }
    );
  }
  };
  

const cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the order by userId
    const order = await Order.findById(id);

    if (!order) {
      throw new Error("Order not found");
    }

    // Check if order status is already in "Shipping" stage
    if (order.orderStatus === "shipping") {
      return res.status(400).json({
        error:
          "Cannot cancel order at this stage. It's already in Shipping stage.",
      });
    }

    // Update order status to "Cancelled"
    const updatedOrder = await Order.findOneAndUpdate(
      { _id: id, orderStatus: { $ne: "Cancelled" } }, // Ensure order is not already cancelled
      { orderStatus: "Cancelled" }, // Update order status to "Cancelled"
      { new: true }
    );

    if (!updatedOrder) {
      throw new Error("Order not found or already cancelled");
    }

    // Return the data in the specified format
    const responseData = {
      userId: updatedOrder.userId,
      paymentStatus: updatedOrder.paymentStatus,
      checkoutId: updatedOrder.checkoutId,
      orderStatus: updatedOrder.orderStatus,
      totalAmount: updatedOrder.totalAmount,
    };

    res.status(200).json(responseData);
  } catch (error) {
    console.error("Error cancelling order:", error.message);
    res.status(500).json({ error: "Error cancelling order" });
  }
};


module.exports = {
  getSuccessfulCheckouts,
  updateOrderStatus,
  getOrderByUserId,
  cancelOrder,
};
