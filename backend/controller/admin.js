const User=require('../models/user')
const Group=require('../models/group')
const userGroup=require('../models/userGroup')
const adminCheck=(req,res,next)=>{
    console.log(req.body.grpId)
    userGroup.findOne({where:{
        userId:req.user.id,
        groupId:req.body.grpId
    }}).then(result=>{
        console.log(result)
        if(result==null){
            res.status(404).json({msg:'user not in group. Please add user'})
        }
        if(!result.isAdmin){
            res.status(401).json({msg:'You are not admin'})
        }
        else{
            next()
        }
    }).catch(err=>console.log(err))
}
const postAddMember=(req,res)=>{
    const addEmail=req.body.email
    const grpId= req.body.grpId
    User.findOne({where:{email:addEmail}})
    .then(addUser=>{
        if(addUser==null){
            res.status(404).json({msg:'user not found or invalid email id'})
        }else{
            let userId=addUser.id
            userGroup.create({
                userID:userId,
                groupId:grpId
            }).then(newMember=>{
                res.send({newMember})
            }).catch(err=>{
                console.log(err)
                res.status(401).json({msg:'user already in the group'})
            })
        }
    }).catch(err=>{
        console.log(err)
    })
    
}
const postRemoveMember=(req,res)=>{
    const removeEmail=req.body.email
    const grpId=req.body.grpId
    User.findOne({where:{email:removeEmail}})
    .then(removeUser=>{
        if(removeUser==null){
            res.status(404).json({msg:'user not found or invalid email id'})
        }else{
            let userId=removeUser.id
            userGroup.destroy({where:{
                userId:userId,
                groupId:grpId
            }}).then(removeMember=>{
                res.send({removeMember})
            }).catch(err=>{
                console.log(err)
                res.status(401).json({msg:'user not in the group'})
            })
        }

    }).catch(err=>console.log(err))
}
const postMakeAdmin=(req,res)=>{
    const adminEmail=req.body.email
    const grpId=req.body.grpId
    User.findOne({where:{email:adminEmail}})
    .then(addAdmin=>{
        if(addAdmin==null){
            res.status(404).json({msg:'user not found or invalid email id'})
        }else{
            let userId=addAdmin.id
            userGroup.update({isAdmin:true},{
                where:{
                    userId:userId,
                    groupId:grpId
                }
            }).then(adminMember=>{
                res.send({adminMember})
            }).catch(err=>console.log(err))
        }
    }).catch(err=>console.log(err))
}
const postRemoveAdmin=(req,res)=>{
    const adminEmail=req.body.email
    const grpId=req.body.grpId
    User.findOne({where:{email:adminEmail}})
    .then(adminUser=>{
        if(adminUser==null){
            res.status(404).json({msg:'user not found or invalid email id'})
        }else if(adminUser.id==req.user.id){
            res.status(401).json({msg:'You cannot remove yourself from admin'})
        }else{
            let userId=addAdmin.id
            userGroup.update({isAdmin:false},{
                where:{
                    userId:userId,
                    groupId:grpId
                }
            }).then(adminMember=>{
                res.send({adminMember})
            }).catch(err=>console.log(err))
        }
    }).catch(err=>console.log(err))
}
module.exports={adminCheck,
postAddMember,
postMakeAdmin,
postRemoveAdmin,
postRemoveMember}