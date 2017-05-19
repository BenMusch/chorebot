var express = require('express')
var app = express()

app.set('views', './views')
app.set('view engine', 'pug')

app.get('/', function(req, res) {
  res.render('index', { msg: 'Welcome to chorebot!' })
})

var server = app.listen(3000, function() {
  console.log('Server running at localhost:' + server.address().port)
})
