const express = require('express')
const port = 3000
const app = express()
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')


const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

const Records = require('./models/Record')
const Categories = require('./models/Category')

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected')
})

//要連結本地css一定要設定這個，此外已經設定為public資料夾，所以路徑從/stylesheets開始即可
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', "handlebars")

app.get('/expense/edit', (req, res) => {
  res.render('edit')
})

app.get('/expense/add', (req, res) => {
  Categories.find()
    .lean()
    .then(categories => {
      res.render('create', { category: categories })
    })

})



app.get('/', (req, res) => {
  Records.find({})
    .lean()
    .then((records) => {
      let i = 0
      records.forEach(record => {
        let indexBoolean = i % 2 === 0
        record.indexBoolean = indexBoolean
        i++
      })
      Categories.find()
        .lean()
        .then(categories => {
          res.render('index', { records, category: categories })
        })

    })
  // res.render('index')

})




app.post('/expense/add', (req, res) => {
  const { amount, meeting_time, item, category
  } = req.body
  const icon_id = Number(category)
  const date = String(meeting_time)
  console.log(req.body)
  console.log(icon_id)

  Records.create({ amount, date, item, icon_id })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})


app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})