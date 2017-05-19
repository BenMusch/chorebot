require('babel-register')
const express = require('express')
let app = express()

var bodyParser = require('body-parser')

app.set('views', './views')
app.set('view engine', 'pug')

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index', { msg: 'Welcome to chorebot!' })
})

const port = process.env.port || 3000
let server = app.listen(3000, () => {
  console.log(`Server running at localhost:${server.address().port}`)
})
