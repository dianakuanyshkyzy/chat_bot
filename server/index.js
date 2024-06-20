
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const userRoute = require("./routes/userRoute")
const chatRoute = require("./routes/chatRoute")
const messageRoute = require("./routes/messageRoute")
const app = express(); 
require("dotenv").config() 

app.use(express.json()) 
app.use(cors()) 
app.use("/api/users", userRoute)
app.use("/api/chats", chatRoute)
app.use("/api/messages", messageRoute)

const port = process.env.PORT || 3000; 
const url = process.env.ATLAS_URL;

app.get("/", (req, res)=>{
    res.send("Hello worlddd")
})

app.listen(port, (req, res)=>{
    console.log(`Server running on port http://localhost:${port}`) 
}); 
mongoose.connect(url, {
    useNewUrlParser: true, 
    useUnifiedTopology:true
})
.then(()=>console.log("MongoDB connection established"))
.catch((error)=>console.log("MongoDB connection failed: ", error.message)); 

