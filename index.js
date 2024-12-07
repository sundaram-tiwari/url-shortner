const express = require('express');
const dotenv = require('dotenv');
const path = require('path')
const connectMongoDB = require('./connect');
const URL = require('./models/urlModel');

dotenv.config();

const app = express();

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

connectMongoDB();
const PORT = 8000;

app.use('/url', require('./routes/urlRoute'));
app.use('/', require('./routes/staticRouter'));

app.get('/url/:shortId', async (req, res) => {
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

app.get('/test', (req, res) => {
    return res.render('home')
})

app.listen(PORT, () => {
    console.log(`Server is connected to PORT ${PORT} Successfully`);
});