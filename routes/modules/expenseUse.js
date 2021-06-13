const express = require('express')
const router = express.Router()
const Records = require('../../models/Record')

const categorySeedData = [
  {
    id: 0,
    category: 'fa-home',
    name: "家居物業"
  },
  {
    id: 1,
    category: 'fa-shuttle-van',
    name: "交通出行"
  },
  {
    id: 2,
    category: 'fa-grin-beam',
    name: "休閒娛樂"
  },
  {
    id: 3,
    category: 'fa-utensils',
    name: "餐飲食品"
  },
  {
    id: 4,
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
    .then((record) => res.render('edit', { record, category: categorySeedData }))
    .catch(err => console.log(err))
})
router.get('/add', (req, res) => {
  const time = new Date
  res.render('create', { category: categorySeedData, time })
})

router.post('/add', (req, res) => {
  let { amount, date, name, category, location
  } = req.body
  const icon_id = Number(category)
  const id = icon_id
  date = String(date)
  const userId = req.user._id
  if (!location) {
    location = ''
  }
  categorySeedData.forEach(each => {
    const category_id = each.id
    const category = each.category
    console.log(each)
    if (each.id === id) {
      Records.create({ amount, date, name, category_id, category, location, userId })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
    }
  })
})

router.post('/search', (req, res) => {
  const searchCategory = Number(req.body.category)
  const searchMonth = Number(req.body.month)
  const userId = req.user._id
  let selectData = []
  let error = ''
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
        return res.render('index', { records: selectData, category: categorySeedData, month, error })
      } else {
        let i = 0
        selectData.forEach(each => {
          let indexBoolean = i % 2 === 0
          each.indexBoolean = indexBoolean
          i++
        })
        return res.render('index', { records: selectData, category: categorySeedData, month })
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
  categorySeedData.forEach(category => {
    const icon = category.icon
    if (category.id === id) {
      Records.findById(_id)
        .then(record => {
          record.amount = amount
          record.date = date
          record.icon_id = icon_id
          record.icon = icon
          record.item = item
          if (location) {
            record.location = location
          }
          record.save()
        })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
    }
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