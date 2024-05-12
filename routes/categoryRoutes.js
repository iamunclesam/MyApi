const express = require("express")
const router = express.Router();
const { createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory } = require("../controllers/category/index.js")
const { verifyAccessToken } = require("../helpers/jwt_helper.js");

router.get('/categories', verifyAccessToken, getAllCategories);

router.get('/categories/:id', verifyAccessToken, getCategoryById)

router.post('/categories', verifyAccessToken, createCategory)

router.put('/categories/:id', verifyAccessToken, updateCategory)

router.delete('/categories/:id', verifyAccessToken, deleteCategory)

module.exports = router