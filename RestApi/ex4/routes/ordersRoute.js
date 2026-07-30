const router = require('express').Router();
const OrdersController = require('../controllers/ordersController');
router.get('/',OrdersController.getAllOrders);
router.post('/', OrdersController.createNewOrder);
router.get('/:id', OrdersController.getOrdersById);
router.put('/:id', OrdersController.editOrder);
router.delete('/:id', OrdersController.deleteOrder);
module.exports = router;