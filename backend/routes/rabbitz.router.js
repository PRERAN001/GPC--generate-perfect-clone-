const express=require('express')
const router=express.Router()
const { loginuser, currentresult } = require('../controllers/rabbitz.controller')
router.post('/login',loginuser)
router.post("/current",currentresult)
module.exports=router