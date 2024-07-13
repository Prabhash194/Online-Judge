const UserModel=require("../models/UserModel")


const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');


const register=async(req,res)=>{
    try {
        console.log("checking register")
        const {username,email,password,role}=req.body
           
        const existUser= await UserModel.findOne({email})
        if (existUser) {
            return res.status(401).json("User already Exist")
        }
        const hashpassword= await bcrypt.hashSync(password,10)
        const newUser= new UserModel({
            username,email,password:hashpassword,role
        })
        
          await newUser.save()

          res.status(200).json({message:"user registered successfully",newUser})
    } catch (error) {
        res.status(500).json("Error registering user");
        console.log(error)
    }

}

const login=async(req,res)=>{
    try{
        const {email,password}=req.body

          const user=await UserModel.findOne({email})

          if (!user || !(await bcrypt.compare(password,user.password))) {
              return res.status(401).json({error:"Invalid credentials"});
          }

        //   const ispassaowrdValid= await bcrypt.compare(password,user.password)
        //   if (!ispassaowrdValid) {
        //     return res.status(404).json({success:false,message:"Invalid credentials"})
            
        //     }
        //        const token= jwt.sign({userId:user._id},process.env.SECRET)
            

        //         res.cookie('token',token,{
        //             httpOnly: true,
        //             secure: false,
        //             maxAge: 3600000,
                    
        //         })
        const token=jwt.sign({userId:user._id,role:user.role},process.env.SECRET);
        res.cookie("token",token,{secure:true,sameSite:"None",maxAge:3600000});

        res.json({token,role:user.role});

    } catch (error) {
        res.status(500).json({error:"Error logging in"});
        console.log(error)
    }
};


const logout=async(req,res)=>{
        res.clearCookie("token");
        res.clearCookie("role");
        res.status(200).json({message:"user Logout successfully"})
    
};


module.exports={register,login,logout};