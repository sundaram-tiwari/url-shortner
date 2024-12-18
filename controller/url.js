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
            res.status(200).json({ message: 'URL deleted successfully' });
        } else {
            res.status(404).json({ message: 'URL not found' });
        }
    } catch (error) {   
        console.log(error)
        res.status(500).json({ message: 'Error deleting URL' });
    }
}   

module.exports = {
    generateNewShortUrlHandle,
    deleteUrlHandle
}

