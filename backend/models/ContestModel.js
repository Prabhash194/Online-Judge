const mongoose=require('mongoose');
const Problems=require('./ProblemsModel')
const contestSchema=new mongoose.Schema({
    contest_name:{
        type:String,
        required:true
    },
    problems:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Problems',
    }],
    start_time:{
        type:Date,
        required:true
    },
    end_time:{
        type:Date,
        required:true
    },
    
    

},
{
    timestamps:true
}
);
module.exports=mongoose.model('Contest',contestSchema);