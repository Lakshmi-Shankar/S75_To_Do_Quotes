const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const taskRoutes = require("./routes/taskRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json());  // ✅ Ensure JSON body is parsed
app.use(cors());          // ✅ Prevent CORS issues

app.get("/ping", (req, res) => {
    res.send("pong");
});

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("✅ Database Connected Successfully");
        app.listen(PORT, () => {
            console.log(`🚀 Server is running on http://localhost:${PORT}`);
        });

        // ✅ Move this inside the `then` block
        app.use("/api", taskRoutes);
        app.use("/api", userRoutes)

    })
    .catch(err => console.error("🚨 Database Connection Error:", err));
