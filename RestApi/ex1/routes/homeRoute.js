const bookController = require('../controllers/api');
const router = require("express").Router();
router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);
router.post('/', bookController.addBooks);
router.put('/', bookController.editBook);
router.delete('/:id', bookController.deleteBook);