const express = require("express")
const router = express.Router();
const { createOrdersFromCheckouts, updateOrderStatus, cancelOrder } = require("../controllers/order/index.js")
const { verifyAccessToken } = require("../helpers/jwt_helper.js");


// router.get('/orders', verifyAccessToken, getAllOrders );

// Route to update order status
router.patch('/orders/:id/update-status', verifyAccessToken, updateOrderStatus);

router.get('/orders/:id/cancel-order', verifyAccessToken, cancelOrder);

module.exports = router;