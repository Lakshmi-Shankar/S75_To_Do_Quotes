const express = require("express")
const app = express();
require("dotenv").config();
const Mongoose = require("mongoose");
const PORT = 4000; // Not nes

app.get("/ping", (req, res)=>{
    res.send("pong")
});

const MONGO_URI = process.env.MONGO_URI;
Mongoose.connect(MONGO_URI)
.then(()=> console.log("Database connected successfully"))
.catch((err)=>{
    console.log("Error found:",err)
})

app.get("/", (req, res) => {
    const dbStatus = mongoose.connection.readyState === 1 ? "Connected" : "Not Connected";
    res.status(200).json({ message: "Welcome to the API", database: dbStatus });
});

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})