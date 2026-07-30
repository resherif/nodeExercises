const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true, 
        trim: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        lowercase: true, 
        trim: true 
    },
    password: { 
        type: String, 
        required: true 
    },
   
    refreshToken: {
        type: String
    }
}, { timestamps: true }); 

const booksSchema = new mongoose.Schema({
    book_title: { 
        type: String, 
        required: true,
        trim: true 
    },
    price: { 
        type: Number, 
        required: true,
        min: 0 
    },
    stock: { 
        type: Number, 
        default: 0,
        min: 0 
    },
    desc: String
}, { timestamps: true });

const Books = mongoose.model('Books', booksSchema);
const Users = mongoose.model('Users', usersSchema);

module.exports = { Books, Users };