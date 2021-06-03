const mongoose = require('mongoose')
const category = require('../Category')
const db = mongoose.connection

mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })

const categorySeedData = [
  {
    id: 0,
    icon: 'fa-home'
  },
  {
    id: 1,
    icon: 'fa-shuttle-van'
  },
  {
    id: 2,
    icon: 'fa-grin-beam'
  },
  {
    id: 3,
    icon: 'fa-utensils'
  },
  {
    id: 4,
    icon: 'fa-pen'
  }
]

db.on('error', () => {
  console.log('mongodb error')
})

db.on('open', () => {
  console.log('mongodb connected')
  category.create(categorySeedData)
    .then(() => {
      db.close()
    }).then(() => {
      console.log('category is done')
    })
})
