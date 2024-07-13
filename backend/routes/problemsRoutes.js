const express=require('express');
const app=express();
const Problems=require("../models/ProblemsModel");
const User=require("../models/UserModel");
const { stringify } = require('querystring');
const {createProblem,deleteProblem,getallProblems,updateProblems,getProblem}=require('../controllers/problemController');



const ProblemRouter=express.Router();

  ProblemRouter.post('/create',createProblem);
  ProblemRouter.delete('/delete/:id',deleteProblem);
  ProblemRouter.get('/problemset',getallProblems);
  ProblemRouter.put('/update/:id',updateProblems);
  ProblemRouter.get('/problem/:id',getProblem);

module.exports=ProblemRouter;