const express = require('express')
const router = express.Router()
const Todo = require('../../models/todo.js')
const User = require('../../models/user.js')
const passport = require('passport')

// register
router.get('/register', (req, res) => {
  res.render('register')
})

// data: register
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword} = req.body
  User.findOne({ email }).then(user => {
    if (user) {
      console.log('this user already exists.')
      res.render('register', {
        name,
        email, 
        password,
        confirmPassword
      }) 
    } else {
      return User.create({
        name,
        email,
        password
      })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
    }
  })
  .catch(err => console.log(err))
})

// login
router.get('/login', (req, res) => {

  res.render('login')
})

// data: login
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))


// data: logout
router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/users/login')
})

module.exports = router