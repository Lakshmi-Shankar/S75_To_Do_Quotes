const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json());
app.use(cors()); 


app.get("/ping", (req, res) => {
    res.send("pong");
});

mongoose.connect(MONGO_URI)
.then(()=>{
    console.log("Database Connected Successfully")
    app.listen(PORT,()=>{
        console.log(`Server is running on http://localhost:${PORT}`)
    })
})

app.use("/api", routes);

