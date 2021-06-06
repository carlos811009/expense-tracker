const express = require('express')
const port = 3000
const app = express()
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')

//使用const routes = require('./routes')的話也會自動去找到index
const routes = require('./routes/index')

const db = require('./config/mongoose')


db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected')
})

app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))

app.use(routes)

//要連結本地css一定要設定這個，此外已經設定為public資料夾，所以路徑從/stylesheets開始即可
app.use(express.static('public'))
app.use(methodOverride('_method'))

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', "handlebars")

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})