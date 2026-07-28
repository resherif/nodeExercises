const mongoose = require('mongoose');
const TodoSchema = new mongoose.Schema({
    TodoName: {
        type: String,
        required:[true,'Task name is required']
    },
    TodoStatus: {
        type: String,
        enum: ['completed', 'notDone'],
        default:'notDone'
    }
}, { timestamps: true })
const Todos = mongoose.model('Todo', TodoSchema);
module.exports = Todos;