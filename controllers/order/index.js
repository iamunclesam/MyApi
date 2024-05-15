const Order = require("../../models/orders/index.js");
const Checkout = require("../../models/checkout/checkoutModel.js");

const createOrdersFromCheckouts = async (req, res) => {
  try {
    const checkout = await Checkout.findOne({ paymentStatus: "Success" });

    if (!checkout) {
      return res.status(404).json({ message: "No successful checkout found" });
    }

    // Create order using the entire checkout document
    const order = new Order({
      userId: checkout.userId,
      paymentStatus: checkout.paymentStatus,
      checkoutId: checkout.id,
      orderStatus: checkout.orderStatus,
      totalAmount: checkout.totalAmount,
    });

    // Save the order to the database
    const savedOrder = await order.save();

    res.status(200).json(savedOrder);
  } catch (error) {
    console.error("Error creating order:", error);
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
      const { id } = req.params;
      const { paymentStatus, checkoutId, orderStatus, totalAmount } = req.body;
  
      // Construct the query object to find the order by its _id
      const filter = { _id: id };
  
      // Update the order based on the provided fields
      const updatedOrder = await Order.findOneAndUpdate(
        filter,
        {
          paymentStatus: paymentStatus,
          checkoutId: checkoutId,
          orderStatus: orderStatus,
          totalAmount: totalAmount,
        },
        { new: true }
      );
  
      if (!updatedOrder) {
        throw new Error("Order not found");
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
      console.error("Error updating order status:", error.message);
      res.status(500).json({ error: "Error updating order status" });
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
  createOrdersFromCheckouts,
  updateOrderStatus,
  getOrderByUserId,
  cancelOrder,
};
