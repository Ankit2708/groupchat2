const express=require('express')
exports.addMessage=(req,res)=>{
    let msg=req.body.msg
    req.user.createMessage({
        msg:msg
    }).then(res=>{
        res.status(201).json("mesage added")
    }).catch(err=>console.log(err))
}