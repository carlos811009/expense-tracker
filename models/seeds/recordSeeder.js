const mongoose = require('mongoose')
const Records = require('../Record')
const db = mongoose.connection
const Categories = require('../Category')

mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })



const recordSeedData = [
  {
    icon_id: 0,
    item: "日常用品",
    date: "2012 / 03 / 23",
    amount: 60,
  },
  {
    icon_id: 1,
    item: '午餐',
    date: "2012 / 03 / 23",
    amount: 60,
  },
  {
    icon_id: 2,
    item: '火車',
    date: "2012 / 03 / 23",
    amount: 60,
  },
  {
    icon_id: 3,
    item: '看電影',
    date: "2012 / 03 / 23",
    amount: 120,
  },
  {
    icon_id: 4,
    item: '雜記',
    date: "2012 / 03 / 23",
    amount: 60,
  },
]

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected')
  Records.create(recordSeedData)
    .then(records => {
      console.log('@@@@ create done')
      records.forEach(record => {
        const id = record.icon_id
        Categories.findOne({ id })
          .then(category => {
            const icon = category.icon
            record.icon = icon
            record.save()
              .then(() => console.log('@@@@ save done'))
              .catch(err => console.log("save error"))
          })
      })
    })
    .then(() => {
      console.log('all done')
    })
    .catch(err => console.log(err))
})