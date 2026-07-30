const jwt = require('jsonwebtoken');
const verifyJwt = async (req, res,next) => { 
    const authHeaders = req.headers.authorization || req.headers.Authorization;
    if (!authHeaders || !authHeaders.startsWith('Bearer')) { 
        return res.status(401).json({ message: "Unauthorized! Token is missing." });

    }
    const token = authHeaders.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => { 
            if (err) {
                return res.status(403).json({ message: "Forbidden! Token is invalid or expired." }); // 403 تعني التوكن منتهي أو تم التلاعب به
            }
            req.user_id = decoded.user_id;
            next()
        }
    )
}
module.exports = verifyJwt;