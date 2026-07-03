const express = require('express');
const app = express();
const productRoutes = require('./route/productRoute')
app.use(express.json());
app.use('/products', productRoutes);
app.listen(3100, () => { 
    console.log("server is running on 3100");
})