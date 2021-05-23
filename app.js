const express = require('express')
const port = 3000
const app = express()
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected')
})

app.get('/', (req, res) => {
  res.send('it is working')
})

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})