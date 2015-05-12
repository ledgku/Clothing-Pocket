var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var log = require('./logger');
var multer = require('multer');
var async = require('async');
var cron = require('cron');
var session = require('express-session');
var redis = require('redis');
var RedisStore = require('connect-redis')(session);
var client = redis.createClient();
client.select(3);

var routes = require('./routes/index');
var users = require('./routes/users');
var closet = require('./routes/closet');
var coordi = require('./routes/coordi');
var follow = require('./routes/follow');
var home = require('./routes/home');
var item = require('./routes/item');
var list = require('./routes/list');
var mycloset = require('./routes/mycloset');
var notice = require('./routes/notice');
var report = require('./routes/report');
var schedule = require('./routes/schedule');
var user = require('./routes/user');
var listb = require('./routes/listb');
var admin = require('./routes/admin');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// redis session
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    store: new RedisStore({
        host: 'localhost',
        port: 6739,
        ttl: 60*60,
        client: client
    })
}));

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/closet', closet);
app.use('/coordi', coordi);
app.use('/follow', follow);
app.use('/home', home);
app.use('/item', item);
app.use('/list', list);
app.use('/mycloset', mycloset);
app.use('/notice', notice);
app.use('/report', report);
app.use('/schedule', schedule);
app.use('/user', user);
app.use('/listb', listb);
app.use('/admin', admin);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', 80);
var server = http.createServer(app);
server.listen(app.get('port'));
log.info('서버가 ' + app.get('port') + '번 포트에서 실행 중입니다. 주인님!!!');

module.exports = app;
