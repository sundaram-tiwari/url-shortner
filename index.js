const express = require('express');
const dotenv = require('dotenv');
const connectMongoDB = require('./connect');
const URL = require('./models/urlModel');

dotenv.config();

const app = express();

app.use(express.json())

connectMongoDB();
const PORT = 8000;

app.use('/', require('./routes/urlRoute'));

app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({ shortId },
        {
            $push: {
                visitHistory: {
                    timeStamp: Date.now(),
                },
            },
        }
    )
    res.redirect(entry.redirectUrl);
});

app.listen(PORT, () => {
    console.log(`Server is connected to PORT ${PORT} Successfully`);
});