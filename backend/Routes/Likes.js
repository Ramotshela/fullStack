const express=require('express')
const router=express.Router();
const {Likes} =require("../models/Likes")
const {validateToken}=require("../middleware/middleware")

router.post("/like", validateToken ,async (req,res)=>{
    const {postId}=req.body;
    
    const findLike= await Likes.findOne({where:{UserId:req.user.id}})
    if(findLike){
      Likes.destroy({where:{UserId:userId}})
      res.json("UNLIKED")
    }else{
await Likes.create({
    UserId:userId,
    PostId:postId
});  
      res.json("LIKED")
    }
    
})

module.exports=router