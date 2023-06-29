const express = require('express')
const app = express()
const exhbs = require('express-handlebars')
const mongoose = require('mongoose')

const port = 3000

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })  

const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})


app.engine('hbs', exhbs({ defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
  res.send(`This is my web app.`)
})

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})