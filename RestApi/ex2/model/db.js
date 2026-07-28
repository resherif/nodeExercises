const mongoose = require('mongoose');
const authorSchema = new mongoose.Schema({
    authorName: {type:String, required:true},
    Bio: String,
    created_at: {type:Date, default:Date.now}
})
const bookSchema = new mongoose.Schema({
    title: {type:String , required:true},
    price: {type:Number, required:true},
    desc: String,
    created_at: {type:Date, default:Date.now},
    stock: Number,
    author_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
        required:true
     }

});
const Author =  mongoose.model('Author', authorSchema);
const Book = mongoose.model('Book', bookSchema)
const createDoc = async () => { 
    try {
        const authorCount = await Author.countDocuments();
        const bookCount = await Book.countDocuments();
        
        if (authorCount > 0 || bookCount > 0) {
            console.log("Database already has data. Skipping seeding.");
            return;
        }
        const authors = await Author.create([
            {
                authorName: 'Robert C. Martin',
                Bio: 'Also known as Uncle Bob, author of Clean Code.'
            },
            {
                authorName: 'Martin Fowler',
                Bio: 'Author of Refactoring and pioneer of OOP.'
            }
        ]);
        console.log("Database seeded successfully with initial authors!");
        await Book.create([
            {
                title: 'Clean Code',
                price: 450.00,
                stock: 10,
                desc: 'A Handbook of Agile Software Craftsmanship',
                author_id: authors[0]._id 
            },
            {
                title: 'Clean Architecture',
                price: 480.00,
                stock: 0,
                desc: 'A Craftsman Guide to Software Structure and Design',
                author_id: authors[0]._id 
            },
            {
                title: 'Refactoring',
                price: 500.00,
                stock: 5,
                desc: 'Improving the Design of Existing Code',
                author_id: authors[1]._id 
            }
        ]);
        console.log("Database seeded successfully with initial Books!");

    } catch (error) {
        console.error("Error seeding database:", error);
    }
}

module.exports = { Author, Book, createDoc };
