const TodoModel = require('./model/Todo.js');
const AddTask = async (req, res) => { 
    try {
        const data = req.body;
        const newTask = await TodoModel.create(data);
        res.status(201).json({
            message: "Task added successfully!",
            newTask
        })
    } catch (error) { 
        res.status(500).json({success: false, message: error.message})
    }
}
const getAllTasks = async (req, res) => { 
    const tasks = await TodoModel.find();
    if (tasks.length===0) { 
        return res.status(200).json({success:false,message: 'no tasks exist!',
           tasks:[]}
        )
    }
    res.status(200).json({
        message: 'Here are the tasks ',
        tasks
    })
}
const deleteTask = async (req, res) => { 
    try {
        const { taskId } = req.body;
        const deletedTask = await TodoModel.findByIdAndDelete(taskId);
        if (!deletedTask) { 
            return res.status(404).json({ success: false, message: "Task not found!" });
        }
        res.status(200).json({
            success: true,
            message: `task deleted successfully! `,
            deletedTask
        })
    } catch (error) { 
        res.status(500).json({
            success: false,
            message:error.message
        })
    }

}
module.exports = {
    getAllTasks ,deleteTask,
    AddTask
}