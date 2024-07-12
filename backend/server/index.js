const express = require("express");
const app = express();
const db = require("../models");
const postRouter = require("../Routes/Posts");
const postCreate = require("../Routes/Comments");
const register = require("../Routes/User");
const contacts=require("../Routes/Contacts")
const contactInfo=require('../Routes/ContactInfos')
const Likes = require("../Routes/Likes");
const Messages=require("../Routes/Messages")
const cors = require("cors");

app.use(cors());

app.use(express.json());

app.use('/contactInfo', contactInfo)
app.use("/auth", register);
app.use("/comment", postCreate);
app.use("/posts", postRouter);
app.use("/like",Likes)
app.use("/messages",Messages)
app.use('/contacts',contacts)

db.sequelize.sync().then(() => {
  app.listen((port = 5174), () => {
    console.log(`listening ${port}`);
  });
});
