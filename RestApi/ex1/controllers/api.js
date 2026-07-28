const router = require('express').Router();
const BookModel= require('../models/Books')
// router.get("/", (req, res) => {
//     res.send("Hello World!")
// });
const getAllBooks = async (req, res) => { 
    try {

        const result = await BookModel.find();
        if (!result) return res.status(404).json({ message: "No books found!" });
        res.json({ books: result });
    } catch (err) { 
        console.log({"error":err.message})
    }
}
// router.get("/api/books", async (req, res) => {

// });
const getBookById = async (req, res) => { 
     try {
        const { id } = req.params;
        const result = await BookModel.findById(id);
        if (!result) {
               throw new Error("Couldn't find the book");

        }
        console.log("POST route loaded");
        res.json({ data: result });

    } catch (err) { 
       res.status(500).json({message:err.message});
    }
}
// router.get("/api/books/:id", async (req, res) => {
   

// });
const addBooks = async (req, res) => { 
     try {
        // const newBook = await new Books(req.body);
        // await newBook.save();
        // console.log(newBook);
        // res.status(201).json({ newBook });
        const { book } = req.body;
        if (!book) return res.status(404).json({ message: "No books inserted" });
        if (book.length > 1) { 
  await new BookModel.insertMany(book);
        return res.status(201).json({ data: book });
        }
        await new BookModel.insertOne(book);
        return res.status(201).json({ data: book });
    } catch (err) { 
        res.status(500).json({error:err.message})
    }

}
// router.post('/api/books', async (req, res) => {

// })
const editBook = async (req, res) => { 
     try {
        const { id } = req.params;
        const result = await BookModel.findByIdAndUpdate(id, req.body, {  returnDocument: "after"});
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
}
// router.put('/api/books/:id', async (req, res) => {

// })
const deleteBook = async (req, res) => { 
     try {
        const { id } = req.params;
        const result = await BookModel.deleteOne({_id:id});
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
}
// router.delete('/api/books/:id', async (req, res) => {

// })
module.exports = {
    getAllBooks,
    getBookById,
    addBooks,
    editBook,
    deleteBook
}