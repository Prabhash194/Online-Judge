const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");

const userSchema=new mongoose.Schema({
    
    username:{
        type:String,
        required:true,
        unique:true
    
    },
    
    email:{
        type:String,
        required:true,
        unique:true
    },
    role:{
        type:String,
        enum:['admin','user'],
        default:"user"
    },
    password:{
        type:String,
        required:true

    },
    
    
    

},
{
    timestamps:true
}
);

// userSchema.pre("save", async function () {
//     this.password = await bcrypt.hash(this.password, 12);
//   });
const UserModel= mongoose.model('users',userSchema)


module.exports = UserModel;