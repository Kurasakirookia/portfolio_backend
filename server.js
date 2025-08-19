const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const path = require("path");
const connectDb = require("./config/connectDb");

// Connect DB
connectDb();

const app = express();

// Serve the uploads folder publicly
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(cors({
  origin: process.env.CLIENT_URL ||'http://localhost:3000',
  credentials: true,
}));

app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/home", require("./routes/homeRoute"));
app.use("/api/admin", require("./routes/adminRoute"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


