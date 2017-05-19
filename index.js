require('babel-register')
const express = require('express')
let app = express()

app.set('views', './views')
app.set('view engine', 'pug')

app.get('/', (req, res) => {
  res.render('index', { msg: 'Welcome to chorebot!' })
})

let server = app.listen(3000, () => {
  console.log(`Server running at localhost:${server.address().port}`)
})
