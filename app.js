//import node module and setting related variables
const express = require('express')
const flash = require('connect-flash')
const session = require('express-session')
const app = express()
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')

const router = require('./routes')
const messageHandler = require('./middlewares/message-handler')
const errorHandler = require('./middlewares/error-handler')

const port = 3000

//設定template engine
app.engine('.hbs', exphbs({ defaultLayout: 'main', extname:'.hbs' }))
app.set('view engine', '.hbs')

app.use(express.static('public'))//設定靜態檔案
app.use(express.urlencoded({ extended: true }))//設定可抓取req.body
app.use(methodOverride('_method'))//設定路由複寫

app.use(session({
  secret: 'ThisIsSecret',
	resave: false,
	saveUninitialized: false
}))
app.use(flash())

app.use(messageHandler)

app.use(router)

app.use(errorHandler)

//setting route
app.get('/',(req,res)=>{
  res.send('this will be restaurant list!')
})

// //瀏覽所有餐廳
// app.get('/restaurants',(req,res,next)=>{
//   return Restaurant.findAll({
//     attributes:['id','name','name_en','category','image','location','phone','google_map','rating','description'],
//     raw:true
//   })
//   .then((restaurants)=>{
//     if(restaurants.length === 0) {
//       req.flash('error','目前無取得任何餐廳資料')
//       return res.redirect('/restaurants')
//     }
//     res.render('index',{ restaurants })
//   })
//   .catch((error) => {
//     error.errorMessage = '資料取得失敗'
//     next(error)
//   })
// })

// //新增餐廳頁面
// app.get('/restaurants/new', (req, res) => {
//   return res.render('new')
// })

// //操作資料新增餐廳
// app.post('/restaurants', (req, res, next) => {
//   const restaurantInput = req.body
//   return Restaurant.create({
//     name: restaurantInput.name, 
//     name_en: restaurantInput.name_en,
//     category: restaurantInput.category,
//     image: restaurantInput.image, 
//     location: restaurantInput.location, 
//     phone: restaurantInput.phone,
//     google_map: restaurantInput.google_map,
//     rating: restaurantInput.rating,
//     description: restaurantInput.description
//   })
//   .then(()=>{
//     req.flash('success','新增成功')
//     return res.redirect('/restaurants')})
//   .catch((error) => {
//     error.errorMessage = '新增失敗'
//     next(error)
//   })
// })

// //瀏覽特定餐廳
// app.get('/restaurants/:id', (req, res, next) => {
//   const id = req.params.id
//   return Restaurant.findByPk(id, {
//     attributes: ['id', 'name', 'name_en', 'category', 'image', 'location', 'phone', 'google_map', 'rating', 'description'],
//     raw: true
// })
//     .then((restaurant)=>{
//       if(! restaurant) {
//         req.flash('error','資料不存在')
//         return res.redirect('/restaurants')
//       }
//       res.render('show',{ restaurant })
//   })
//     .catch((error) => {
//       error.errorMessage = '資料取得失敗'
//       next(error)
//   })
// })

// //編輯特定餐廳頁面
// app.get('/restaurants/:id/edit',(req,res, next)=>{
//   const id = req.params.id
//   return Restaurant.findByPk(id, {
//     attributes: ['id', 'name', 'name_en', 'category', 'image', 'location', 'phone', 'google_map', 'rating', 'description'],
//     raw: true
//   })
//   .then((restaurant)=>{
//     if(!restaurant){
//       req.flash('error','資料不存在')
//       return res.redirect('/restaurants')
//     }
//     res.render('edit',{ restaurant })
// })
//   .catch((error) => {
//     error.errorMessage = '新增失敗'
//     next(error)
//   })
// })

// //送出修改餐廳頁面
// app.put('/restaurants/:id', (req, res, next) => {
//   const id = req.params.id
//   const body = req.body
//   return Restaurant.update({ 
//     name:body.name, 
//     name_en:body.name_en, 
//     category:body.category, 
//     image:body.image, 
//     location:body.location, 
//     phone:body.phone, 
//     google_map:body.google_map, 
//     rating:body.rating, 
//     description:body.description },{where:{ id }})
//     .then(() => {
//       req.flash('success','更新成功')
//       return res.redirect(`/restaurants/${id}`)})
//     .catch((error) => {
//       error.errorMessage = '更新失敗'
//       next(error)
//     })
// })

// //刪除餐廳
// app.delete('/restaurants/:id', (req, res, next) => {
//   const id = req.params.id
//   return Restaurant.destroy({where:{ id }})
//   .then(()=>{
//     req.flash('success','刪除成功')
//     return res.redirect('/restaurants')
// })
//   .catch((err)=>{
//     error.errorMessage='刪除失敗'
//     next(error)
//   })
// })

//listen
app.listen(port,()=>{
  console.log(`Express is running on http://localhost:${port}/restaurants`)
})