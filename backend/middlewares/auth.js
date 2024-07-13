const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const UserModel = require("../models/UserModel");

dotenv.config();

const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.SECRET, async (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        try{

        const _user = await UserModel.findById(user.userId);
        if (!_user) return res.sendStatus(401);
        req.user = {
            id:_user._id,
            role:_user.role,
            username:_user.username,
            emailId:_user.email,
        };
        next();
    }catch(error){
        return res.sendStatus(500);
    }
    });
};

const authorizeRoles = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).send("authroles failed");
        }
        next();
    };
};

module.exports = { authenticateToken, authorizeRoles };