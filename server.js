const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const path = require("path");
const connectDb = require("./config/connectDb");

connectDb();

const app = express();

// Serve the uploads folder publicly
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Allowed origins (removed trailing slash)
const allowedOrigins = [
  "https://tejaskumardportfolio.netlify.app",  // fixed
  "http://localhost:3000",
];

// ✅ CORS config
app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like Postman, curl)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("Blocked by CORS:", origin); // helpful log
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/home", require("./routes/homeRoute"));
app.use("/api/admin", require("./routes/adminRoute"));

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
