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
  const errors = []
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: '所有欄位都是都是必填！！' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符！' })
  }
  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }

  User.findOne({ email }).then(user => {
    if (user) {
      errors.push({ message: '這個 email 已經註冊過了！'})
      return res.render('register', {
        errors,
        name,
        email, 
        password,
        confirmPassword
      }) 
    }

    return User.create({
      name,
      email,
      password
    })
      .then(() => res.redirect('/'))
      .catch(err => console.log(err))
  
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
  req.flash('success_msg', '你已經成功登出！')
  res.redirect('/users/login')
})

module.exports = router