const express = require('express')
const router = express.Router()
const Records = require('../../models/Record')
const Categories = require('../../models/Category')

const categorySeedData = [
  {
    id: 1,
    category: 'fa-home',
    name: "家居物業"
  },
  {
    id: 2,
    category: 'fa-shuttle-van',
    name: "交通出行"
  },
  {
    id: 3,
    category: 'fa-grin-beam',
    name: "休閒娛樂"
  },
  {
    id: 4,
    category: 'fa-utensils',
    name: "餐飲食品"
  },
  {
    id: 5,
    category: 'fa-pen',
    name: "其他"
  }
]
const month = [
  {
    month: '1月',
    id: 1
  },
  {
    month: '2月',
    id: 2
  },
  {
    month: '3月',
    id: 3
  },
  {
    month: '4月',
    id: 4
  },
  {
    month: '5月',
    id: 5
  },
  {
    month: '6月',
    id: 6
  },
  {
    month: '7月',
    id: 7
  },
  {
    month: '8月',
    id: 8
  },
  {
    month: '9月',
    id: 9
  },
  {
    month: '10月',
    id: 10
  },
  {
    month: '11月',
    id: 11
  },
  {
    month: '12月',
    id: 12
  }
]

router.use(express.urlencoded({ extended: true }))
router.get('/:id/edit', (req, res) => {
  const _id = req.params.id
  Records.findById({ _id })
    .lean()
    .then((record) => {
      Categories.find()
        .lean()
        .then((categories) => {
          const category = categories.map(each => ({
            name: each.name,
            id: each.id,
            isSelected: each.id === record.category_id
          }))
          res.render('edit', { record, category: category })
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})
router.get('/add', (req, res) => {
  const time = new Date
  Categories.find()
    .lean()
    .then(categoires => {
      res.render('create', { category: categoires, time })
    })
})
router.post('/add', (req, res) => {
  let { amount, date, name, category, location
  } = req.body
  Categories.find({ id: Number(category) })
    .lean()
    .then(category => {
      date = String(date)
      const userId = req.user._id
      if (!location) {
        location = ''
      }
      Records.create({
        amount,
        date,
        name,
        category_id: category[0].id,
        category: category[0].icon,
        category_name: category[0].name,
        location,
        userId
      })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
    })


})

router.get('/search', (req, res) => {
  const searchCategory = Number(req.query.category)
  const searchMonth = Number(req.query.month)
  const userId = req.user._id
  const selectCategory = categorySeedData.map(each => each.id === searchCategory)
  const selectMonth = month.map(each => each.id === searchMonth)
  console.log(selectMonth)
  let selectData = ''
  let error = ''
  if (!selectMonth && !selectCategory) { return res.redirect('back') }
  Records.find({ userId })
    .lean()
    .then(records => {
      return selectData = records.filter(record => {
        if (searchMonth) {
          return Number(record.date.slice(5, 7)) - Number(searchMonth) === 0
        }
        if (searchCategory || searchCategory === 0) {
          return Number(record.category_id) - Number(searchCategory) === 0
        }
      })
    })
    .then(() => {
      if (selectData.length === 0) {
        error = '沒有相關資料,點擊私房錢返回'
        return res.render('index', { records: selectData, category: categorySeedData, month, error, selectMonth, selectCategory })
      } else {
        let i = 0
        selectData.forEach(each => {
          let indexBoolean = i % 2 === 0
          each.indexBoolean = indexBoolean
          i++
        })
        return res.render('index', { records: selectData, category: categorySeedData, month, selectMonth, selectCategory })
      }
    })
    .catch(err => console.log(err))

})

router.put('/:id', (req, res) => {
  let { amount, meeting_time, item, category, location
  } = req.body
  amount = Number(amount)
  const icon_id = Number(category)
  const id = icon_id
  const _id = req.params.id
  const date = String(meeting_time)
  Categories.find({ id: Number(category) })
    .lean()
    .then(category => {
      Records.findById(_id)
        .then(record => {
          record.amount = amount
          record.date = date
          record.category_id = category[0].id
          record.category = category[0].icon
          record.name = item
          record.category_name = category[0].name
          if (location) {
            record.location = location
          }
          record.save()
        })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
    })


})

router.delete('/:id', (req, res) => {
  const _id = req.params.id
  Records.findById(_id)
    .then((record) => record.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

module.exports = router