const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const users = require('../model/db').Users;
const regiterNewUser = async (req, res) => { 
    const { username, email, password } = req.body;
    if (!username || !email || !password) return res.json("All fields are required!");
    const alreadyExist = await users.findOne({
        $or: [{ username: username }, { email: email } ]
    });
    if (alreadyExist) return res.json(" email or username already exist login instade!");
    const bcryptedpassword =await bcrypt.hash(password, 10);
    const newUser = await users.create({
        username,
        email,
        password:bcryptedpassword
    })
    const accessToken = jwt.sign(
        {
        user_id:  newUser._id,
    
    }
        ,
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15min' }
    )
     const refreshToken = jwt.sign(
        {
        user_id:  newUser._id,
    
    }
        ,
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn:'1d'}
    )

 
        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
            path: '/',
            maxAge: 24 * 60 * 60 * 1000
        });
    res.json({
        message: "Account has been created",
        user: {
            username: newUser.username,
            email: newUser.email
        },
        accessToken: accessToken
    });

}
module.exports= regiterNewUser;