const db = require('../../config/mongoose')
const category = require('../Category')

const categorySeedData = [
  {
    id: 0,
    icon: 'fa-home',
    name: "家居物業"
  },
  {
    id: 1,
    icon: 'fa-shuttle-van',
    name: "交通出行"
  },
  {
    id: 2,
    icon: 'fa-grin-beam',
    name: "休閒娛樂"
  },
  {
    id: 3,
    icon: 'fa-utensils',
    name: "餐飲食品"
  },
  {
    id: 4,
    icon: 'fa-pen',
    name: "其他"
  }
]

db.on('error', () => {
  console.log('mongodb error')
  process.exit()
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
