const db = require('../../config/mongoose')
const Records = require('../Record')
const Categories = require('../Category')
const User = require('../Users')
const bcrypt = require('bcryptjs')

const SEED_USER = {
  name: 'user1',
  email: 'user1@example.com',
  password: "12345678"
}

const recordSeedData = [
  {
    icon_id: 0,
    icon: 'fa-home',
    item: "日常用品",
    date: "2021-06-05T22:21",
    amount: 60,
    location: "全聯"
  },
  {
    icon_id: 1,
    item: '午餐',
    icon: 'fa-utensils',
    date: "2021-06-04T22:21",
    amount: 60,
    location: "全聯"
  },
  {
    icon_id: 2,
    item: '火車',
    icon: 'fa-shuttle-van',
    date: "2021-06-03T22:21",
    amount: 60,
    location: "彰化"
  },
  {
    icon_id: 3,
    item: '看電影',
    icon: 'fa-grin-beam',
    date: "2021-06-02T22:21",
    amount: 120,
  },
  {
    icon_id: 4,
    item: '雜記',
    icon: 'fa-pen',
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
  const { name, email, password } = SEED_USER
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(password, salt))
    .then(hash =>
      User.create({
        name,
        email,
        password: hash
      })
    )
    .then(user => {
      let userId = user.id
      recordSeedData.forEach(each => {
        const { amount, date, item, icon_id, icon, location } = each
        Records.create({ amount, date, item, icon_id, icon, location, userId })
          .then(() => {
            console.log('ok')
          })
          .catch(err => console.log(err))
      })

    })
    .then(() => {
      setTimeout(() => {
        console.log('done')
        process.exit()
      }, 1000)
    })
    .catch(err => console.log(err))
})
