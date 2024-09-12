const express = require("express");
const router = express.Router();
const { Comments } = require("../models");
const { validateToken } = require("../middleware/middleware");

router.get("/:postId", async (req, res) => {
  const postId = req.params.postId;
  const comment = await Comments.findAll({ where: { PostId: postId } });
  res.json(comment);
});
router.post("/",validateToken, async (req, res) => {
  const comment  = req.body;
  const username =req.user.username; 
  comment.username=username;
  await Comments.create(comment);
  res.json(comment);
});
router.delete("/:commentId", async (req,res)=>{
  const commentId=req.params.commentId;
  
  try {
    await Comments.destroy({where:{id:commentId}})
    res.json(
      "comment deleted"
    )
  } catch (error) {
    res.json({error:error})
  }

})
module.exports=router;
