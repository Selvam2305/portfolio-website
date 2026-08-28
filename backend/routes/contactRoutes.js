const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

// POST /api/contact - Save contact form submission to MongoDB
router.post("/", async (req, res) => {
    try {
        console.log("Received Data:", req.body); 

        const newContact = new Contact(req.body);
        await newContact.save();

        console.log("Saved:", newContact); 

        res.status(201).json({ message: "Message Saved Successfully", contact: newContact });

    } catch (error) {
        console.error("Error saving message:", error); 
        res.status(500).json({ message: "Server Error" });
    }
});

// GET /api/contact/messages - View all saved messages from MongoDB
router.get("/messages", async (req, res) => {
    try {
        const messages = await Contact.find().sort({ createdAt: -1 });
        res.status(200).json(messages);
    } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;