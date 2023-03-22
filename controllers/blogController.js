const express = require('express');
const router = express.Router();
const {User,Blog,Comment} = require('../models');

//getroute to get all blog post and include users so we have the email that create that specific post
router.get("/",(req,res)=>{
    Blog.findAll({
        include:[User]
    }).then(blogData=>{
        res.json(blogData)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:"oh noes!",err})
    })
})

//getroute to get indexed blog post and include users so we have the email that create that specific post
//also grabs comments and includes users so we can get the comments thats under that blog post
router.get("/:id",(req,res)=>{
    Blog.findByPk(req.params.id,{
        include:[{model:User},{ model: Comment, include: [User] }]
    }).then(blogData=>{
        console.log(blogData)
        res.json(blogData)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:"oh noes!",err})
    })
})

//postroute that creates a new post.
//make sure we have a logged in session first before posting
//uses request body to enter data to table
router.post("/",(req,res)=>{
    if(!req.session.userId){
       return res.status(403).json({msg:"login first post"})
    }
    console.log(req.body);
    Blog.create({
        title:req.body.title,
        text:req.body.text,
        UserId:req.session.userId
    }).then(blogData=>{
        res.json(blogData)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:"oh noes!",err})
    })
 })

 //delete route that deletes an indexed blog post
 //make sure theres a logged in session first
 //then it make sure theres such post at index
 //then it makes sure its the logged in users post and not another user
 router.delete("/:id",(req,res)=>{
    if(!req.session.userId){
       return res.status(403).json({msg:"login first post"})
    }
    console.log(req.body);
    Blog.findByPk(req.params.id).then(blogData=>{
       if(!blogData){
          return res.status(404).json({msg:"no such post"})
       } else if(blogData.UserId!== req.session.userId){
          return res.status(403).json({msg:"not your post"})
       }
       Blog.destroy({
        where:{
           id:req.params.id,
        }
       }).then(blogData=>{
         res.json(blogData)
        }).catch(err=>{
         console.log(err);
         res.status(500).json({msg:"oh noes!",err})
        })
    }).catch(err=>{
         console.log(err);
         res.status(500).json({msg:"oh noes!",err})
    })
 })

//put route that updates a blog at the indexed id
//basically uses the req body for the updated blog
router.put("/:id",(req,res)=>{
    Blog.update(req.body, {
        where: {
        id: req.params.id,
        }
    })  
    .then(blogData=>{
        res.json(blogData)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:"oh noes!",err})
    })
})



module.exports = router;