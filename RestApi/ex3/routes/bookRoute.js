const router = require('express').Router();
const bookController = require('../controllers/booksController');
const veriftJwt = require('../middlewares/authMiddleware');
router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);
router.post('/',veriftJwt, bookController.createNewBook);
router.put('/:id', veriftJwt,bookController.editBook);
router.delete('/:id', veriftJwt,bookController.deleteBook);
module.exports = router;
