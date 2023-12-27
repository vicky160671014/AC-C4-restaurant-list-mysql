//import node module and setting related variables
const express = require('express')
const flash = require('connect-flash')
const session = require('express-session')
const app = express()

const passport = require('passport')
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

app.use(passport.initialize())
app.use(passport.session())

app.use(messageHandler)

app.use(router)

app.use(errorHandler)

//listen
app.listen(port,()=>{
  console.log(`Express is running on http://localhost:${port}/restaurants`)
})