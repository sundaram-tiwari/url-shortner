const express = require('express');
const URL = require('../models/urlModel');
const { showLoginUserHistoryOnly } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/',async (req,res) =>{
    return res.render('home');
});

router.get('/url_history',showLoginUserHistoryOnly,showLoginUserHistoryOnly,async (req,res) =>{
    const allUrls = await URL.find({createdBy: req.user._id});
    return res.render('url_history',{
        urls : allUrls,
    });
});

router.get('/signup',async (req,res) =>{
    const allUrls = await URL.find({});
    return res.render('signup');
});

router.get('/login',async (req,res) =>{
    const allUrls = await URL.find({});
    return res.render('login');
});

module.exports = router;