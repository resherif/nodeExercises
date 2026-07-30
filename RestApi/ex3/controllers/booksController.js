const Books = require('../model/db').Books;
const getAllBooks = async (req, res) => { 
    try {
        const  books= await Books.find();
        if (!books) res.status(404).json({ Message: "No books exist!" });
        return res.status(200).json({
            message: "All books retrived!",
            data: books
        })
    } catch (error) { 
        return res.status(500).json({ message: "internal server error! ", error: error.message });
    }
}
const createNewBook = async (req, res) => { 
    try {
        const { book_title, book_stock, price, desc } = req.body;
        if (!book_title || !book_stock || !price) return res.status(400).json({
            message: "provide complete info"
        });
        const newBook = await Books.create({
            book_title: book_title,
            price: price,
            stock: book_stock,
            desc: desc

        });
        res.status(200).json({
            message: "New book added successfully!",
            data: newBook
        })
    } catch (error) { 
           return res.status(500).json({
               message: "internal server error !",
            error:error.message
        })
    }
}
const getBookById = async (req, res) => { 
    try {
        const { id } = req.params;
        const book = await Books.findById(id);
        if (!book) return res.status(400).json({
            message: "Book not found!"
        })
        res.status(200).json({ data: book });
    } catch (error) { 
        return res.status(500).json({message:"internal server error !", error:error.message})
    }
}
const editBook = async (req, res) => { 
    try {
        const { id } = req.params;
        const { book_title, book_stock, price, desc } = req.body;
        const updatedFields = {};
        if (book_title !== undefined) updatedFields.book_title = book_title;
        if (book_stock !== undefined) updatedFields.stock = book_stock;
        if (price !== undefined) updatedFields.price = price;
        if (desc !== undefined) updatedFields.desc = desc;
    const book = await Books.findByIdAndUpdate(
    id,
        {
       $set:updatedFields
        },
        {
            new: true,
            runValidators: true
        });
        return res.status(200).json({
            message: "book edited successfully!",
            data:book
        })
    }catch(error) { 
        return res.status(500).json({message:"internal server error !", error:error.message})
    }

}
const deleteBook = async (req, res) => { 
   try{
     const { id } = req.params;
    const deletedBook = await Books.findByIdAndDelete(id);
    return res.status(200).json({
        message: " book deleted successfully!",
        data :deletedBook
    })
   }catch(error) { 
        return res.status(500).json({message:"internal server error !", error:error.message})
    }
}

module.exports = { getAllBooks ,createNewBook,getBookById,editBook,deleteBook };