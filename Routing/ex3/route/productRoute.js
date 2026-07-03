const router = require('express').Router();
const productController = require('../controller/productController');
const Productcontroller = require('../controller/productController');
router.route('/')
    .get(Productcontroller.getAllProducts)
    .post(Productcontroller.addProduct)
router.route('/:productId')
    .get((req, res, next) =>
    {
        if (req.params.productId == 'today-deals') { 
           return next('route');
        }
        Productcontroller.getProductById(req, res)
    })
        
    // .put(Productcontroller.updateProduct)
    .delete(Productcontroller.deleteProduct)
router.get('/:productId', productController.getDailyDeals)
module.exports = router;
