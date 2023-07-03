const express = require('express')
const router = express.Router()

const home = require('./modules/home.js')
const todos = require('./modules/todos.js')

router.use('/', home)
router.use('/todos', todos)

module.exports = router