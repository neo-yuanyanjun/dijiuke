var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

app.get('/tab', function (req, res) {
  var url = 'http://img6.bdstatic.com/img/image/smallpic/mingxing11.jpeg';
  var response = {
    code: 0,
    message: null,
    data: {
      menus: [
        {
          position: 1,
          name: '首页',
          link: '/link1',
          icon: url
        },
        {
          position: 2,
          name: '广告文案',
          link: '/link2',
          icon: url
        },
        {
          position: 3,
          name: '品牌策划',
          link: '/link3',
          icon: url
        },
        {
          position: 4,
          name: '我的课程',
          link: '/myCourses',
          icon: url
        },
      ]
    }
  };
  res.send(response);
});

app.post('/sms', function (req, res) {
  res.send({
    code: 0,
    message: null,
    data: null
  });
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
