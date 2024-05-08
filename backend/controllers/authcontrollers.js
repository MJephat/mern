const User = require('../models/usermodel')
const bcrypt = require('bcryptjs');
const generateTokenAndSetCookie = require('../utils/generateToken');


const signup = async (req, res) => {
    try {
        const {username,password, confirmPassword,usertype} =req.body;

        if(password !== confirmPassword){
            return res.status(400).json({error:"password don't match"})
        }

        const user = await User.findOne({username});

        if(user){
            return res.status(400).json({error:"Username already exist"})
        }

        // Hash password here off
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            password: hashedPassword,
            usertype,
        })

       if(newUser){
        // Generate JWT token Here
        generateTokenAndSetCookie(newUser._id, res);
        await newUser.save();

         res.status(201).json({
           _id: newUser._id,
           username: newUser.username,
           usertype: newUser.usertype,
         });
       }else{
        res.status(400).json({ error: "Invalid user data" })
       }

    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({error: "internal Server Error"});
    }
};

const login = async (req, res)=>{
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username})
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if(!user || !isPasswordCorrect){
            return res.status(400).json({error: "invalid username or password!!"})
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            username: user.username,
            usertype: user.usertype,
        });
        
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({error: " Internal Server Error" });
    }
};

const logout = async (req, res)=>{
    try {
        res.cookie("jwt","", {maxAge: 0});
        res.status(200).json({message: "logged out successfully"});
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ error: " Internal Server Error" });
    }
}

module.exports ={signup, login, logout};