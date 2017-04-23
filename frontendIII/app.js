var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

app.get('/course', function (req, res) {
    var response = '{"code":0,"message":"success","data":{"sub_courses":[{"id":"1","name":"腾讯产品之道","code":"2000001","position":"1","banner":"http:\/\/139.224.55.29\/uploads\/b7a356a1525c09938d72c9c89ebd6c97.jpg","time":"3月2日","city":"深圳","teachers":"张小龙","describe":"腾讯如何做产品","price":"1000","max_enter_num":"50","button_word":"立即报名","father_course":"1","edit_time":"2017-03-26 14:19:05","deposit":"500","button_link_url":null,"button_color":null},{"id":"2","name":"腾讯产品之道","code":"2000002","position":"2","banner":"http:\/\/139.224.55.29\/uploads\/018ff97f7f0531607c3b030dd07e5a8f.jpg","time":"3月4日","city":"北京","teachers":"汤道生","describe":"腾讯副总裁传授qq产品之道","price":"1000","max_enter_num":"50","button_word":"立即报名","father_course":"1","edit_time":"2017-03-26 14:20:23","deposit":"500","button_link_url":null,"button_color":null},{"id":"3","name":"方法论","code":"2000003","position":"2","banner":"http:\/\/139.224.55.29\/uploads\/a48421c7c5410a54acfcad422b094457.jpg","time":"3月8日","city":"北京","teachers":"李叫兽","describe":"百度90后副总裁教你如何思考","price":"1000","max_enter_num":"50","button_word":"立即报名","father_course":"2","edit_time":"2017-03-26 14:21:09","deposit":"500","button_link_url":null,"button_color":null},{"id":"4","name":"方法论","code":"2000004","position":"1","banner":"http:\/\/139.224.55.29\/uploads\/ea97e57cbf505dde4c174a6f5d34742c.jpg","time":"4月2日","city":"深圳","teachers":"李叫兽","describe":"百度90后副总裁李叫兽教你如何思考","price":"1000","max_enter_num":"50","button_word":"立即报名","father_course":"2","edit_time":"2017-03-26 14:21:18","deposit":"500","button_link_url":null,"button_color":null}]}}';
    res.end(response);
});

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

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
