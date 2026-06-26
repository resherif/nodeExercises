const Product = require('../models/productModel');
const AddNewProduct = async (req, res) => {
    
    if (!req.body.name || !req.body.price) {
        return res.status(400).json({ error: "Name and price are required" });
    }
    const newProduct = new Product({
        name: req.body.name,
        price: req.body.price
    })
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
}
module.exports = AddNewProduct;