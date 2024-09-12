const express = require("express");
const router = express.Router();
const { Messages } = require("../models");
const { validateToken } = require("../middleware/middleware");
const { Op } = require("sequelize");

// Send a text message
router.post("/sendText/:receiver", validateToken, async (req, res) => {
  const { text } = req.body;
  const receiver = req.params.receiver;
  const sender = req.user.id;

  if (!text || !sender || !receiver) {
    return res.status(400).json({ error: "All fields (text, sender, receiver) are required." });
  }

  try {
    const message = await Messages.create({ text, sender, receiver });
    res.status(201).json({ message: "Message sent successfully.", data: message });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while sending the message.", details: error.message });
  }
});

// Read text messages between sender and receiver
router.get("/readText/:receiver", validateToken, async (req, res) => {
  const receiver = req.params.receiver;
  const sender = req.user.id;

  try {
    const readText = await Messages.findAll({
      where: {
        [Op.or]: [
          { sender: sender, receiver: receiver },
          { sender: receiver, receiver: sender }
        ]
      },
      order: [['createdAt', 'ASC']],
    });

    if (readText.length > 0) {
      res.status(200).json(readText);
    } else {
      res.status(404).json({ message: "No messages found between the specified sender and receiver." });
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred while reading the messages.", details: error.message });
  }
});

module.exports = router;
