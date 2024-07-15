const express=require('express');
const app=express();
const cors  = require('cors');
const {generateFile}=require("./generateFile");
const {executeCpp}=require('./executeCpp');
// middlewares
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.json({online: 'compiler'});
});
app.post("/run",async (req,res)=>{
    const {language="cpp",code}=req.body;
    if(code===undefined){
        return res.status(404).json({success:false,message:"empty code body!"});
    }
    try{
        const filePath=generateFile(language,code);
        const output=await executeCpp(filePath);
        res.json({filePath,output});

    }catch(error){
        res.status(500).json({error:error});
    }

    res.send({language,code});
});
app.listen(8080,()=>{
    console.log("server is listening on port 8080!");
});