const User=require('../util/database')
const bcrypt=require('bcrypt')
var jwt=require('jsonwebtoken');

const saltRounds=10;
exports.isAuthenticate=(req,res)=>{
    try{
        const token=req.header('Authorization')
        const userId=jwt.verify(token,'95e27267d2d6fb35b686eea82069247091b17b903d98ec5ee2333bb64a956540c37389b8ca52505ead7af47de4d87f8b2d03ae8ee48214e059361542864fabc9')
        User.findByPk(userId.id).then(user=>{
            req.user=user
            next()
        }).catch(err=>{
            console.log(err)
        })
    }catch(err){
        res.status(404).json({message:'user not found'})
    }
}
