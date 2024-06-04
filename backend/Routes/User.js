const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const {validateToken} =require('../middleware/middleware')
const {sign} =require('jsonwebtoken')

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    await bcrypt.hash(password, 10).then((hash) => {
      Users.create({
        username: username,
        password: hash,
      }).then(() => {
        res.status(201).json({ username: username, password: hash });
      });
    });
  } catch (error) {
    res.status(400).json({ err: "error" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await Users.findOne({
      where: { username: username },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await bcrypt.compare(password, user.password).then((match) => {
      if (!match) {
        return res.status(401).json({ error: "Invalid password" });
      }
      const accessToken = sign(
        { username: user.username, id: user.id },
        "importantsecret"
      );

      res.json(accessToken);
    });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ error: "Internal server error" });
  }
});
router.get('/auth',validateToken , (req,res)=>{
  res.json(req.user)

})
module.exports = router;
