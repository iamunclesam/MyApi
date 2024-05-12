const express = require("express")
const router = express.Router();
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct } = require("../controllers/product/productController.js")
const { verifyAccessToken } = require("../helpers/jwt_helper.js");


router.get('/products', verifyAccessToken, getProducts);

router.get('/products/:id', verifyAccessToken, getProduct)

router.post('/products',  verifyAccessToken, createProduct)

router.put('/products/:id',  verifyAccessToken, updateProduct)

router.delete('/products/:id',  verifyAccessToken, deleteProduct)

module.exports = router