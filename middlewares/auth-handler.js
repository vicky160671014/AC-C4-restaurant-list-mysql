module.exports = (req, res, next)=>{
  if(req.isAuthenticated()){
    return next()
  }

  res.flash('error','尚未登入')
  return res.redirect('/login')
}