const express = require('express');
const app = express();
const { v4: uuid } = require('uuid');
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
const books = [
    { 
    "title":"The Great Gatsby",
    "author":"F. Scott Fitzgerald",
    "year": 1925
    },
    {
       
        "title": " Complete Guide toProgramming in C++",
        "author": "Ulla Kirch-Prinz",
        "year":1999
    }
]

app.get("/", (req, res) => {
    res.send("Hello World!")
});
app.get("/api/books",async  (req, res) => {
    const result = await Books.find();
    res.json({books:result});
});
app.get("/api/books/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Books.findById(id);
        if (!result) {
               throw new Error("Couldn't find the book");

        }
        res.json({ data: result });

    } catch (err) { 
       res.status(500).json({message:err.message});
    }

});
        console.log("POST route loaded");

app.post('/api/books', async (req, res) => { 
    try {
        const newBook = await new Books(req.body);
        await newBook.save();
        console.log(newBook);
        res.status(201).json({ newBook });
    } catch (err) { 
        res.status(500).json({error:err.message})
    }

})
app.put('/api/books/:id', async (req, res) => { 
    try {
        const { id } = req.params;
        const result = await Books.findByIdAndUpdate(id, req.body, {  returnDocument: "after"});
        if (!result) {
            throw new Error("No Book found ");
        }
        console.log(result);
        res.status(201).json({
            message: "Book edited successfully",
            data: result
        });
       
    } catch (err) { 
        console.log({message:err})
    }
})
app.delete('/api/books/:id', async (req, res) => { 
    try {
        const { id } = req.params;
        const result = await Books.deleteOne({_id:id});
        if (result.deletedCount===0) {
            res.status(404).json("Book not found")
        }
        console.log(result);
        res.status(201).json({
            message: "Book deleted successfully",
        
        });
       
    } catch (err) { 
        res.status(500).json({ message: err.message });
    }
})
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
