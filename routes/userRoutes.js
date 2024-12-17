const express = require('express');
const { userSignupController, userLoginController } = require('../controller/userController');

const router = express.Router();

router.post('/signup', userSignupController);

router.post('/login',userLoginController);

module.exports = router;