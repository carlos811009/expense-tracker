const express = require('express')
const session = require('express-session')
const port = 3000
const app = express()
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')

//使用const routes = require('./routes')的話也會自動去找到index
const routes = require('./routes/index')
const usePassport = require('./config/passport')
require('./config/mongoose')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', "handlebars")


app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))


app.use(express.urlencoded({ extended: true }))
//要連結本地css一定要設定這個，此外已經設定為public資料夾，所以路徑從/stylesheets開始即可
app.use(express.static('public'))
app.use(methodOverride('_method'))

usePassport(app)

app.use(routes)
app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})