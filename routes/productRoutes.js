const express = require("express")
const router = express.Router();
const { getProducts, getProduct, getProductsByCategory, createProduct, updateProduct,rateSingleProduct, getSingleProductRating, deleteProduct } = require("../controllers/product/productController.js")
const { verifyAccessToken } = require("../helpers/jwt_helper.js");


router.get('/products', verifyAccessToken, getProducts);

router.get('/products/:id', verifyAccessToken, getProduct)

router.get('/products/category/:categoryId', verifyAccessToken, getProductsByCategory)

router.post('/products',  verifyAccessToken, createProduct)

router.post('/products/:id/ratings',  verifyAccessToken, rateSingleProduct)

// router.get('/products/:productId/ratings',  verifyAccessToken, getSingleProductRating)

router.put('/products/:id',  verifyAccessToken, updateProduct)

router.delete('/products/:id',  verifyAccessToken, deleteProduct)

module.exports = router