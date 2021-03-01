const express = require('express')
const router = express.Router()
const userRouter = require('./userRouter')
const toDoRouter = require('./toDoRouter')


router.get('/', (req, res) =>{
    res.status(200).json({message : 'main page'})
})

router.use('/user',userRouter)
router.use('/todos',toDoRouter)




module.exports = router