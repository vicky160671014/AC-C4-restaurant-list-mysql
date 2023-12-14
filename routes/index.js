const express = require('express')
const router = express.Router()
//import router module
const restaurants = require('./restaurants')
const search = require('./search')

router.get('/',(req,res)=>{
  res.send('this will be restaurant list!')
})

//use router
router.use('/restaurants', restaurants)
router.use('/search', search)

module.exports = router