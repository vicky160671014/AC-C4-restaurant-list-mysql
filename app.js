//import node module and setting related variables
const express = require('express')
const app = express()

const port = 3000

//setting route
app.get('/',(req,res)=>{
  res.send('this will be restaurant list!')
})

//瀏覽所有餐廳
app.get('/restaurants',(req,res)=>{
  res.send('render restaurants')
})

//新增餐廳頁面
app.get('/restaurants/new', (req, res) => {
  res.send('add restaurants new page')
})

//操作資料新增餐廳
app.post('/restaurants', (req, res) => {
  res.send('render restaurants')
})

//瀏覽特定餐廳
app.get('/restaurants/:id', (req, res) => {
  res.send(`render restaurant: ${req.params.id}`)
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