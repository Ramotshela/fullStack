const express = require("express");
const router = express.Router();
const { ContactInfos } = require("../models");
const { validateToken } = require("../middleware/middleware");


router.post("/contact", validateToken, async (req, res) => {
  const { name, number } = req.body;
  const UserId=req.user.id
  // const checkContact = await ContactInfos.findAll({ where: { number: number ,name:name,UserId:UserId} });
  try {
    // if (checkContact) {
    //   res.json(`number already exists in the database ${checkContact}`);
    // } else {
      await ContactInfos.create({ name: name, number: number, UserId: UserId });
      res.json("contacts created");
    // }
  } catch (error) {
    res.json(error);
  }
});
router.get("/getContact", validateToken,async (req, res) => {
  try {
    const getContact = await ContactInfos.findOne({ where: { UserId: req.user.id } });
    if (getContact) {
      
      res.json(getContact);
    } else {
      res.json("error trying to get contact");
    }
  } catch (error) {
    res.json(error);
  }
});
module.exports = router;
