const express = require('express')
const router = express.Router()

const db = require('../models')
const Restaurant = db.Restaurant

const Op = require('sequelize').Op

router.get('/',(req,res)=>{
  if (!req.query.keyword) {
    return res.redirect('/restaurants')
  }//搜尋欄的空值的時候，重新導向跟目錄
  
  const keyword = req.query.keyword.trim().toLowerCase()
  const searchCondition = {
    [Op.or]: [
      { name: { [Op.like]: `%${keyword}%` } },
      { name_en: { [Op.like]: `%${keyword}%` }},
      { category: {[Op.like]: `%${keyword}%` }},
      { location: {[Op.like]: `%${keyword}%` }}
    ]
  }

  return Restaurant.findAll({
    attributes:['id','name','name_en','category','image','location','phone','google_map','rating','description'],
    where: searchCondition,
    raw:true
  })
  .then((restaurantSearch)=>{
    if(restaurantSearch.length === 0) {
      req.flash('success','成功搜尋，但找不到任何餐廳資料')
      return res.redirect('/restaurants')
    }
    res.render('index',{ restaurants: restaurantSearch, keyword })
  })
  .catch((error) => {
    error.errorMessage = '搜索失敗:('
    return next(error)
  })
})

module.exports= router