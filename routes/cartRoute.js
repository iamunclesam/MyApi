const express = require("express")
const router = express.Router();
const {getAllCart, addToCart, getCartByUserId, deleteCartById} = require("../controllers/cart/index.js")
const { verifyAccessToken } = require("../helpers/jwt_helper.js");

router.post("/cart", verifyAccessToken, addToCart)
router.get("/cart", verifyAccessToken, getAllCart)
router.get('/cart/:userId', getCartByUserId);
router.delete('/cart/:id', deleteCartById);

module.exports = router;