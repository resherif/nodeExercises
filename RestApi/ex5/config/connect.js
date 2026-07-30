const { configDotenv } = require('dotenv');
const mongoose = require('mongoose');
require('dotenv').config();
const connectDb=async()=>{
    try {
        await mongoose.connect(process.env.connection);
        console.log('db is connected!');
    } catch (err) { 
        console.error(err);
        process.exit(1);
    }
}
module.exports = connectDb;