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

router.get('/', (req, res) => {
  const userId = req.user._id
  Records.find({})
    .sort({ date: 'desc' })
    .lean()
    .then((records) => {
      let i = 0
      records.forEach(record => {
        let indexBoolean = i % 2 === 0
        record.indexBoolean = indexBoolean
        i++
      })
      Categories.find()
        .lean()
        .then(categories => {
          res.render('index', { records, category: categories, month })
        })
        .catch(err => console.log(err))

    })
})

module.exports = router