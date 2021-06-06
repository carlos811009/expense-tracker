const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const user = require('./modules/user')
const expense = require('./modules/expenseUse')
const methodOverride = require('method-override')

router.use(methodOverride('_method'))

router.use('/expense', expense)
router.use('/users', user)
router.use('/', home)

module.exports = router