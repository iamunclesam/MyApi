const express = require("express")
const router = express.Router();
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct } = require("../controllers/product/productController.js")

router.get('/products', getProducts);

router.get('products/:id', getProduct)

router.post('/products', createProduct)

router.put('products/:id', updateProduct)

router.delete('products/:id', deleteProduct)

module.exports = router