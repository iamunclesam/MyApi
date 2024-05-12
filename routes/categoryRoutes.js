const express = require("express")
const router = express.Router();
const { createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory } = require("../controllers/category/index.js")


router.get('/categories', getAllCategories);

router.get('categories/:id', getCategoryById)

router.post('/categories', createCategory)

router.put('category/:id', updateCategory)

router.delete('categories/:id', deleteCategory)

module.exports = router