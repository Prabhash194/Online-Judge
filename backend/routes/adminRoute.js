const express = require('express');
const { Getuser, deleteUser } = require('../controllers/adminController.js');
const { isAdmin } = require('../middlewares/verifyToken.js');

const AdminRoutes=express.Router()

 AdminRoutes.get('/getuser',isAdmin,Getuser)
 AdminRoutes.delete('/delet/:id',isAdmin,deleteUser)

module.exports = AdminRoutes;
