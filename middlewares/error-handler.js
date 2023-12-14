module.exports = (error,req,res,next)=>{
  console.error(error)
  req.flash('error', error.errorMessage || '資料處理失敗:(')
  // next(error)
  return res.redirect('back')
}