const mongoose = require("mongoose")

const messageSchema = new mongoose.Schema({
    chatId:String, 
    text:String, 
    senderId:String, 
}, 
{
    timestamps:true, 
}); 

const messageModel = mongoose.model("Message", messageSchema); 
module.exports = messageModel; 