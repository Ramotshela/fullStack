const express = require("express");
const router = express.Router();
const { ContactInfos } = require("../models");
const { validateToken } = require("../middleware/middleware");

// Create a new contact
router.post("/contact", validateToken, async (req, res) => {
  const { name, number } = req.body;
  const UserId = req.user.id;

  try {
    const checkContact = await ContactInfos.findAll({ where: { number: number, name: name, UserId: UserId } });
    if (checkContact.length > 0) {
      res.status(409).json({ message: `Contact already exists in the database`, contact: checkContact });
    } else {
      await ContactInfos.create({ name, number, UserId });
      res.status(201).json({ message: "Contact created successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred while creating the contact", details: error });
  }
});

// Get contact for the authenticated user
router.get("/getContact", validateToken, async (req, res) => {
  try {
    const contact = await ContactInfos.findOne({ where: { UserId: req.user.id } });
    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ error: "No contact found for the user" });
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred while retrieving the contact", details: error });
  }
});

module.exports = router;
