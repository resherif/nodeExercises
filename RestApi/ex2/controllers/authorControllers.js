const { Author} = require('../model/db');
const getAllAuthors = async (req, res) => { 
    try {
        const result = await Author.find();
        if(result.length===0) return res.status(404).json({ message: "No authors found in the database!" });
        return res.status(201).json({ message: result });
        

    } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error", error: err.message });
}
}
const getAuthorById = async (req, res) => { 
    try {
        const { id } = req.params;
        const result = await Author.findById(id);
       if (!result) {
               throw new Error("Couldn't find the Author!");

        }
        return res.status(201).json({ message: result });
        

    } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error", error: err.message });
}
}
const editAuthor = async (req, res) => { 
    try{
        const { authorId } = req.params;
    const result = await Author.findByIdAndUpdate(authorId, req.body, { returnDocument: "after" });
     if (!result) {
            throw new Error("No Book found ");
        }
        console.log(result);
        res.status(201).json({
            message: "Author edited successfully",
            data: result
        });
    }catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error", error: err.message });
}
}
const createAuthor = async (req, res) => { 
    try {
        const { authorName, Bio } = req.body;
        if (!authorName) return res.status(400).json("no author name added !");
        const result = await Author.create({
            authorName,
            Bio
        });
        return res.status(201).json({
            "message": "Auhtor Added successfully!",
            data: result
        })
    } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error", error: err.message });
}
}
const deleteAuthor = async (req, res) => { 
    try{
        const { authorId } = req.params;
    const result = await Author.findByIdAndDelete(authorId);
     if (!result) {
            throw new Error("No Author found ");
        }
        console.log(result);
        res.status(201).json({
            message: "Author deleted successfully",
            data: result
        });
    }catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error", error: err.message });
}
}
module.exports = {
    getAllAuthors,
    getAuthorById,
    editAuthor,
    createAuthor,
    deleteAuthor
}