//import node module and setting related variables
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')

const db = require('./models')
const Restaurant = db.Restaurant

const port = 3000

//設定template engine
app.engine('.hbs', exphbs({ defaultLayout: 'main', extname:'.hbs' }))
app.set('view engine', '.hbs')

app.use(express.static('public'))//設定靜態檔案
app.use(express.urlencoded({ extended: true }))

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
  res.send(`render restaurant edit page: ${req.params.id}`)
})

//送出修改餐廳頁面
app.put('/restaurants/:id', (req, res) => {
  res.send(`put restaurant: ${req.params.id}`)
})

//刪除餐廳
app.delete('/restaurants/:id', (req, res) => {
  res.send(`delete restaurant: ${req.params.id}`)
})

//listen
app.listen(port,()=>{
  console.log(`Express is running on http://localhost:${port}`)
})