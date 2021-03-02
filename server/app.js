require('dotenv').config()
const express = require('express')
const app = express()
const router = require('./routers')
const port = 3000
const errorHandler = require('./middleware/errorHandler')


app.use(express.urlencoded({extended : true}))
app.use(express.json())


app.use(router)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})