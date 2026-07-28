const express = require('express');
const app = express();
const dotenv = require("dotenv").config();
const authorRoute = require('./routes/authorsroutes');
const mongoose = require('mongoose');
const { createDoc} = require('./model/db');
mongoose.set("strictQuery", false);
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use('/author', authorRoute);
const PORT = process.env.PORT;
const connection = process.env.connection; 
const start = async  () => { 
    try {
        await mongoose.connect(connection);
        console.log("database connected!");
       createDoc()

        app.listen(PORT, () => {

            console.log(`server is running on port  ${PORT}`)
        })
    } catch (err) { 
        console.log(err);
    }
}

start();