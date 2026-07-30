const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const users = require('../model/db').Users;
const loginUser = async (req, res) => { 
    const { email, password } = req.body;

    if (!email || !password) return res.json("Both fields are required!");

    const MatchUser = await users.findOne({ email: email })

    if (!MatchUser) return res.status(401).json({ message: "No matching user found !" });

    const comparePassword = await bcrypt.compare(password, MatchUser.password);

    if (!comparePassword) return res.status(401).json({ message: "Wrong password!" });

    const accessToken = jwt.sign({
        user_id: MatchUser._id,

    },
        process.env.ACCESS_TOKEN_SECRET,

        { expiresIn: '15min' });

    const refreshToken = jwt.sign(
        {
        user_id: MatchUser._id,

         },
        process.env.REFRESH_TOKEN_SECRET,

        { expiresIn: '1d' });

    res.cookie('jwt', refreshToken, {

        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
        path: '/',
        maxAge: 24 * 60 * 60 * 1000

    });

    res.status(200).json({
        message:"Logged in successfully !",
        user: {
            username: MatchUser.username,
            email:MatchUser.email
        },
        accessToken:accessToken
    })


}
module.exports = loginUser;