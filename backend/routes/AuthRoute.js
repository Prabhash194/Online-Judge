const express=require('express');
const router=express.Router();
const UserModel=require("../models/UserModel")

const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const {authenticateToken,authorizeRoles}=require("../middlewares/auth");

const {register,login,logout}=require('../controllers/AuthControllers');


const AuthRoute=express.Router();

  AuthRoute.post('/register',register);
  AuthRoute.post('/login',login);
  AuthRoute.post('/logout',logout);

  // ACCESS PROTECTED ROUTE

  AuthRoute.get("/profile",authenticateToken,async(req,res)=>{
    const {token}=req.cookies;
    console.log("Profile endpoint hit");
    console.log("req.user:", req.user);

    res.json({token,role:req.user.role,userId:req.user.id,username:req.user.username,emailId:req.user.emailId});
  })


module.exports=AuthRoute;
