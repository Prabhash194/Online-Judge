const UserModel=require('../models/UserModel');
const bcrypt=require('bcrypt');




const getAllUsers=async(req,res)=>{
    try{
        const users=await UserModel.find({},{password:0});
        const usersWithPostCounts = await Promise.all(
            users.map(async (user) => {
                const postCount = await Post.countDocuments({ author: user._id });
                return { ...user._doc, postCount };
            })
        );

        res.json(usersWithPostCounts);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getUser=async(req,res)=>{
    try {
        const userId = req.params.id;
        const user = await UserModel.findById(userId);
    
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        // Adjust the response according to what data you need to send
        res.status(200).json({ username: user.username, email: user.email });
      } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
}

module.exports={getAllUsers,getUser};
