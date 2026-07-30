const Categories = require('../model/db').Categories;
const getAllCategories = async (req, res) => {
    try {
        const categories = await Categories.find();
        if (!categories) return res.status(404).json({
            message: "No categories found!"
        });
        return res.status(200).json({
            message: 'All categories retrieved successfully!',
            data: categories
        });
    } catch (err) {
        return res.status(500).json({ message: " Internal server error! ", error: err.message });
    }
};
const getCategoryById = async (req, res) => { 
    try { 
         const { id } = req.params;
    const category = await Categories.findById(id);
        if (!category) return res.status(404).json({ message: "category not found!" });
        return res.status(200).json({
            message: 'category retrived successfully!',
            data:category
        })
    }catch(err){
        return res.status(500).json({ message: " Internal server error! ", error: err.message });
    }
}
const editCategory = async (req, res) => { 
    try { 
        const { id } = req.params;
        const { category_name } = req.body;

        if (!category_name) {
            return res.status(400).json({ message: 'Category name is required' });
        }

        const category = await Categories.findByIdAndUpdate(
            id, 
            { category_name: category_name },
            { new: true, runValidators: true } 
        );

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        return res.status(200).json({
            message: "Category updated successfully!",
            data: category
        });

    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};
const createNewCategory = async (req, res) => { 
    try { 
        const { category_name } = req.body;
   if (!category_name) {
            return res.status(400).json({ message: 'Category name is required' });
        }
        const newCategory = await Categories.create({
        category_name:category_name
        })
        if (!newCategory) return res.status(404).json({ message: 'Error creating new category! ' });
        return res.status(200).json({
            message: "category created successfully!",
            data: newCategory
        });
    }
    catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
        
};
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Categories.findByIdAndDelete(id);

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        return res.status(200).json({
            message: "Category deleted successfully!",
            data: category
        });

    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};
module.exports = { getAllCategories, getCategoryById, editCategory, createNewCategory, deleteCategory };