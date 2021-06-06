const express = require('express')
const router = express.Router()
const Records = require('../../models/Record')
const Categories = require('../../models/Category')
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
        .then(categories => {
          res.render('edit', { record, category: categories })
        })

    })
    .catch(err => console.log(err))

})

router.get('/add', (req, res) => {
  const time = new Date
  Categories.find()
    .lean()
    .then(categories => {
      res.render('create', { category: categories, time })
    })

})

router.post('/add', (req, res) => {
  let { amount, meeting_time, item, category, location
  } = req.body
  const icon_id = Number(category)
  const id = icon_id
  const date = String(meeting_time)
  const userId = req.user._id
  if (!location) {
    location = ''
  }
  Categories.findOne({ id })
    .then(category => {
      const icon = category.icon
      Records.create({ amount, date, item, icon_id, icon, location, userId })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))

    })
})

router.post('/search', (req, res) => {
  const searchCategory = Number(req.body.category)
  const searchMonth = Number(req.body.month)
  const userId = req.user._id
  let selectData = []
  Records.find({ userId })
    .lean()
    .then(records => {
      return selectData = records.filter(record => {
        if (searchMonth) {
          return Number(record.date.slice(5, 7)) - Number(searchMonth) === 0
        }
        if (searchCategory) {
          return Number(record.icon_id) - Number(searchCategory) === 0
        }
      })
    })
    .catch(err => console.log(err))
  Categories.find()
    .lean()
    .then(categories => {
      res.render('index', { records: selectData, category: categories, month })
    })

})


router.put('/:id', (req, res) => {
  let { amount, meeting_time, item, category, location
  } = req.body
  amount = Number(amount)
  const icon_id = Number(category)
  const id = icon_id
  const _id = req.params.id
  const date = String(meeting_time)
  Categories.findOne({ id })
    .then(category => {
      const icon = category.icon
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
        .catch(err => console.log(err))
    })
    .then(() => res.redirect('/'))
})

router.delete('/:id', (req, res) => {
  const _id = req.params.id
  Records.findById(_id)
    .then((record) => record.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

module.exports = router