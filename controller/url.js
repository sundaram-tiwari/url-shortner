const shortid = require('shortid');
const URL = require('../models/urlModel');

const generateNewShortUrlHandle = async (req, res) => {
    const { url } = req.body;
    if (!url) {
        return res.status(400).json({
            error: 'Url is required'
        })
    }

    const shortID = shortid();
    await URL.create({
        shortId: shortID,
        redirectUrl: url,
        visitHistory: [],
        createdBy: req.user._id
    })

    return res.render('home',{
        id: shortID, 
    })
}

const getUrlAnalytics = async (req, res) => {
    try {
        const shortId = req.params.shortId;
        if (!shortId) {
            return res.status(400).json({
                error: 'Short Id is required'
            })
        }

        const result = await URL.findOne({shortId});
        return res.status(200).json({
            totalVisits: result.visitHistory.length,
            analytics: result.visitHistory
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error in get url analytics'
        })
    }
}

module.exports = {
    generateNewShortUrlHandle,
    getUrlAnalytics
}