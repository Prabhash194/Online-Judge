const fs=require('fs');
const path=require('path');
const {v4:uuid}=require('uuid');
const {exec}=require("child_process");

const outputPath=path.join(__dirname,"outputs");    //gives path till backend path

if(!fs.existsSync(outputPath)){
    fs.mkdirSync(outputPath,{recursive:true});
}

const executeCpp=(filePath)=>{
    const jobId=path.basename(filePath).split(".")[0];  //will give you last part of path i.e. jobid
    const filename=`${jobId}.exe`;
    const outPath=path.join(outputPath,filename);

    return new Promise((resolve,reject)=>{
        exec(`g++ ${filePath} -o ${outPath} && cd ${outputPath} && .\\${filename}`,(error,stdout,stderr)=>{
            if(error){
                reject({error,stderr});
            }
            if(stderr){
                reject(stderr);
            }
            resolve(stdout);
        }

        );

    });
};
module.exports={
    executeCpp,

}