const express = require('express')
const router = express.Router()
const ToDoController = require('../controllers/toDoController')

const{Authenticate, Authorize} = require('../middleware/auth')
const randomActionAPI = require('../middleware/randomActionAPI')



router.use(Authenticate)

router.post('/',randomActionAPI, ToDoController.add)
router.get('/', ToDoController.read)

router.use('/:id',Authorize)

router.get('/:id', ToDoController.findById)

router.put('/:id', ToDoController.editTask)
router.patch('/:id',ToDoController.editStatus)

router.delete('/:id', ToDoController.delete)






module.exports = router