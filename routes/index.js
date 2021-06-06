const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const user = require('./modules/user')
const expense = require('./modules/expenseUse')
const methodOverride = require('method-override')
const { authenticator } = require('../middleware/auth')//回傳的為物件

router.use(methodOverride('_method'))

router.use('/expense', authenticator, expense)
router.use('/users', user)
router.use('/', authenticator, home)

module.exports = router