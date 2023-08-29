const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema= new Schema({
    name:{
        type:String,
        required: true
    },
    email :{
        type:String, 
        required: true
    },
    password :{
        type:String, 
        required: true
    },
    role:{
        type:Boolean, 
        required: true 
    },
    pages:{
        type:Array, 
        required: true 
    }
})

const User = mongoose.model("user", userSchema);// user is the table name here
module.exports = User;