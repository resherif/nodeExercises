// const Middle = (req, res, next) => {
//     const authToken = req.headers['custom-auth-token'];
//     if (!authToken  || !authToken !== 'Secret123') {
//         return res.sendStatus(401);
//     }
//     next()
// };
// module.exports = {
//     Middle
// }
const Middle = (req, res,next) => { 
    const customAuth = req.headers['custom-auth-token'];
    if (!customAuth || customAuth !== Secret123)
        return res.sendStatus(401);
    next()
}
module.exports = {
        Middle
}