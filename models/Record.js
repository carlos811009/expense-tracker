// 支出名稱：name
// 類別：category
// 日期：date
// 金額：amount
// 在首頁看到的總金額：totalAmount

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const RecordSchema = new Schema({
  icon_id: {
    type: Number,
    required: true
  },
  icon: {
    type: String
  },
  item: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  indexBoolean: {
    type: Boolean,
  },
  location: {
    type: String,
  },
  icon_name: {
    type: String,
  }
})

module.exports = mongoose.model('record', RecordSchema)