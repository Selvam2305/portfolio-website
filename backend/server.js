const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Enable CORS for all origins (allowing GitHub Pages & local testing)
app.use(cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

// MongoDB Connection (Uses MONGODB_URI environment variable for Cloud MongoDB Atlas, or local fallback)
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/portfolioDB";

mongoose.connect(MONGODB_URI)
.then(() => console.log("✅ MongoDB Connected Successfully"))
.catch((err) => console.log("❌ MongoDB Error:", err));

const contactRoutes = require("./routes/contactRoutes");
app.use("/api/contact", contactRoutes);

// Test Route
app.get("/", (req, res) => {
    res.json({ status: "success", message: "🚀 Selvam Portfolio Backend API is Running Live!" });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🔥 Server running on port ${PORT}`);
});