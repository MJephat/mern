const mongoose = require('mongoose');

const userSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        minlength:5
    },
    usertype:{
        type:String,
        required:true,
        enum:["customer","agent"]
    }
},
{timestamps:true}

);

const User = mongoose.model("User", userSchema);
module.exports = User;