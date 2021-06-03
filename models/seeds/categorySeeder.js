const mongoose = require('mongoose')
const category = require('../Category')
const db = mongoose.connection

mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })

const categorySeedData = [
  {
    id: 0,
    icon: '<i class="fas fa-home"></i>'
  },
  {
    id: 1,
    icon: '<i class="fas fa-shuttle-van"></i>'
  },
  {
    id: 2,
    icon: '<i class="fas fa-grin-beam"></i>'
  },
  {
    id: 3,
    icon: '<i class="fas fa-utensils"></i>'
  },
  {
    id: 4,
    icon: '<i class="fas fa-pen"></i>'
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
      process.exit()
    })
})
