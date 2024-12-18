const shortid = require('shortid');
const URL = require('../models/urlModel');

const generateNewShortUrlHandle = async (req, res) => {
    const { url } = req.body;
    if (!url) {
        return res.redirect('/home');
    }

    const shortID = shortid();
    await URL.create({
        shortId: shortID,
        redirectUrl: url,
        visitHistory: [],
        createdBy: req.user._id
    })

    return res.render('home', {
        id: shortID,
    })
}

const deleteUrlHandle = async (req, res) => {
    const { shortID } = req.params.shortID;

    try {
        const result = await URL.findOneAndDelete({ shortID });

        if (result) {
            res.status(200).send({
                success: true,
                message: 'URL deleted successfully'
            });
        } else {
            res.status(404).send({
                success: false,
                message: 'URL not found'
            });
        }
    } catch (error) {

        res.status(500).send({
            success: false,
            message: 'Error deleting URL'
        });
    }
}

const deleteAllUrlHandle = async (req, res) => {
    const createdBy = req.user._id;

    try {
        const result = await URL.deleteMany({ createdBy });

        if (result) {
            res.status(200).send({
                success: true,
                message: 'URLs deleted successfully'
            });
        } else {
            res.status(404).send({
                success: false,
                message: 'URL not found'
            });
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error deleting all url'
        });
    }
}

module.exports = {
    generateNewShortUrlHandle,
    deleteUrlHandle,
    deleteAllUrlHandle
}

