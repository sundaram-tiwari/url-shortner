const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cookieParser = require('cookie-parser');
const connectMongoDB = require('./connect');
const URL = require('./models/urlModel');
const { checkAuth } = require('./middleware/authMiddleware');

dotenv.config();

const app = express();

app.set("view engine", "ejs");
app.set("views", path.resolve("./public/views"));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

connectMongoDB();

app.use('/url',checkAuth,require('./routes/urlRoute'));
app.use('/', require('./routes/staticRouter'));
app.use('/',require('./routes/userRoutes'));

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

app.listen(process.env.PORT);