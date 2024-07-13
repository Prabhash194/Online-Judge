const Problems=require('../models/ProblemsModel');


const createProblem=async(req,res)=>{
    try{
        const {problemid,title,description,difficulty,submissions,marks,constraints,inputFormat,outputFormat,sampleInput,sampleOutput,topics,testcase,output}=req.body;
        if(!problemid || !title || !description || !difficulty || !submissions || !marks || !constraints || !inputFormat || !outputFormat || !sampleInput || !sampleOutput || !topics || !testcase || !output){
            return res.status(400).send('Request body is missing');
        }
        // const userAuth=await User.findOne({email:email});
        // if(!userAuth){
        //     return res.status(401).send('Unauthorized');
        // }
        
        const oldProb=await Problems.findOne({title:title});
        if(oldProb){
            return res.status(400).send('Problem already exists');

        }
        const newProb=new Problems({
            problemid,
            title,
            description,
            difficulty,
            submissions,
            marks,
        
            constraints,
            inputFormat,
            outputFormat,
            sampleInput,
            sampleOutput,
            topics,
            testcase,
            output,

        
        });
        const savedProblem=await newProb.save()
        
        res.status(201).json(savedProblem);


    }catch(error){
        console.log("Failed to create problem:", error);
        res.status(500).send('Internal Server Error');

    }
}
const deleteProblem=async(req,res)=>{
    try{
        // const { email } = req.body; // Ensure email is provided in the request body

        // if (!email) {
        //     return res.status(400).send('Email is required');
        // }

        // const userAuth = await User.findOne({ email });
        // if (!userAuth) {
        //     return res.status(401).send('Unauthorized');
        // }

        const prob = await Problems.findByIdAndDelete(req.params.id);
        if (!prob) {
            return res.status(404).send('Problem not found');
        }

       
        res.send('Problem Deleted');
    }catch(error){
        console.log("Failed to delete problem");
    }

}
const getallProblems=async(req,res)=>{
    try {
        const savedGetProblem = await Problems.find({});
        res.status(200).json({
            status: 'Success',
            data: { savedGetProblem }
        });
    } catch (err) {
        res.status(500).json({
            status: 'Failed',
            message: err.message
        });
    }
}

const updateProblems=async(req,res)=>{
    try{
        // const { email } = req.body;

        // if (!email) {
        //     return res.status(400).send('Email is required');
        // }

        // const userAuth = await User.findOne({ email });
        // if (!userAuth) {
        //     return res.status(401).send('Unauthorized');
        // }

        const updatedProblem = await Problems.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        if (!updatedProblem) {
            return res.status(404).send('Problem not found');
        }

        res.status(200).send('Problem updated');
    }catch(error){
        console.log("error updating problem");
    }
}

const getProblem=async(req,res)=>{
    try {
        const problem = await Problems.findById(req.params.id);
        res.status(200).json({
            status: 'Success',
            data: { problem }
        });
    } catch (err) {
        res.status(500).json({
            status: 'Failed',
            message: err.message
        });
    }
}

module.exports={createProblem,deleteProblem,getallProblems,updateProblems,getProblem};