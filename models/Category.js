// 支出名稱：name
// 類別：category
// 日期：date
// 金額：amount
// 在首頁看到的總金額：totalAmount

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const categorySchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  icon: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('category', categorySchema)