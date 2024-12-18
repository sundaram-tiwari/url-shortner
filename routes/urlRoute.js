const express = require('express');
const { generateNewShortUrlHandle, deleteUrlHandle, deleteAllUrlHandle } = require('../controller/url');
const { showLoginUserHistoryOnly, checkAuth } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/',showLoginUserHistoryOnly,generateNewShortUrlHandle);

router.delete('/deleteUrl/:shortID',showLoginUserHistoryOnly,deleteUrlHandle);

router.delete('/deleteAllUrl',checkAuth,deleteAllUrlHandle);

module.exports = router;