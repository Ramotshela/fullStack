const express = require("express");
const router = express.Router();
const { Posts,Likes } = require("../models");
const { validateToken } = require("../middleware/middleware");

router.get("/", validateToken, async (req, res) => {
  const post = await Posts.findAll({ include: [Likes] });
  const LikedPosts = await Likes.findAll({ where: { UserId: req.user.id } });
  res.json({ post: post, LikedPosts: LikedPosts });
});
router.post("/", validateToken, async (req, res) => {
  const post = req.body;
  await Posts.create(post);
  res.json(post);
});
router.get("/getById/:id", async (req, res) => {
  const id = req.params.id;
  const post = await Posts.findByPk(id);
  res.json(post);
});

module.exports = router;
