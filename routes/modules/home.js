const express = require('express')
const router = express.Router()
const Records = require('../../models/Record')
const Categories = require('../../models/Category')

router.get('/', (req, res) => {
  Records.find({})
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
          res.render('index', { records, category: categories })
        })

    })
  // res.render('index')

})

module.exports = router