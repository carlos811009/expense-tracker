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
    category_id: 0,
    category: 'fa-home',
    name: "日常用品",
    date: "2021-06-05T22:21",
    amount: 60,
    location: "全聯"
  },
  {
    category_id: 1,
    name: '午餐',
    category: 'fa-utensils',
    date: "2021-06-04T22:21",
    amount: 60,
    location: "全聯"
  },
  {
    category_id: 2,
    name: '火車',
    category: 'fa-shuttle-van',
    date: "2021-06-03T22:21",
    amount: 60,
    location: "彰化"
  },
  {
    category_id: 3,
    name: '看電影',
    category: 'fa-grin-beam',
    date: "2021-06-02T22:21",
    amount: 120,
  },
  {
    category_id: 4,
    name: '雜記',
    category: 'fa-pen',
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
        const { amount, date, name, category_id, category, location } = each
        Records.create({ amount, date, name, category_id, category, location, userId })
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
      }, 700)
    })
    .catch(err => console.log(err))
})
