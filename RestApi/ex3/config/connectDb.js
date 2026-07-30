const mongoose = require('mongoose');
require('dotenv').config();
const connectDb = async () => { 
    try {
        await mongoose.connect(process.env.connection);
        console.log("db connected!")
    } catch (err) { 
       console.error(`Error: ${err.message}`);
    process.exit(1); 
    }
}
module.exports= connectDb;