const express=require('express');
const router=express.Router();
const User=require('../models/UserModel');
const bcrypt=require('bcrypt');

const {getAllUsers,getUser}=require('../controllers/userController');



const UserRoute=express.Router();

  UserRoute.get("/allusers",getAllUsers);
  UserRoute.get("/:id",getUser);


module.exports=UserRoute;