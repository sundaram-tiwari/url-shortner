const express = require('express');
const { userSignupController, userLoginController, userLogoutController } = require('../controller/userController');

const router = express.Router();

router.post('/signup', userSignupController);

router.post('/',userLoginController);

router.delete('/logout',userLogoutController);

module.exports = router;