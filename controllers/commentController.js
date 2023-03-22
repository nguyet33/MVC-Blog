const express = require('express');
const router = express.Router();
const {User,Comment,Blog} = require('../models');

//get route that gets all the comments
//includes User and Blog so we know which user posted it and which blog the comment is for
router.get("/",(req,res)=>{
    Comment.findAll({
        include:[User,Blog]
    }).then(blogData=>{
        res.json(blogData)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:"oh noes!",err})
    })
})

//get route that get an indexed Comment
//includes User and Blog so we know which user posted it and which blog the comment is for
router.get("/:id",(req,res)=>{
    Comment.findByPk(req.params.id,{
        include:[User,Blog]
    }).then(blogData=>{
        res.json(blogData)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:"oh noes!",err})
    })
})

//post route that checks if user is logged in
//then it creates a new comment with the passed in data in request body. it also uses session data ( userId) to store which user created the comment

router.post("/",(req,res)=>{
    if(!req.session.userId){
       return res.status(403).json({msg:"login first to comment"})
    }
    console.log(req.body);
    Comment.create({
        text:req.body.text,
        BlogId:req.body.BlogId,
        UserId:req.session.userId
    }).then(blogData=>{
        res.json(blogData)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:"oh noes!",err})
    })
 })






module.exports = router;