const express = require('express');
const router = express.Router();
const {Blog,User,Comment} = require('../models');


//all routes pass in session data so the handlebar can check if there's a user logged in or not to display the correct 
//login or logout link 

//get route that gets all the blog post and include users to display at the home page
//renders the home handlebar and pass in queried data
router.get("/",(req,res)=>{
    Blog.findAll({
        include:[User]
    }).then(blogData=>{
        const hbsBlog = blogData.map(blog=>blog.toJSON())
        console.log(hbsBlog)
        res.render("home",{
            allBlogs:hbsBlog,
            session:req.session
        })
    })
})

//get route to /login that checks if theres already a user logged in. if so then it redirects them to dashboard page
//if not logged in then it will render login handle bar which will have a form to login
router.get("/login",(req,res)=>{
    if(req.session.userId){
        res.redirect("/dashboard")
    } else {
        res.render("login")
    }
})

//get route to /signup that renders the signup handlebar that has a form to sign up 
router.get("/signup",(req,res)=>{
    res.render("signup")
})

//get route to /dashboard that make sure someone is logged in.
//then it takes the session's store userId to look for all the blog post created by logged in user
//renders dashboard handlebar and pass in queried data
router.get("/dashboard",(req,res)=>{
    if(!req.session.userId){
        return res.redirect("/login")
    }
    User.findByPk(req.session.userId,{
        include:[Blog]
    }).then(userData=>{
        const userInfo = userData.toJSON()
        console.log(userInfo)
        res.render("dashboard",{
            allBlogs:userInfo.Blogs,
            session:req.session
        })
    }).catch(err=>{
     console.log(err);
     res.status(500).json({msg:"oh noes!",err})
    })
})

//get route to /logout that destroy the session and redirct to the login page
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
    
});

//get route to /createpost that renders the createpost handle bar
router.get('/createpost', (req, res) => {
    res.render("createpost",{
        session:req.session
    });
    
});
//get route to /edit/id that first find the post at the indexed 
//then pass in the post data and renders editpost handlebar
router.get('/edit/:id', (req, res) => {
    Blog.findByPk(req.params.id,{
        include:[User]
    }).then(blogData=>{
        res.render("editpost",{
            blog:blogData.toJSON(),
            session:req.session
        })
    }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:"oh noes!",err})
    })
  });

//get route to post
router.get('/post/:id', (req, res) => {
Blog.findByPk(req.params.id,{
    include:[{model:User},{model: Comment, include: [User] }]
}).then(blogData=>{
    console.log(blogData.toJSON());
    res.render("post",{
        blog: blogData.toJSON(),
        session:req.session
    })
}).catch(err=>{
    console.log(err);
    res.status(500).json({msg:"oh noes!",err})
})
});

module.exports = router;