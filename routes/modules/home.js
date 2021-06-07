const express = require('express')
const router = express.Router()
const Records = require('../../models/Record')

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
  Records.find({ userId })
    .sort({ date: 'desc' })
    .lean()
    .then((records) => {
      let i = 0
      records.forEach(record => {
        let indexBoolean = i % 2 === 0
        record.indexBoolean = indexBoolean
        i++
      })
      res.render('index', { records, category: categorySeedData, month })
    })
    .catch(err => console.log(err))

})


module.exports = router