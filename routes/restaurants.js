const express = require('express')
const router = express.Router()

const db = require('../models')
const Restaurant = db.Restaurant

//瀏覽所有餐廳
router.get('/',(req,res,next)=>{
  console.log(req.user)
  const userId = req.user.id
  const page = parseInt(req.query.page) || 1
  const limit = 6
  const sortSelected = req.query.sort
  const sortOptions = {
    name_asc:[['name','ASC']],
    name_desc:[['name','DESC']],
    category:[['category','ASC']],
    location:[['location','ASC']]
  }
  return Restaurant.findAll({
    attributes:['id','name','name_en','category','image','location','phone','google_map','rating','description'],
    where:{ userId },
    offset:(page-1)*limit,
    limit,
    order:sortOptions[sortSelected],
    raw:true
  })
  .then((restaurants)=>{
    if(restaurants.length === 0) {
      req.flash('error','目前無取得任何餐廳資料')
      return res.redirect('/restaurants')
    }
    res.render('index',{ 
      restaurants, 
      prev: page>1 ? page-1: page,
      next: page+1,
      page,
      sort: sortSelected
     })
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
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body
  const userId = req.user.id
  return Restaurant.create({
    name, name_en, category, image, location, phone, google_map, rating, description, userId
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
  const userId = req.user.id
  return Restaurant.findByPk(id, {
    attributes: ['id', 'name', 'name_en', 'category', 'image', 'location', 'phone', 'google_map', 'rating', 'description','userId'],
    raw: true
})
    .then((restaurant)=>{
      if(! restaurant) {
        req.flash('error','資料不存在')
        return res.redirect('/restaurants')
      }
      if( restaurant.userId !== userId ){
        req.flash('error','權限不足')
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
  const userId = req.user.id
  return Restaurant.findByPk(id, {
    attributes: ['id', 'name', 'name_en', 'category', 'image', 'location', 'phone', 'google_map', 'rating', 'description', 'userId'],
    raw: true
  })
  .then((restaurant)=>{
    if(!restaurant){
      req.flash('error','資料不存在')
      return res.redirect('/restaurants')
    }
    if( restaurant.userId!==userId ){
      req.flash('error','權限不足')
      return res.redirect('/restaurants')
    }
    res.render('edit',{ restaurant })
})
  .catch((error) => {
    error.errorMessage = '資料取得失敗'
    return next(error)
  })
})

//送出修改餐廳頁面
router.put('/:id', (req, res, next) => {
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body
  const id = req.params.id
  const userId = req.user.id

  return Restaurant.findByPk(id, {
    attributes: ['id', 'name', 'name_en', 'category', 'image', 'location', 'phone', 'google_map', 'rating', 'description', 'userId']
  })
  .then((restaurant)=>{
    if(!restaurant){
      req.flash('error','資料不存在')
      return res.redirect('/restaurants')
    }
    if( restaurant.userId!==userId ){
      req.flash('error','權限不足')
      return res.redirect('/restaurants')
    }
    
    return restaurant.update({ name, name_en, category, image, location, phone, google_map, rating, description })
    .then(() => {
      req.flash('success','更新成功')
      return res.redirect(`/restaurants/${id}`)})
})
  .catch((error) => {
    error.errorMessage = '更新失敗'
    return next(error)
  })
})

//刪除餐廳
router.delete('/:id', (req, res, next) => {
  const id = req.params.id
  const userId = req.user.id

  return Restaurant.findByPk(id, {
    attributes: ['id', 'name', 'name_en', 'category', 'image', 'location', 'phone', 'google_map', 'rating', 'description', 'userId']
  })
  .then((restaurant)=>{
    if(!restaurant){
      req.flash('error','資料不存在')
      return res.redirect('/restaurants')
    }
    if( restaurant.userId!==userId ){
      req.flash('error','權限不足')
      return res.redirect('/restaurants')
    }
    
    return restaurant.destroy()
                    .then(()=>{
                      req.flash('success','刪除成功')
                      return res.redirect('/restaurants')
                          })
})
  .catch((error) => {
    error.errorMessage = '刪除失敗'
    return next(error)
  })
})

module.exports = router