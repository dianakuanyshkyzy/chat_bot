const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type:String, 
        required:true,
        maxLength:30
    }, 
    email:{
        type:String,
        reqired:true, 
        maxLength:30, 
        unique:true
    }, 
    password: {
        type:String, 
        required:true, 
        maxLength:1024
    },
}, {
    timestamps: true
}); 

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;  
