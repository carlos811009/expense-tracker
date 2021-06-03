const express = require('express')
const port = 3000
const app = express()
const exphbs = require('express-handlebars')



const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

const Records = require('./models/Record')

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected')
})

//要連結本地css一定要設定這個，此外已經設定為public資料夾，所以路徑從/stylesheets開始即可
app.use(express.static('public'))

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', "handlebars")

app.get('/expense/edit', (req, res) => {
  res.render('edit')
})

app.get('/expense/add', (req, res) => {
  res.render('create')
})


app.post('/expense/add', (req, res) => {
  res.render('create')
})

app.get('/', (req, res) => {
  Records.find({})
    .lean()
    .then((record) => res.render('index', { record }))
  // res.render('index')

})


app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})