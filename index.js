require('babel-register')
const express = require('express')
let app = express()

let bodyParser = require('body-parser')

const User = require('./db').User

app.set('views', './views')
app.set('view engine', 'pug')

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  const users = User.find({}, (err, users) => {
    res.render('index', { msg: 'Welcome to chorebot!', users: users })
  })
})

const port = process.env.PORT || 3000
let server = app.listen(port, () => {
  console.log(`Server running at localhost:${server.address().port}`)
})
