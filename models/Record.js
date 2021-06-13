// 支出名稱：name
// 類別：category
// 日期：date
// 金額：amount
// 在首頁看到的總金額：totalAmount

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const RecordSchema = new Schema({
  category_id: {
    type: Number,
    required: true
  },
  category: {
    type: String
  },
  name: {
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
  category_name: {
    type: String,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    index: true,
    required: true
  }
})

module.exports = mongoose.model('record', RecordSchema)