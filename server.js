// server.js
require("dotenv").config();
const express = require("express");

const connectDB = require("./config/db");

const app = express();

// routes
const todo = require("./routes/todo"); // added
const auth = require("./routes/auth")

// connect database
connectDB();

const cors = require('cors');
app.use(cors());


// initialize middleware
app.use(express.json({ extended: false }));
app.get("/", (req, res) => res.send("Server up and running"));

// use routes
app.use("/api/todo", todo); // added
app.use("/api/auth", auth);

// setting up port
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
});