import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique: true,
    },
    email:{
        type:String,
        required:true,
        unique: true,
    },
    password:{
        type:String,
        required:true,
    },
    avatar:{
        type:String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9UdkG68P9AHESMfKJ-2Ybi9pfnqX1tqx3wQ&usqp=CAU",
    }
},{timestamps: true});

// timestamps for getting the time of creating and updation of the user

// creating the user model with the name User and above created schema
const User = mongoose.model('User',userSchema);

export default User;