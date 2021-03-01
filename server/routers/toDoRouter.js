const express = require('express')
const ToDoController = require('../controllers/toDoController')
const router = express.Router()

router.get('/')
router.post('/')

router.get('/:id')
router.put('/:id')
router.patch('/:id')
router.delete('/:id')






module.exports = router