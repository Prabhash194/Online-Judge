const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");

const problemsSchema=new mongoose.Schema({
    problemid:{
        type:Number,
        required:true,
    },
    title:{
        type: String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },

    difficulty : {
        type : String,
        required : true
    },
    submissions : {
        type : Number,
        required : true
    },
    marks : {
        type : Number,
        required : true
    },
    
    constraints : {
        type : String,
        required : true
    },
    inputFormat : {
        type : String,
        required : true
    },
    outputFormat : {
        type : String,
        required : true
    },
    sampleInput : {
        type : String,
        required : true
    },
    sampleOutput : {
        type : String,
        required : true
    },
    topics:{
        type:String,
        required:true
    },
    testcase:[{
        type:String,
        required:true
    }],
    output:[{
        type:String,
        required:true
    }]

    



},{
    timestamps:true
}
);
module.exports=mongoose.model("Problems",problemsSchema);