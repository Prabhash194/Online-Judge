const express = require('express');
const app = express();
const User = require("../models/UserModel")
const Problem = require("../models/ProblemsModel")
const Contest = require("../models/ContestModel");
const {createContest,getallContests,getContest,updateContest,deleteContest}=require('../controllers/contestController');




const ContestRoute=express.Router();

  ContestRoute.post('/create',createContest);
  ContestRoute.get('/allcontests',getallContests);
  ContestRoute.get('/contest/:id',getContest);
  ContestRoute.put('/update/:id',updateContest);
  ContestRoute.delete('/delete/:id',deleteContest);

module.exports=ContestRoute;

