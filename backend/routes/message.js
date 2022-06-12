const express=require('express')
const router=express.Router()
const messageController=require('../controller/message')
const loginVerify=require('../middleware/auth')
router.post('/addmessage',loginVerify.isAuthenticate,messageController)
module.exports=router