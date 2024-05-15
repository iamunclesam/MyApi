const express = require("express")
const router = express.Router();
const { checkoutCartItems } = require("../controllers/checkout/index.js")
const { verifyAccessToken } = require("../helpers/jwt_helper.js")

router.post("/checkout", verifyAccessToken, checkoutCartItems)



module.exports = router