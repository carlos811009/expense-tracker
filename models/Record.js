// 支出名稱：name
// 類別：category
// 日期：date
// 金額：amount
// 在首頁看到的總金額：totalAmount

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const RecordSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  data: {
    type: Data,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  icon: {
    type: String,
  }
})

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  icon: {
    type: String,
  }
})

module.exports = mongoose.model('record', RecordSchema)
module.exports = mongoose.model('category', CategorySchema)