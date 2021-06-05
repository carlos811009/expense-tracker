const express = require('express')
const router = express.Router()
const Records = require('../../models/Record')
const Categories = require('../../models/Category')

router.get('/:id/edit', (req, res) => {
  const _id = req.params.id
  Records.findById(_id)
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
  Categories.find()
    .lean()
    .then(categories => {
      res.render('create', { category: categories })
    })

})

router.post('/add', (req, res) => {
  const { amount, meeting_time, item, category
  } = req.body
  const icon_id = Number(category)
  const id = icon_id
  const date = String(meeting_time)
  Categories.findOne({ id })
    .then(category => {
      const icon = category.icon
      Records.create({ amount, date, item, icon_id, icon })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
    })
})

router.put('/:id', (req, res) => {
  let { amount, meeting_time, item, category
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