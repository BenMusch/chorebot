require('babel-register')
const express = require('express'),
      path = require('path'),
      favicon = require('serve-favicon'),
      cookieParser = require('cookie-parser'),
      bodyParser = require('body-parser'),
      db = require('./model/db'),
      index = require('./routes/index'),
      logger = require('morgan'),
      constants = require('./constants')

let app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// mount custom routes
app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

let server = app.listen(constants.port, () => {
  console.log(`Server running at localhost:${server.address().port}`)
})

module.exports = app;
