const express = require("express");
const router = express.Router();
const { Messages } = require("../models");

router.post("/sendText", async (req, res) => {
  const { text, sender, receiver } = req.body;
  await Messages.create({ text: text, sender: sender, receiver: receiver });
  res.json("sent");
});

router.get("/readText", async (req, res) => {
  const {sender,receiver}=req.body;
  const readText = await Messages.findAll({
    where: { sender: sender, receiver: receiver }
  });
  res.json(readText);
});
module.exports = router;
