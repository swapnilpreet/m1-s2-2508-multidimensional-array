const express=require('express');
const UserModel = require('../models/user.model');
const bcrypt =require('bcrypt')
const UserRouter=express.Router();
const jwt =require("jsonwebtoken");
const passport=require('passport');
const GitHubStrategy =require('passport-github2');
const nodemailer = require("nodemailer");
require('dotenv').config();

UserRouter.post('/signup',async(req,res)=>{
    try {
        const {username,email,password,role}=req.body;
        
        bcrypt.hash(password,5,async(err,hash)=>{
            if(err){
                res.status(500).json({message:"Something wrong in signup route",err})
            }else{
                await UserModel.create({username,email,password:hash,role})
            }
        })
        res.status(201).json({message:"signup Sucess"})
        
    } catch (error) {
        res.status(500).json({message:"Something wrong in signup route",error})
    }
})

UserRouter.post("/login",async(req,res)=>{
    try {
        const {email,password}=req.body;

        const user=await UserModel.findOne({email});

        if(!user){
            return res.status(404).json({message:"User not found Or check Email Id"})
        }
        // compare hash pass from DB using bcrypt
        bcrypt.compare(password,user.password).then(function(result){
            if(result){ 
                //after compare hash pass after true generate token using user_id and role
                let accessToken=jwt.sign({userId:user._id,role:user.role},process.env.JWT_SECRET,{expiresIn:120});
                let refreshToken=jwt.sign({userId:user._id,role:user.role},process.env.JWT_SECRET,{expiresIn:240});
                res.status(200).json({message:"Login Sucess",accessToken,refreshToken})
            }else{
                res.status(403).json({message:"Wrong Password"})
            }
        })
    } catch (error) {
        res.status(500).json({type:"Error Occured in login",error})
    }
})



// console.log(process.env.GOOGLE_APP_EMAIL,process.env.GOOGLE_APP_PASSWORD)
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email", // simple mailtranspot protocal
  port: 587,
  auth: {
    user: process.env.GOOGLE_APP_EMAIL, // google_app_email
    pass: process.env.GOOGLE_APP_PASSWORD, // google_app_password
  },
});
 

UserRouter.get('/sendemail',async(req,res)=>{
  await transporter.sendMail({
    from: '"Swapnil Ramteke" <swapnilramteke004@gmail.com>',
    to: "hritikramteke358@gmail.com",
    subject: "Hello ✔",
    html: "<b>Swapnil</b>" ,
  });

  res.status(201).json({message:"Email send"})
})



















// o-auth-github2-passport
// console.log(process.env.GITHUB_CLIENT_ID,process.env.GITHUB_CLIENT_SECRET,process.env.CALLBACK_URL)
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ githubId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });
    console.log(profile);
    console.log(err)
    return done(null, profile);
  }
));
 
// call github login page authrorization page
// route is localhost3000/users/auth/github
UserRouter.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }));

//   this is for call back route login sucuess or failure
UserRouter.get('/auth/github/callback', 
  passport.authenticate('github', {session:false,failureRedirect: '/login' }),
  async function(req, res) {
    console.log(req.user)
    const githubuserId=req.user.id;
    const user=await UserModel.find({profileId:githubuserId});
    // Successful authentication, redirect home.
    // res.redirect('/');
    if(user.length==0){
        let newUser=await UserModel.create({profileId:githubuserId});
        var token=jwt.sign({userId:newUser._id,role:newUser.role},process.env.JWT_SECRET);
        res.status(200).json({message:"login with gihub2 sucess",token})
    }else{
        res.status(200).json({message:"login with gihub2 sucess",token})  
    }
});

module.exports=UserRouter; 