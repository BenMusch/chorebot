var express = require('express')
var app = express()

app.get('/', function(req, res) {
  res.send('Welcome to Chorebot!')
})

var server = app.listen(3000, function() {
  console.log('Server running at localhost:' + server.address().port)
})
