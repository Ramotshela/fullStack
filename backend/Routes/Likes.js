const express = require("express");
const router = express.Router();
const { Likes } = require("../models");
const { validateToken } = require("../middleware/middleware");

router.post("/like", validateToken, async (req, res) => {
  const { PostId } = req.body;
  const UserId = req.user.id;
  const findLike = await Likes.findOne({
    where: { UserId: UserId, PostId: PostId },
  });
  if (findLike) {
    await Likes.destroy({ where: { UserId: UserId, PostId: PostId } });
    res.json({liked:false});
  } else {
    await Likes.create({
      UserId: UserId,
      PostId: PostId,
    });
    res.json({liked:true});
  }
});

router.get("/:Id", async (req, res) => {
  const postId = req.params.Id;

  const numberLikes = await Likes.findAll({ where: { PostId: postId } });
  res.json(numberLikes);
});
module.exports = router;