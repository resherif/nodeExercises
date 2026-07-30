const router = require('express').Router();
const registrationController = require('../controllers/registerationController');
const loginController = require('../controllers/loginController');
router.post('/register', registrationController);
router.post('/login', loginController);

module.exports = router;
