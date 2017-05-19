var express = require('express')
var app = express()

var bodyParser = require('body-parser')

app.set('views', './views')
app.set('view engine', 'pug')

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', function(req, res) {
  res.render('index', { msg: 'Welcome to chorebot!' })
})

var server = app.listen(3000, function() {
  console.log('Server running at localhost:' + server.address().port)
})
