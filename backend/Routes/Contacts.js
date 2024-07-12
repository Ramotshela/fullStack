const express = require("express");
const router = express.Router();
const { ContactInfos, PhoneBooks } = require("../models");
const { validateToken } = require("../middleware/middleware");

router.post("/addContact", validateToken, async (req, res) => {
  
  const { name, number} = req.body;
 // const UserId = req.user.id;
  
  // const findExistingContact = Contacts.findAll({
  //   where: { number: number },
  // });
  // const findContact = ContactInfos.findAll({ where: { number: number } });
  // if (findExistingContact) {
  //   res.json("User already exist with that number");
  // } else {
  //   if (!findContact) {
     // try {
        const contact = await PhoneBooks.create({
          name: name,
          number: number,
         // UserId: UserId,
        });
        res.json(contact);
  //     } catch (error) {
  //       res.json({ error: error });
  //     }
  // //   } else {
  //     res.json("user is not on using the application");
  //   }
    
  // }
});

router.get("/getContacts", validateToken, async (req, res) => {
  try {
    const allContacts = await PhoneBooks.findAll(
     // where: { UserId: req.user.id },
    );
    res.json(allContacts);
  } catch (error) {
    console.error(error);
  }
});

router.get("/contacts/:id", async (req, res) => {
  const Id = req.params.id;
  try {
    const contact = await PhoneBooks.findByPk(Id);

    res.json(contact);
  } catch (error) {
    console.error(error);
  }
});

router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  await PhoneBooks.destroy({ where: { id: id } });
  res.json("deleted");
});
module.exports = router;
