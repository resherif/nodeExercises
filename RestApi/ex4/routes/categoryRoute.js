const router = require('express').Router();
const CategoryController = require('../controllers/categoriesController');
router.get('/',CategoryController.getAllCategories);
router.post('/', CategoryController.createNewCategory);
router.get('/:id', CategoryController.getCategoryById);
router.put('/:id', CategoryController.editCategory);
router.delete('/:id', CategoryController.deleteCategory);
module.exports = router;