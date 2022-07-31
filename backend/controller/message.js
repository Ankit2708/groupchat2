const express=require('express')
// const Sequelize=require('sequelize')
const Message=require('../models/message')
const Group=require('../models/group')
const addMessage=(req,res)=>{
    const groupid=req.body.groupid
    let message=req.body.message
    const user=req.user
    console.log(user)
    let username=req.user.name
    user.createMessage({
        msg:message,
        username:username,
        gId:groupid
    }).then(result=>{
        console.log(result)
        res.status(200).json({result})
    }).catch(err=>console.log(err))
}
const getMessage=async(req,res)=>{
    // //const lastId=req.query.lastmsg||0

    // let groupid=req.query.grpId
    // let lastIdN=+lastId
    // const userid=req.user.id
    // console.log(userid)
    // groupid=+groupid
    // console.log(groupid)
    // let trueuser=false
    // await Group.findByPk(groupid).then(async(groups)=>{
    //     const userids=groups.users.split(',')
    //     for(let i=0;i<userids.length;i++){
    //         if(userid==userids[i]){
    //             trueuser=true
    //         }
    //     }
    // }).catch(err=>{
    //     console.log(err)
    // })
    // if(trueuser){
    //     Message.findAll({offset:lastIdN,where:{groupid:groupid}}).then(msgs=>{
    //         //console.log(msg)
    //         // let userdata=msgs.data
    //         // console.log(userdata)
    //         res.json(msgs)
    //     }).catch(err=>{
    //         console.log(err)
    //     })
    
    
    // }else{
    //     return res.json("user not allowed")
    // }
    let groupid=req.query.grpId
    Message.findAll({where:{gId:groupid}})
    .then(msgs=>{
        res.status(200).json({msgs})
    }).catch(err=>{
        console.log(err)
    })
}
module.exports={addMessage,getMessage}