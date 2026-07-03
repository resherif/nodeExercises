const express = require('express');
const app = express();
app.use(express.json());
const usersRoute = require('./routes/userRoutes');
app.use('/users', usersRoute);
app.listen(3000, () => { 
    console.log('server is running on 3000');
})