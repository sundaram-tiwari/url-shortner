const userModel = require("../models/userModel");
const bcrypt = require('bcryptjs');
const {v4: uuidv4} = require('uuid');
const { setUser } = require("../utils/auth");

const userSignupController = async (req, res) => {
    try {
        const { userName, phone, email, password } = req.body;
        if (!userName || !phone || !email || !password) {
            return res.render('signup',{
                msg:'Please Provide required fields'
            });
        }

        const isMatch = await userModel.findOne({ email });
        if (isMatch) {
            return res.render('signup',{
                msg:'User already registered please login'
            });
        }
        //hasing password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await userModel.create({
            userName,
            phone,
            email,
            password: hashedPassword
        });
        return res.redirect('/');
    } catch (error) {
        console.log(error);
        return res.redirect('/signup');
    }
}

const userLoginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.render('login',{
                msg:'Please Provide Email and Password'
            });
        }

        const user = await userModel.findOne({ email })
        if (!user) {
            return res.render('login', {
                msg: 'User Not Found'
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.render('login', {
                msg: 'Incorrect Password'
            })
        }

        const sessionId = uuidv4();
        setUser(sessionId, user);
        res.cookie("uid",sessionId);
        return res.redirect('/');

    } catch (error) {
        console.log(error);
        return res.redirect('/login');
    }
}

module.exports = { userSignupController, userLoginController };