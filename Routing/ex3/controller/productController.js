const products = require('../model/products.json');
const getAllProducts = (req, res) => { 
    res.json({
       " message": "All Products injected",
        success: true,
        products
    })
}
const addProduct = (req, res) => { 
    const newProduct = req.body;
    products.push(newProduct);
    res.json({
       " message": "product added successfully",
        success: true,
    newProduct
    })
}
const getProductById = (req, res) => { 
    const { productId } = req.params;
    const product = products.filter((product) => product.id == productId);
    res.json({
       " message": "product Attached below",
        product
    })
}
// const updateProduct = (req, res) => { 
//  const { productId } = req.params;
// }
const deleteProduct = (req, res) => { 
    const { productId } = req.params;
    const newProductsArray = products.filter((product) => product.id != productId);
    const deletedProduct = products.filter((product) => product.id == productId);
    res.json({
        "message": "product deleted successfully",
        success: true,
        deletedProduct,
        newProductsArray
    })
}
const getDailyDeals = (req, res) => {
    res.json({
        "message":"discount 50%"
    })

}
module.exports = {
    getAllProducts,
    addProduct,
    getProductById,
getDailyDeals,
    deleteProduct,
}