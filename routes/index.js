const express = require('express')
const router = express.Router()
//import router module
const restaurants = require('./restaurants')

router.get('/',(req,res)=>{
  res.send('this will be restaurant list!')
})

//use router
router.use('/restaurants', restaurants)

module.exports = router