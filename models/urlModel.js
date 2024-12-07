const { timeStamp } = require('console');
const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true
    },
    redirectUrl: {
        type: String
    },
    visitHistory: [
        { timeStamp: { type: Number } }
    ]
}, { timestamps: true })

const URL = mongoose.model('Url',urlSchema);

module.exports = URL;