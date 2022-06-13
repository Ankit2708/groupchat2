const express=require('express')
// const Sequelize=require('sequelize')
const Message=require('../models/message')
const addMessage=(req,res)=>{
    let msg=req.body.msg
    const user=req.user
    user.createmessages({
        msg:msg,
        username:req.user.name
    }).then(data=>{
        console.log(data)
        res.status(201).json("message added")
    }).catch(err=>console.log(err))
}
const getMessage=(req,res)=>{
    Message.findAll().then(msgs=>{
        let userdata=msgs.data
        console.log(userdata)
        res.json(msgs)
    }).catch(err=>{
        console.log(err)
    })
}
module.exports={addMessage,getMessage}