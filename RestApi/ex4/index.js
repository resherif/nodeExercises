const express = require('express');
const dotenv = require('dotenv').config();
const connectDb = require('./config/connectDb');
const CategoriesRoute = require('./routes/categoryRoute');
const productsRoute = require('./routes/productsRoute');
const ordersRoute = require('./routes/ordersRoute');
const app = express();
app.use(express.json());
app.use('/categories', CategoriesRoute);
app.use('/products', productsRoute);
app.use('/orders', ordersRoute);
connectDb();
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`server is running in port${PORT}`);
});