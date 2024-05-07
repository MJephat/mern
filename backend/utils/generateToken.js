const jwt = require('jsonwebtoken');

const generateTokenAndSetCookie = (userId, res) =>{
    const token =jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });

    res.cookie("jwt", token,{
        maxAge: 30 * 24 * 60  * 60 * 1000, //ms
        httpOnly: true,  //prevent XSS attacks cross-site scripting attacks
        secure: process.env.MODE_ENV !== "development",
        // sameSite: "strict"
    });
};

module.exports = generateTokenAndSetCookie;
