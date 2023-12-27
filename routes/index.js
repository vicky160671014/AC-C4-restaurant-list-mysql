const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')

const passport = require('passport')
const LocalStrategy = require('passport-local')

const db = require('../models')
const User = db.User

//passport初始化
passport.use(new LocalStrategy({usernameField:'email'},(username, password ,done)=>{
  return User.findOne({
    attributes:['id','name','email','password'],
    where:{ email: username },
    raw:true
  })
            .then((user)=>{
              if(!user){
                return done(null, false, {message:'email或密碼錯誤'})
              }
              return bcrypt.compare(password, user.password)
                          .then((isMatch)=>{
                            if(!isMatch){
                              return done(null, false, {message:'email或密碼錯誤'})
                            }
                            return done(null, user)
                          })
            })
            .catch((error)=>{
              error.errorMessage = '登入失敗'
              done(error)
            })
}))

passport.serializeUser((user, done)=>{
  const { id, name, email } = user
  return done(null, { id, name, email})
})

passport.deserializeUser((user, done)=>{
  done(null, { id: user.id })
})


//import router module
const restaurants = require('./restaurants')
const search = require('./search')
const users = require('./users')
const authHandler = require('../middlewares/auth-handler')

router.get('/',(req,res)=>{
  res.send('this will be restaurant list!')
})

//use router
router.use('/restaurants',authHandler, restaurants)
router.use('/search',authHandler, search)
router.use('/users',users)

router.get('/register',(req,res)=>{
  return res.render('register')
})

router.get('/login',(req,res)=>{
  return res.render('login')
})

router.post('/login', passport.authenticate('local',{
  successRedirect: '/restaurants',
  failureRedirect:'/login',
  failureFlash:true
}))

router.post('/logout',(req,res,next)=>{
  req.logout((error)=>{
    if(error){
      return next(error)
    }

    return res.redirect('/login')

  })
})

module.exports = router