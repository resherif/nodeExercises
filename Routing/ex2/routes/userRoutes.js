const userController = require('../controllers/users');
const router = require('express').Router();
router.route('/')
    .get(userController.getAllusers)
    .post(userController.AddUser)
router.route('/:userId')
    .get((req, res, next) => {
        if (req.params.userId == '0') { 
           return next('route');
        }
        userController.UserDisplay(req, res)
    })
    router.get('/:userId',userController.getSuperAdminDetails)
module.exports = router;
