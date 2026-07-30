const Products = require('../model/db').Products;
const getAllProducts = async (req, res) => {
    try {
        const products = await Products.find();
        if (! products) return res.status(404).json({
            message: "No Products found!"
        });
        return res.status(200).json({
            message: 'All Products retrieved successfully!',
            data:  products
        });
    } catch (err) {
        return res.status(500).json({ message: " Internal server error! ", error: err.message });
    }
};
const getProductById = async (req, res) => { 
    try { 
         const { id } = req.params;
    const  products = await Products.findById(id);
        if (! products) return res.status(404).json({ message: " products not found!" });
        return res.status(200).json({
            message: ' products retrived successfully!',
            data: products
        })
    }catch(err){
        return res.status(500).json({ message: " Internal server error! ", error: err.message });
    }
}
const editProduct= async (req, res) => { 
    try { 
        const { id } = req.params;
        const {  product_title,price,stock,desc } = req.body;
        const UpdatedFields = {};
        if (product_title !== undefined) UpdatedFields.product_title = product_title;
        if (price !== undefined) UpdatedFields.price = price;
        if (stock !== undefined) UpdatedFields.stock = stock;
        if (desc !== undefined) UpdatedFields.desc = desc;

        const  products = await Products.findByIdAndUpdate(
            id, 
          { $set:UpdatedFields},
            { new: true, runValidators: true } 
        );

        if (! products) {
            return res.status(404).json({ message: ' products not found' });
        }

        return res.status(200).json({
            message: " products updated successfully!",
            data:  products
        });

    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};
const createNewProduct = async (req, res) => { 
    try { 
        const {  product_title,price,stock,desc } = req.body;

   if (!product_title||!price||!stock||! categories) {
            return res.status(400).json({ message: 'product_title,price,stock, categories are required' });
        }
        const newProduct = await Products.create({
            product_title,
            price,
        stock,
        desc,
            categories
        })
        if (!newProduct) return res.status(404).json({ message: 'Error creating new category! ' });
        return res.status(200).json({
            message: "category created successfully!",
            data: newProduct
        });
    }
    catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
        
};
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await Products.findByIdAndDelete(id);

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
module.exports = { getAllProducts, getProductById, editProduct, createNewProduct, deleteProduct };