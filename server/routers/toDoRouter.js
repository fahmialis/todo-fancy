const express = require('express')
const router = express.Router()
const ToDoController = require('../controllers/toDoController')


router.post('/', ToDoController.add)
router.get('/', ToDoController.read)

router.get('/:id', ToDoController.findById)
router.put('/:id')
router.patch('/:id')
router.delete('/:id')






module.exports = router