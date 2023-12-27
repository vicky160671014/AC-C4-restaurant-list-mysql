const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')

const db = require('../models')
const User = db.User

router.post('/',(req, res, next)=>{
  const { name, email, password, confirmPassword} = req.body
  if( !email || !password ){
    req.flash('error','電郵email及密碼password為必填')
    return res.redirect('back')
  }
  if( password !== confirmPassword){
    req.flash('error','密碼與驗證密碼不符')
    return res.redirect('back')
  }

  return User.count({where: { email } })
                  .then((rawCount)=>{
                    if(rawCount > 0){
                      req.flash('error','此email已註冊')
                      return res.redirect('back')
                    }

                    return bcrypt.hash(password, 10)
                                .then((hash)=> User.create({ email, name, password: hash }))
                  })
                  .then((user)=>{
                    if(!user){
                      res.redirect('back')
                    }
                    req.flash('success','註冊成功')
                    return res.redirect('/login')
                  })
                  .catch((error)=>{
                    error.errorMessage = '註冊失敗'
                    return next(error)
                  })
})


module.exports = router