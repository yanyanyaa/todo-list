const express = require('express')
const app = express()
const exhbs = require('express-handlebars')

const port = 3000

app.engine('hbs', exhbs({ defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
  res.send(`This is my web app.`)
})

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})