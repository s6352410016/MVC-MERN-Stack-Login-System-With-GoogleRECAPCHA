const router = require('express').Router();
const controller = require('../controllers/userController');

router.post('/register' , controller.register);
router.post('/login' , controller.login);
router.get('/auth' , controller.auth);
router.put('/forgotpassword' , controller.forgotPassword);

module.exports = router;