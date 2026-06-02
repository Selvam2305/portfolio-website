const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

router.post("/", async (req, res) => {
    try {
        console.log("Received Data:", req.body); 

        const newContact = new Contact(req.body);
        await newContact.save();

        console.log("Saved:", newContact); 

        res.status(201).json({ message: "Message Saved Successfully" });

    } catch (error) {
        console.error("Error:", error); 
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;