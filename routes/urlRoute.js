const express = require('express');
const { generateNewShortUrlHandle, deleteUrlHandle } = require('../controller/url');
const { showLoginUserHistoryOnly } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/',showLoginUserHistoryOnly,generateNewShortUrlHandle);

router.delete('/deleteUrl/:shortID',deleteUrlHandle);

module.exports = router;