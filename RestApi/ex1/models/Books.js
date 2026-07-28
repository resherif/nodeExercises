const mongoose = require('mongoose');
const BooksSchema = new mongoose.Schema({
   title: String,
    author: String,
    year:Number
})
//Books is the name of collection in mongodb 
module.exports = mongoose.model('Books', BooksSchema);