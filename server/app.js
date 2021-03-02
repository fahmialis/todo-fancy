require('dotenv').config()
const express = require('express')
const app = express()
const router = require('./routers')
const port = 3000


app.use(express.urlencoded({extended : true}))
app.use(express.json())

// console.log(process.env.SECRET);

app.use(router)

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})