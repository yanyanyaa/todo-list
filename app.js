const express = require('express')
const app = express()
const session = require('express-session')
const exhbs = require('express-handlebars')
const methodOverride = require('method-override')
const flash = require('connect-flash')

const routes = require('./routes')
require('./config/mongoose')

const usePassport = require('./config/passport')

const port = 3000


app.engine('hbs', exhbs({ defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')

app.use(session({
  secret: 'ThisIsMySecret', 
  resave: false,
  saveUninitialized: true
}))

app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }))

usePassport(app)
app.use(flash())
app.use((req, res, next) => {
  // console.log(req.user)
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})
app.use(routes)

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})