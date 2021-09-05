import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        required: true,
        default: "client",
        enum: ["client", "admin"]
    },
    address:{
        type: Object,
        required: false
    }
},{
    timestamps: true
})

export default mongoose.models.User || mongoose.model("User", userSchema)