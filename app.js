//import node module and setting related variables
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')

const db = require('./models')
const Restaurant = db.Restaurant

const port = 3000

//設定template engine
app.engine('.hbs', exphbs({ defaultLayout: 'main', extname:'.hbs' }))
app.set('view engine', '.hbs')

app.use(express.static('public'))//設定靜態檔案
app.use(express.urlencoded({ extended: true }))//設定可抓取req.body
app.use(methodOverride('_method'))//設定路由複寫

//setting route
app.get('/',(req,res)=>{
  res.send('this will be restaurant list!')
})

//瀏覽所有餐廳
app.get('/restaurants',(req,res)=>{
  return Restaurant.findAll({
    attributes:['id','name','name_en','category','image','location','phone','google_map','rating','description'],
    raw:true
  })
  .then((restaurants)=>res.render('index',{ restaurants }))
  .catch((err)=>res.status(422).json(err))
})

//新增餐廳頁面
app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})

//操作資料新增餐廳
app.post('/restaurants', (req, res) => {
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
  .then(()=>res.redirect('/restaurants'))
  .catch((err) => res.status(422).json(err))
})

//瀏覽特定餐廳
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findByPk(id, {
    attributes: ['id', 'name', 'name_en', 'category', 'image', 'location', 'phone', 'google_map', 'rating', 'description'],
    raw: true
})
    .then((restaurant)=>res.render('show',{ restaurant }))
    .catch((err) => res.status(422).json(err))
})

//編輯特定餐廳頁面
app.get('/restaurants/:id/edit',(req,res)=>{
  const id = req.params.id
  return Restaurant.findByPk(id, {
    attributes: ['id', 'name', 'name_en', 'category', 'image', 'location', 'phone', 'google_map', 'rating', 'description'],
    raw: true
  })
  .then((restaurant)=>res.render('edit',{ restaurant }))
  .catch((err)=>res.status(422).json(err))
})

//送出修改餐廳頁面
app.put('/restaurants/:id', (req, res) => {
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
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch((err) => res.status(422).json(err))
})

//刪除餐廳
app.delete('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.destroy({where:{ id }})
  .then(()=>res.redirect('/restaurants'))
  .catch((err)=>res.status(422).json(err))
})

//listen
app.listen(port,()=>{
  console.log(`Express is running on http://localhost:${port}/restaurants`)
})