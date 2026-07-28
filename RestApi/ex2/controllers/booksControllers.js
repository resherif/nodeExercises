const { Book } = require('../model/db');
const createBookForAuthor = async (req, res) => { 
    try { 
        const { authorId }=req.params
        const { title, price, stock, desc } = req.body;
        const authorExist = await Book.findById(authorId);
        if (!authorExist) return res.status(400).json("No matching author id!");
        const newBook = new Book.create({
            title,
            price,
            stock,
            desc,
            author_id:authorId
        })
        return res.status(201).json({ message: "Book created successfully", data: newBook });
    }catch (err) {
        return res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};

const getAllbooksForAuthor = async (req, res) => {
   try {
const {authorId}=req.params;
 
  
        const books = await Book.find({ author_id: authorId });
     
        if (books.length === 0) return res.status(404).json({ message: "No Books found in the database!" });
        return res.status(201).json({
            data:books
        })


    } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error", error: err.message });
}
}
const getBookByAuthorandId = async (req, res) => {
    try {
         const { BookId, authorId } = req.params;
const book = await Book.findOne({book_id:BookId,author_id:authorId })
  if (!book) {
            return res.status(404).json({ message: "Book not found for this specific author!" });
        }

        return res.status(200).json({ data: book });
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};
const editBookForAuthor = async (req, res) => { 
    try { 
        const { BookId, authorId } = req.params;
        const updatedBook = await Book.findByIdAndUpdate({ book_id: BookId, author_id: authorId }, 
            req, body,
            { new: true })
        if (!updatedBook) {
            return res.status(404).json({ message: "Book not found or you don't have permission to edit it!" });
        }

        return res.status(200).json({ message: "Book updated successfully", data: updatedBook });
    
    }catch(err) {
        return res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
}

const deleteByBookIdAndAuthor = async (req, res) => {
    try {
        const { BookId, authorId } = req.params;
        const deletedBook = await Book.findByIdAndDelete({book_id:BookId,author_id:authorId});
        if(!deletedBook){
            return res.status(404).json({ message: "Book not found or u dont have the permission to delete it !" });
        }
        return res.status(200).json({
            message: "book deleted successfully!",
            data:deletedBook
        })
    }catch(err){
        return res.status(500).json({message:"internal server error! ", error:err.message})
    }
}
module.exports={
    createBookForAuthor,
    getAllbooksForAuthor ,
 getBookByAuthorandId ,
 editBookForAuthor,
 deleteByBookIdAndAuthor 
    
}