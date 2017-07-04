var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var socketIO = require('socket.io')();

var index = require('./routes/index');
var users = require('./routes/users');

var { generateMessage } = require('./utils/message');

var app = express();
app.socketIO = socketIO;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

socketIO.on('connection', function (socket) {
  //console.log('\nA client connection occurred!\n');
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to teh chat app'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'new User Join'));

  socket.on('createMessage', (message) => {
    console.log(message);
    //socket broadcast only to others
    socket.broadcast.emit('newMessage', generateMessage(message.from, message.text));
  });








  socket.on('disconnect', () => {
    console.log('User is disconnected');
  });


});


module.exports = app;
