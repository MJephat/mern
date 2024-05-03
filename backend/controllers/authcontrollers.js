const User = require('../models/usermodel.js')


exports.signup = async (req, res) => {
    try {
        const {username,password, confirmPassword, usertype} =req.body;

        if(password !== confirmPassword){
            return res.status(400).json({error:"password don't match"})
        }

        const user = await User.findOne({username});

        if(user){
            return res.status(400).json({error:"Username already exist"})
        }

        // Hash password here off

        const newUser = new User({
            username,
            password,
            usertype,
        })

        await newUser.save();

        res.status(201).json({
            _id: newUser._id,
            username: newUser.username
        });

    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({error: "internal Server Error"});
    }
};

// module.exports = signup;