const express = require('express')
const app = express()
const session = require('express-session')
const exhbs = require('express-handlebars')
const methodOverride = require('method-override')

const routes = require('./routes')
require('./config/mongoose')

const usePassport = require('./config/passport')

const port = 3000


app.engine('hbs', exhbs({ defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')

app.use(session({
  secret: 'ThisIsMySecret', 
  resave: false,
  saveUninitialixed: true
}))

app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }))

usePassport(app)
app.use(routes)

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})