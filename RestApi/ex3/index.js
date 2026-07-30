const express = require('express');
const connectDb = require('./config/connectDb');
const authRoute = require('./routes/authRoute');
const bookRoute = require('./routes/bookRoute')
const dotenv = require('dotenv').config();
const app = express();
app.use(express.json());
app.use('/api/auth', authRoute);
app.use('/books', bookRoute);
connectDb();
PORT = process.env.PORT || 3000;
app.listen(PORT, () => { 
    console.log(`server running on Port ${PORT}`);
})