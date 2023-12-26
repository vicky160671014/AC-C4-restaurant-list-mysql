const express = require('express')
const router = express.Router()
//import router module
const restaurants = require('./restaurants')
const search = require('./search')
const users = require('./users')

router.get('/',(req,res)=>{
  res.send('this will be restaurant list!')
})

//use router
router.use('/restaurants', restaurants)
router.use('/search', search)
router.use('/users',users)

router.get('/register',(req,res)=>{
  return res.render('register')
})

router.get('/login',(req,res)=>{
  return res.render('login')
})

router.post('/login',(req,res)=>{
  return res.send(req.body)
})

router.post('/logout',(req,res)=>{
  return res.send('logout')
})

module.exports = router