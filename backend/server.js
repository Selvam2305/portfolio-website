const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

/* Allow frontend files (HTML, CSS, JS, Images) */
app.use(express.static("public"));

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/portfolioDB")
.then(() => console.log("✅ MongoDB Connected Successfully"))
.catch((err) => console.log("❌ MongoDB Error:", err));

const contactRoutes = require("./routes/contactRoutes");
app.use("/api/contact", contactRoutes);

// Test Route
app.get("/", (req, res) => {
    res.send("🚀 Backend Server Running");
});

// Start Server
app.listen(5000, () => {
    console.log("🔥 Server running on port 5000");
});