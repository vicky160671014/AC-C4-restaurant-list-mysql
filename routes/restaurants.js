const express = require('express')
const router = express.Router()

const db = require('../models')
const Restaurant = db.Restaurant

//瀏覽所有餐廳
router.get('/',(req,res,next)=>{
  const sortSelected = req.query.sort
  const sortOptions = {
    name_asc:[['name','ASC']],
    name_desc:[['name','DESC']],
    category:[['category','ASC']],
    location:[['location','ASC']]
  }
  return Restaurant.findAll({
    attributes:['id','name','name_en','category','image','location','phone','google_map','rating','description'],
    order:sortOptions[sortSelected],
    raw:true
  })
  .then((restaurants)=>{
    if(restaurants.length === 0) {
      req.flash('error','目前無取得任何餐廳資料')
      return res.redirect('/restaurants')
    }
    res.render('index',{ restaurants, sortSelected })
  })
  .catch((error) => {
    error.errorMessage = '資料取得失敗'
    return next(error)
  })
})

//新增餐廳頁面
router.get('/new', (req, res) => {
  return res.render('new')
})

//操作資料新增餐廳
router.post('/', (req, res, next) => {
  const restaurantInput = req.body
  return Restaurant.create({
    name: restaurantInput.name, 
    name_en: restaurantInput.name_en,
    category: restaurantInput.category,
    image: restaurantInput.image, 
    location: restaurantInput.location, 
    phone: restaurantInput.phone,
    google_map: restaurantInput.google_map,
    rating: restaurantInput.rating,
    description: restaurantInput.description
  })
  .then(()=>{
    req.flash('success','新增成功')
    return res.redirect('/restaurants')})
  .catch((error) => {
    error.errorMessage = '新增失敗'
    return next(error)
  })
})

//瀏覽特定餐廳
router.get('/:id', (req, res, next) => {
  const id = req.params.id
  return Restaurant.findByPk(id, {
    attributes: ['id', 'name', 'name_en', 'category', 'image', 'location', 'phone', 'google_map', 'rating', 'description'],
    raw: true
})
    .then((restaurant)=>{
      if(! restaurant) {
        req.flash('error','資料不存在')
        return res.redirect('/restaurants')
      }
      res.render('show',{ restaurant })
  })
    .catch((error) => {
      error.errorMessage = '資料取得失敗'
      return next(error)
  })
})

//編輯特定餐廳頁面
router.get('/:id/edit',(req,res, next)=>{
  const id = req.params.id
  return Restaurant.findByPk(id, {
    attributes: ['id', 'name', 'name_en', 'category', 'image', 'location', 'phone', 'google_map', 'rating', 'description'],
    raw: true
  })
  .then((restaurant)=>{
    if(!restaurant){
      req.flash('error','資料不存在')
      return res.redirect('/restaurants')
    }
    res.render('edit',{ restaurant })
})
  .catch((error) => {
    error.errorMessage = '新增失敗'
    return next(error)
  })
})

//送出修改餐廳頁面
router.put('/:id', (req, res, next) => {
  const id = req.params.id
  const body = req.body
  return Restaurant.update({ 
    name:body.name, 
    name_en:body.name_en, 
    category:body.category, 
    image:body.image, 
    location:body.location, 
    phone:body.phone, 
    google_map:body.google_map, 
    rating:body.rating, 
    description:body.description },{where:{ id }})
    .then(() => {
      req.flash('success','更新成功')
      return res.redirect(`/restaurants/${id}`)})
    .catch((error) => {
      error.errorMessage = '更新失敗'
      return next(error)
    })
})

//刪除餐廳
router.delete('/:id', (req, res, next) => {
  const id = req.params.id
  return Restaurant.destroy({where:{ id }})
  .then(()=>{
    req.flash('success','刪除成功')
    return res.redirect('/restaurants')
})
  .catch((error)=>{
    error.errorMessage='刪除失敗'
    return next(err)
  })
})

module.exports = router