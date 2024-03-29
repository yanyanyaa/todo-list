const express = require('express')
const router = express.Router()

const home = require('./modules/home.js')
const todos = require('./modules/todos.js')
const users = require('./modules/users.js')
const auth = require('./modules/auth')

const { authenticator } = require('../middleware/auth.js')

router.use('/todos', authenticator, todos)
router.use('/users', users)
router.use('/auth', auth)
router.use('/', authenticator, home)

module.exports = router