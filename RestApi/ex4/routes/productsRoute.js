const router = require('express').Router();
const ProductsController = require('../controllers/productsController');
router.get('/',ProductsController.getAllProducts);
router.post('/', ProductsController.createNewProduct);
router.get('/:id', ProductsController.getProductById);
router.put('/:id', ProductsController.editProduct);
router.delete('/:id', ProductsController.deleteProduct);
module.exports = router;