// imports
const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");


const authRoutes = require("./routers/authroutes");
const messageRoutes = require("./routers/messageroutes");
const userRoutes = require("./routers/userroutes");


const connectDB = require("./db/db");


const app = express();
dotenv.config();
connectDB();

app.use(express.json()); // to parse the incoming requests withjson payloads
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.Port || 8000;
app.listen(PORT, console.log(`server started on port ${PORT}!`));