const mongoose = require('mongoose');
const customerSchema = new mongoose.Schema({
    title: String,


})
//customer is the name of collection in mongodb 
module.exports = mongoose.model('Books', customerSchema);