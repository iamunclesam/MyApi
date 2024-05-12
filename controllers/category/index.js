const Category = require("../../models/category/categoryModel.js")

const createCategory = async (req, res) => {
    try {
      const category = await Category.create(req.body);
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find({})
        res.status(200).json(categories)
    } catch (error) {
        res.status(500).json({message: error.message})
        console.log(error);
    }
}

const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id)
        res.status(200).json(category)
    } catch (error) {
        res.status(500).json({message: error.message})
        console.log(error);
    }
}

const updateCategory = async (req, res) => {
    try {
      const { _id } = req.params;
      const category = await Category.findByIdAndUpdate(_id, req.body);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      const updatedCategory = await Category.findById(_id); // Corrected to use Category model
      res.status(200).json({ message: "Category updated successfully", category: updatedCategory });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  

const deleteCategory  = async (req, res) => {
    try {
        const {id} = req.params;
        const category = await Category.findByIdAndDelete(id, req.body);
        if(!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        const updatedCategory = await Product.findById(id);
        res.status(200).json({ data: updatedCategory, message: "Category deleted successfully" });
    } catch (error) {
        res.status(500).json({message: error.message})
        console.log(error);
    }
}

module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
}