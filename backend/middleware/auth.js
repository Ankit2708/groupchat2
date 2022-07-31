const User=require('../models/user')
const bcrypt=require('bcrypt')
var jwt=require('jsonwebtoken');

const saltRounds=10;
const isAuthenticate=async(req,res,next)=>{
    try{
        const token=req.header('Authorization')
        //console.log(token)
        const userId=jwt.verify(token,'95e27267d2d6fb35b686eea82069247091b17b903d98ec5ee2333bb64a956540c37389b8ca52505ead7af47de4d87f8b2d03ae8ee48214e059361542864fabc9')
        console.log(typeof (userId))
        const user= await User.findByPk(Number(userId))
            console.log(user)
            req.user=user
            next()
        
    }catch(err){
        res.status(404).json({message:err})
    }
}

module.exports=isAuthenticate;
