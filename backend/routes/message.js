const express=require('express')
const router=express.Router()
const messageController=require('../controller/message')
const loginVerify=require('../middleware/auth')
router.post('/addmessage', loginVerify.isAuthenticate,messageController.addMessage)
router.get('/getmessage',messageController.getMessage)
module.exports=router