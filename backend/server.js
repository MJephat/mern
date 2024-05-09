// imports
const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const path = require("path");


const authRoutes = require("./routers/authroutes");
const messageRoutes = require("./routers/messageroutes");
const userRoutes = require("./routers/userroutes");
const {app, server} = require("./socket/socket");

const connectDB = require("./db/db");


// const app = express();
dotenv.config();
connectDB();



app.use(express.json()); // to parse the incoming requests withjson payloads
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);


//**********************deployment****************
const __dirname1 = path.resolve();
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname1, '/frontend/vite-project/dist')));

    app.get("*", (req,res) => {
        res.sendFile(path.resolve(__dirname1, '/frontend/vite-project/',"dist", "index.html"));
    })
}else{
    app.get("/",(req, res)=>{
        res.send("API running successfully")
    });
}



const PORT = process.env.Port || 8000;
server.listen(PORT, console.log(`server started on port ${PORT}!`));