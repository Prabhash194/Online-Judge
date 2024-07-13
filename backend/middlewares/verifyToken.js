const jwt=require('jsonwebtoken');
const UserModel=require('../models/UserModel');
const jwksClient=require('jwks-rsa');

const client=jwksClient({
  jwksUri:'https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com'
});

function getKey(header,callback){
  console.log('Fetching key for kid:', header.kid);
  client.getSigningKey(header.kid,(err,key)=>{
    if(err){
      return callback(err);
    }
    if(!key){
      return callback(new Error('No key found'));
    }

    const signingKey=key.publicKey || key.rsaPublicKey;
    callback(null,signingKey);
  });
}

const isAdmin=async(req,res,next)=>{
    try{
        const token=req.cookies.token
        if(!token){
            return res.status(401).json({messsage:"'Unauthorized: No token provided'"})
        }
        const decoded=jwt.verify(token,process.env.SECRET)
        const user=await UserModel.findById(decoded.userId)
         if (!user) {
            return res.status(401).json({messsage:"'user not found'"})
         }

         if (user.role !=='admin') {
            return res.status(403).json({messsage:'Unauthorized: User is not an admin'})
         }
        req.user={
          userId:user._id,
          role:user.role
         
        };
        next();
    } catch (error) {
        console.log(error)
        return res.status(50).json({message:'internal server error'});
    }
    
};

const isUser=async(req,res,next)=>{
    try{
        const token=req.cookies.token
        if(!token){
            return res.status(401).json({messsage:"'Unauthorized: No token provided'"})

        }
        const decoded= jwt.verify(token,process.env.SECRET)
      const user=await UserModel.findById(decoded.userId)
      if (!user) {
         return res.status(401).json({messsage:"'user not found'"})
      }

    
    req.user={
      userId:user._id,
      role:user.role
    };
      next();
   
    } catch (error) {
     console.log(error)
     return res.status(500).json({message:'internal server error'});
    }
};

const authenticateUser=async(req,res,next)=>{
  const authHeader=req.header('Authorization');
  if(!authHeader){
    return res.status(401).json({status: 'Failed', messsage:'Access Denied: No token provided'});;
  }

  const token=authHeader.split(' ')[1];
  if(!token){
    return res.status(401).json({status:'failed',message:'Access denied: no token provided'});
  }

  try{
    const decoded=jwt.verify(token,process.env.SECRET);
    const user=await UserModel.findById(decoded.userId);
    if(!user){
      return res.status(401).json({message:"User not found"});
    }

    req.user={
      userId:user._id,
      role:user.role
    };
    next();
  }catch(error){
    return res.status(400).json({status:'failed',message:'invalid token'});
  }
};
module.exports={isAdmin,isUser,authenticateUser};