var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var app = express();
app.set('view engine', 'hbs');


var router = express.Router();
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//khai báo router
var employeeRouter = require('./routes/employee');
var toyRouter = require('./routes/toy');
var homeRouter = require('./routes/home');
var adminRoutes = require('./routes/admin');

//using the registerHelper method from the handlebars module instead of hbs. Then we assign hbs.handlebars to the handlebars module to make sure that hbs uses the same instance of Handlebars where we registered the helper.

var hbs = require('hbs');
var Handlebars = require('handlebars');
Handlebars.registerHelper('eq', function(arg1, arg2) {
  return (arg1 == arg2);
});
hbs.handlebars = Handlebars;



//khai báo và cấu hình thư viện dateFormat, equal cho hbs

hbs.registerHelper('dateFormat', require('handlebars-dateformat'));
hbs.registerHelper('equal', require('handlebars-helper-equal'))


//khai báo & cấu hình body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

//khai báo & cấu hình mongoose
var mongoose = require('mongoose');
//Note: cần khai báo tên db ở cuối uri của connection string
var uri = "mongodb+srv://anhldgch200641:22042002@cluster0.thqcm3k.mongodb.net/";
//disable mongoose warning in terminal
mongoose.set('strictQuery', true);
mongoose.connect(uri)
  .then(() => console.log('connect to db ok'))
  .catch((err) => console.log('connect to db error'));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.get('/admin', function(req, res) {
  res.render('adminHome');
});


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', router);

app.use('/', homeRouter);
app.use('/', indexRouter);
app.use('/index', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRoutes);
app.use('/employee', employeeRouter);
app.use('/toy', toyRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render error page
  res.status(err.status || 500);
  res.render('error');
});



// cấu hình port của server để deploy lên cloud
app.listen (process.env.PORT || 3001);

module.exports = app;