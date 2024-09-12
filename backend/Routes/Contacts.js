const express = require("express");
const router = express.Router();
const { ContactInfos, PhoneBooks } = require("../models");
const { validateToken } = require("../middleware/middleware");

// Add a new contact
router.post("/addContact", validateToken, async (req, res) => {
  const { name, number } = req.body;
  const UserId = req.user.id;

  if (!name || !number) {
    return res.status(400).json({ error: "Name and number are required." });
  }

  try {
    const findExistingContact = await PhoneBooks.findOne({
      where: { number: number, UserId: UserId },
    });

    if (findExistingContact) {
      return res.status(409).json({ message: "User already exists with that number." });
    } else {
      const contact = await PhoneBooks.create({
        name: name,
        number: number,
        UserId: UserId,
      });
      return res.status(201).json(contact);
    }
  } catch (error) {
    return res.status(500).json({ error: "An error occurred while adding the contact.", details: error });
  }
});

// Get all contacts for the authenticated user
router.get("/getContacts", validateToken, async (req, res) => {
  try {
    const allContacts = await PhoneBooks.findAll({
      where: { UserId: req.user.id },
    });
    return res.status(200).json(allContacts);
  } catch (error) {
    return res.status(500).json({ error: "An error occurred while retrieving contacts.", details: error });
  }
});

// Get a single contact by ID
router.get("/contacts/:id", validateToken, async (req, res) => {
  const Id = req.params.id;
  try {
    const contact = await PhoneBooks.findByPk(Id);
    if (contact && contact.UserId === req.user.id) {
      return res.status(200).json(contact);
    } else {
      return res.status(404).json({ message: "Contact not found or not authorized." });
    }
  } catch (error) {
    return res.status(500).json({ error: "An error occurred while retrieving the contact.", details: error });
  }
});

// Delete a contact by ID
router.delete("/delete/:id", validateToken, async (req, res) => {
  const id = req.params.id;
  try {
    const contact = await PhoneBooks.findByPk(id);
    if (contact && contact.UserId === req.user.id) {
      await PhoneBooks.destroy({ where: { id: id } });
      return res.status(200).json({ message: "Contact deleted successfully." });
    } else {
      return res.status(404).json({ message: "Contact not found or not authorized." });
    }
  } catch (error) {
    return res.status(500).json({ error: "An error occurred while deleting the contact.", details: error });
  }
});

module.exports = router;
