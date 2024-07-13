const fs=require('fs');
const path=require('path');
const {v4:uuid}=require('uuid');
const {exec}=require("child_process");

const outputPath=path.join(__dirname,"outputs");    //gives path till backend path

if(!fs.existsSync(outputPath)){
    fs.mkdirSync(outputPath,{recursive:true});
}

const executeCpp=(filePath,inputPath)=>{
    const jobId=path.basename(filePath).split(".")[0];  //will give you last part of path i.e. jobid
    const filename=`${jobId}.out`;
    const outPath=path.join(outputPath,filename);
    

    return new Promise((resolve,reject)=>{
        console.log("input path",inputPath);
        console.log("checking input path in executecpp",inputPath);
        exec(`g++ ${filePath} -o ${outPath} && cd ${outputPath} && ./${filename} < ${inputPath}`,(error,stdout,stderr)=>{
            if(error){
                
                reject({error,stderr});
            }
            if(stderr){
                reject(stderr);
            }
            resolve(stdout);
        },
        // exec(`g++ ${filePath} -o${outPath}`){
            
        //     exec("./${filename} < inputPath", {cwd: outputPath})

        // }

        );

    });
};
module.exports={
    executeCpp,

}