import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    _id: {type: String, required: true},
    email: {type: String, required: true},
    full_name: {type: String, required: true},
    username: {type: String, unique: true},
}, {timestamps: true})

const User = mongoose.model('User', userSchema)

export default User