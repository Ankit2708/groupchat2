const User=require('../models/user')
const bcrypt=require('bcrypt')
var jwt=require('jsonwebtoken')
const saltRounds=10
exports.createUser=(req,res)=>{
    const name=req.body.name;
    const email=req.body.email;
    console.log(email)
    const phoneNumber=req.body.phoneNumber;
    console.log(phoneNumber)
    const password=req.body.password
    User.findAll({where:{email}})
    .then(res=>{
        if(res.length>0){
            return res.json({message:'User already exist'})
        }
        bcrypt.hash(password, saltRounds,function(err,hash){
            User.create({
                name,
                email,
                phoneNumber,
                password:hash
            }).then(res=>{
                console.log(res)
                res.json({
                    name:req.body.name,
                    email:req.body.email,
                    message:'successfully logged in'
                })
            }).catch(err=>console.log(err))
        })
    }).catch(err=>console.log(err))
}
const loginUser=(req,res)=>{
    const email=req.body.email;
    const password=req.body.password;
    User.findOne({where:{email}})
    .then(user=>{
        if(user){
            const user=user.id
            const email=user.email
            const pass=user.password
            const name=user.name
            bcrypt.compare(pass,password).then(res=>{
                if(res){
                    var token=jwt.sign({id:id},'95e27267d2d6fb35b686eea82069247091b17b903d98ec5ee2333bb64a956540c37389b8ca52505ead7af47de4d87f8b2d03ae8ee48214e059361542864fabc9')
                    res.status(200).json({email:email,name:name,token:token,msg:"ligin successful"})
                }else{
                    res.status(401).json({msg:"login failed"})
                }
            }).catch(err=>{
                console.log(err)
            })
        }else{
            res.status(404).json({msg:"user not found"})
        }
    }).catch(err=>{
        console.log(err)
    })
}
module.exports=loginUser;
