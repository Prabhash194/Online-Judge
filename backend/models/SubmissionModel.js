const mongoose=require('mongoose');
const Problems=require('./ProblemsModel')

const submissionModel=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true
    },
    
    problemId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Problems',
        required:true
    },
    language:{
        type:String,
        required:true
    },
    code:{
        type:String,
        required:true
    },
    
    status:{
        type:String,
        enum:['Pending','Accepted','Wrong Answer','Runtime Error','Compilation Error','Time Limit Exceeded','Memory Limit Exceeded'],
        default:'Pending'
    },
    input:{
        type:String,
        default:''
    },
    output:{
        type:String,
    },
    createdAt:{
        type:Date,
        default:Date.now
    },


},
{
    timestamps:true
}
);

module.exports=mongoose.model('Submission',submissionModel);