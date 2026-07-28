const express = require('express');
const app = express();
//const { v4: uuid } = require('uuid');
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Books = require('./models/Books');
mongoose.set("strictQuery", false);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}
// 2. ONLY AFTER dotenv.config(), read your environment variables
const PORT = process.env.PORT || 3005;
const connection = process.env.connection; // If this comes before config(), it will be undefined!
// const books = [
//     { 
//     "title":"The Great Gatsby",
//     "author":"F. Scott Fitzgerald",
//     "year": 1925
//     },
//     {
       
//         "title": " Complete Guide toProgramming in C++",
//         "author": "Ulla Kirch-Prinz",
//         "year":1999
//     }
// ]


const start = async () => {
  try {
console.log(process.env.connection);
      await mongoose.connect(connection);
      //Books.insertMany(books);
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}/`);
    });
  } catch (err) {
    console.log(err);
  }
};
start();
