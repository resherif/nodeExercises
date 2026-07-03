const users = require('../model/users.json');
const getAllusers = (req, res) => { 
    res.json({
        success: true,
        "message": "All Users injected",
        users
    })
}
const AddUser = (req, res) => { 
    const newUser = req.body;
    users.push(newUser);
    res.json({
        success: true,
        "message": "User added successfully",
        users
    })

}
const UserDisplay = (req, res) => { 
    const { userId } = req.params;
    const user = users.filter((user) => user.id == userId);
    res.json({
        "message": "User Attached below",
        success: true,
        user
    })
}
const getSuperAdminDetails = (req, res) => { 
    res.json({
        "message":"super Admin details",
        success: true,
        user: {
            "id": 0,
            "name": "Super Admin",
            "email": "superadmin@example.com"
        }
    })
}
module.exports = {
    getAllusers,
    AddUser,
    UserDisplay,
    getSuperAdminDetails
}