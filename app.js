//import node module and setting related variables
const express = require('express')
const app = express()

const port = 3000

//setting route
app.get('/',(req,res)=>{
  res.send('this will be restaurant list!')
})

//listen
app.listen(port,()=>{
  console.log(`Express is running on http://localhost:${port}`)
})