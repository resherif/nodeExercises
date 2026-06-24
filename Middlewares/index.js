const express = require('express');
const app = express();
app.use(express.json())
const Middle=((req, res, next) => {
    const requestStartTime = Date.now();
    console.log(`${req.method}, ${req.url}, ${requestStartTime}`);
    next()


})
const users = [{
    'name': "reham",
    "role":"developer"
}]
app.get('/', Middle,(req, res) => {
    res.send({data:users});
});
app.post('/users', Middle, (req, res) => {
    const newUser = req.body;
    users.push(newUser);
   console.log(`👤 New user added: ${newUser.name}`);
    res.json({
        message: "user added successfully",
        data: newUser
    })
});
app.listen(3005, () => { 
    console.log("server Running")
})