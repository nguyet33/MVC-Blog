const express = require('express');
const router = express.Router();
const {User} = require('../models');
const bcrypt = require("bcrypt");


//get route that gets all users in the database
router.get("/",(req,res)=>{
    User.findAll().then(userData=>{
     res.json(userData)
    }).catch(err=>{
     console.log(err);
     res.status(500).json({msg:"uh oh",err})
    })
 })

//get route that get the user at the indexed id
//includes all the blog post this user has posted as well
router.get("/:id",(req,res)=>{
    User.findByPk(req.params.id,{
        include:[Blog]
    }).then(userData=>{
     res.json(userData)
    }).catch(err=>{
     console.log(err);
     res.status(500).json({msg:"oh noes!",err})
    })
 })

//post route that creates a new user and then adds id and email it into our session
router.post("/",(req,res)=>{
    console.log(req.body);
    User.create({
        email:req.body.email,
        password:req.body.password
    }).then(userData=>{
        console.log(userData);
        req.session.userId = userData.id;
        req.session.userEmail = userData.email;
        res.json(userData)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:"oh noes!",err})
    })
})

//post route that login in user by finding the email first
//checks if theres such email
//if there is email it uses bcrypt to convert entered password and compares it to the password stored in data base
//if it matches then it updates the session variables 
router.post("/login",(req,res)=>{
    User.findOne({
    where:{
     email:req.body.email
    }
    }).then(userData=>{
     if(!userData){
         return res.status(401).json({msg:"incorrect email or password"})
     } else {
         if(bcrypt.compareSync(req.body.password,userData.password)){
             req.session.userId = userData.id;
             req.session.userEmail = userData.email;
             return res.json(userData)
         } else {
             return res.status(401).json({msg:"incorrect email or password"})
         }
     }
    }).catch(err=>{
     console.log(err);
     res.status(500).json({msg:"oh noes!",err})
    })
 })

 module.exports = router;