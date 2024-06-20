const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

// Загружаем конфигурации из .env файла
dotenv.config();

const createToken = (_id) => {
    const jwtkey = process.env.JWT_SECRET_KEY;
    if (!jwtkey) {
        throw new Error("JWT_SECRET_KEY not defined in environment variables");
    }
    return jwt.sign({ _id }, jwtkey, { expiresIn: "3d" });
}

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Проверка всех необходимых полей
        if (!name || !email || !password) return res.status(400).json("All fields are required...");
        if (!validator.isEmail(email)) return res.status(400).json("Email must be valid");

        let user = await userModel.findOne({ email });
        if (user) return res.status(400).json("User with the given email already exists...");

        user = new userModel({ name, email, password });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();

        const token = createToken(user._id);
        res.status(200).json({ _id: user._id, name, email, token });
    } catch (error) {
        console.log(error);
        res.status(500).json("Internal Server Error");
    }
};

const loginUser = async (req, res) => {
    const {email, password} = req.body; 
    try{
        let user = await userModel.findOne({email}); 
        if (!user) return res.status(400).json("No user...");
        const isValidPassword = await bcrypt.compare(password, user.password); 
        if(!isValidPassword){
            return res.status(400).json("Invalid email or password...");
        }
        const token = createToken(user._id);
        res.status(200).json({ _id: user._id, name: user.name, email, token });
    } catch (error){
        console.log(error);
        res.status(500).json("Internal Server Error");
    }
} 
const findUser = async(req, res)=>{
    const userId = req.params.userId; 
    try{
        const user = await userModel.findById(userId)
        res.status(200).json(user); 
    }catch(error){
        console.log(error);
        res.status(500).json("Internal Server Error");
    }
}
const getUsers = async(req, res)=>{
    try{
        const users = await userModel.find(); 
        res.status(200).json(users); 
    }catch(error){
        console.log(error);
        res.status(500).json("Internal Server Error");
    }
}
module.exports = {registerUser, loginUser, findUser, getUsers};

