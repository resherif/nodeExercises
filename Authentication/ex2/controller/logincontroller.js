import users from '../model/users';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

export const handleLogin = async (req, res) => {
    const { pwd, email } = req.body;
    if (!pwd || !email) {
        return res.json({
            message: "All fields are required"
        })
    }
    const matchUser = await users.find(email);
    const matchpassword = await bcrypt.compare(pwd, matchUser.password)
    if (!matchUser) {
        return res.json({ message: "no user with this email is found" })
    }
    if (!matchpassword) {
        res.json({ message: "invalid password !" })
    }
    const access_token = jwt.sign(
    { username: matchUser.username },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:'15m'}
    
    )
    const refresh_token = jwt.sign(
        {username:matchUser.username},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn:'1d'}
     )
     
}