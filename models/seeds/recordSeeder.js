const db = require('../../config/mongoose')
const Records = require('../Record')
const Categories = require('../Category')

const recordSeedData = [
  {
    icon_id: 0,
    item: "日常用品",
    date: "2021-06-05T22:21",
    amount: 60,
    location: "全聯"
  },
  {
    icon_id: 1,
    item: '午餐',
    date: "2021-06-04T22:21",
    amount: 60,
    location: "全聯"
  },
  {
    icon_id: 2,
    item: '火車',
    date: "2021-06-03T22:21",
    amount: 60,
    location: "彰化"
  },
  {
    icon_id: 3,
    item: '看電影',
    date: "2021-06-02T22:21",
    amount: 120,
  },
  {
    icon_id: 4,
    item: '雜記',
    date: "2021-06-01T22:21",
    amount: 60,
  },
]

db.on('error', () => {
  console.log('mongodb error')
  process.exit()
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
            const icon_name = category.name
            record.icon = icon
            record.icon_name = icon_name
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