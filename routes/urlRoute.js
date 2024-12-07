const express = require('express');
const { generateNewShortUrlHandle, getUrlAnalytics } = require('../controller/url');

const router = express.Router();

router.post('/',generateNewShortUrlHandle);

router.get('/analytics/:shortId',getUrlAnalytics);

module.exports = router;