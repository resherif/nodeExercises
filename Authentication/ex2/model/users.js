import mongoose from 'mongoose';
const usersSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    role: String,
    refresh_access_token: String
})
export default mongoose.model(users, usersSchema);