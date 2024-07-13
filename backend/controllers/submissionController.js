const express=require('express');
const mongoose=require('mongoose');
const router=express.Router();
const Problem=require('../models/ProblemsModel');
const Submission=require('../models/SubmissionModel')
const {executeCpp}=require('../executeCpp');
const {generateFile}=require('../generateFile');
const {generateInputFile}=require('../generateInputFile');


const run=async(req,res)=>{
    const { language = 'cpp', code,problemId,input } = req.body;
    console.log(language);
    // const userId=req.user._id;
    // console.log('checking userid',userId);
    
    if (!code) {
        return res.status(400).json({ success: false, error: "Empty code!" });
    }
  
    try {
        const filePath =await generateFile(language, code);
        const inputPath =await generateInputFile(input);
        const output = await executeCpp(filePath,inputPath);
        res.json({filePath,output,inputPath});
    } catch (error) {
       
        if (error.stderr) {
            
            console.log(error.stderr);
            status='Compilation Error'
            output = error.stderr;
        
        } else if (error.error) {
            console.log(error.error);
            status='Runtime Error'
            output = error.error;
        } else {
            console.log(error);
            
            output = error.toString();
    
        }
    }

    
    // res.status(200).json({
    //     status:'success',
    //     data:{output}
    // });
};
const submit=async(req,res)=>{
    const { language = 'cpp', code,problemId,userId} = req.body;
  
    console.log("checking userid",userId);
    if (!code) {
        return res.status(400).json({ success: false, error: "Empty code!" });
    }

    let filePath, output, status;
    try{
        const problem=await Problem.findById(problemId);
        if(!problem){
            return res.status(400).json({message:'Problem not found'});
        }

        //GENERATE FILE PATH FROM CODE
        
        const filePath=await generateFile(language,code);
       
        let status='Accepted';
        let output='';

        

        for(let i=0;i<problem.testcase.length;i++){
            const testcase=problem.testcase[i];

            console.log("checking submit",testcase);
            const expectedOutput=problem.output[i];
            console.log("checking output",expectedOutput);

            //EXECUTE THE CODE WITH THE CURRENT TEST CASE
            try{
                console.log("entering try block");
                const inputPath =await generateInputFile(testcase);
                const result=await executeCpp(filePath,inputPath,testcase);
                console.log("checking result",result);
                if(result.trim()!==expectedOutput.trim()){
                    status='Wrong Answer';
                    break;
                }


            }catch(error){
                console.log("checking error",error);
                if(error.stderr){
                    status='Compilation Error';
                    
                    output=error.stderr;
                    console.log("checking stderr",output);
                }else if(error.error){
                    status='Runtime Error';
                    output=error.error;
                    console.log("checking error",output);
                }else{
                    status='Execution Error';
                    output=error.toString();
                    console.log("checking status",output);
                }
                break;
            }
        }

        //SAVE THE SUBMISSION RESULT

        const submission=new Submission({

            userId,
            problemId,
            language,
            code,
            
            status,
            output,
            createdAt:new Date()

        });
        await submission.save();

        res.status(200).json({
            status:'Success',
            data:{submission}
        });


    }catch(error){
        console.log('Error during submission:',error);
        res.status(500).json({error:'Failed to process submission'});
    }

};

const getallSubmissions=async(req,res)=>{
    const {problemId}=req.params;
    try{
        const submissions=await Submission.find({problemId}).populate('userId','username');
        res.status(200).json({
            status: 'Success',
            data: { submissions }
        });
    }catch(error){
        console.error('Error fetching submissions:', error);
        res.status(500).json({error:'Failed to fetch submissions'});
    }
};

module.exports={run,submit,getallSubmissions}


