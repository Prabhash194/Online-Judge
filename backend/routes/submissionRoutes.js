const express=require('express');
const mongoose=require('mongoose');
const router=express.Router();
const Problem=require('../models/ProblemsModel');
const Submission=require('../models/SubmissionModel')
const {executeCpp}=require('../executeCpp');
const {generateFile}=require('../generateFile');
const {generateInputFile}=require('../generateInputFile');

const {authenticateToken, authorizeRoles}=require('../middlewares/auth')
const {run,submit,getallSubmissions}=require('../controllers/submissionController');





const SubmissionRoute=express.Router();

  SubmissionRoute.post('/run',run);
  SubmissionRoute.post('/submit',authenticateToken,submit);
  SubmissionRoute.get('/:problemId',getallSubmissions);
  

module.exports=SubmissionRoute;