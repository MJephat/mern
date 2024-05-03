// imports
const express = require('express')
const dotenv = require('dotenv')
const authRoutes = require('./routers/authroutes.js');
const connectDB = require('./db/db.js');

const app = express();
dotenv.config();
connectDB();


app.use(express.json()); // to parse the incoming requests withjson payloads 

app.use("/api/auth", authRoutes);


const PORT = process.env.Port || 8000;
app.listen(PORT, console.log(`server started on port ${PORT}!`));