const mongoose = require('mongoose')
const Record = require('../Record')
const db = mongoose.connection

mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })

const recordSeedData = [
  {
    icon_id: 1,
    item: '午餐',
    date: 2012 / 02 / 23,
    amount: 60,
  },
  {
    icon_id: 1,
    item: '早餐',
    date: 2012 / 03 / 23,
    amount: 60,
  }
]

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected')
  Record.create(recordSeedData)
    .then(() => {
      db.close()
      console.log('recordSeeder is done')
    })

})