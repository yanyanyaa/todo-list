const express = require('express')
const router = express.Router()
const Todo = require('../../models/todo.js')

// register
router.get('/register', (req, res) => {
  res.render('register')
})

// data: register
router.post('/register', (req, res) => {

  redirect('/')
})

// login
router.get('/login', (req, res) => {

  res.render('login')
})

// data: login
router.post('/login', (req, res) => {

  redirect('/')
})


// data: logout
router.post('/logout', (req, res) => {

  redirect('/')
})

module.exports = router