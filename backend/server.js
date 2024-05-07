// imports
const express = require('express')
const dotenv = require('dotenv')
const authRoutes = require('./routers/authroutes.js');
const messageRoutes = require("./routers/messageroutes.js");
const connectDB = require('./db/db.js');
const cookieParser = require("cookie-parser");


const app = express();
dotenv.config();
connectDB();


app.use(express.json()); // to parse the incoming requests withjson payloads 
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);


const PORT = process.env.Port || 8000;
app.listen(PORT, console.log(`server started on port ${PORT}!`));