const express = require('express')
const router = express.Router()

const db = require('../models')
const Restaurant = db.Restaurant

router.post('/',(req,res)=>{
  res.send(req.body)
})


module.exports = router