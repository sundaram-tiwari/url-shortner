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
    ],
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
}, { timestamps: true })

const URL = mongoose.model('Url',urlSchema);

module.exports = URL;