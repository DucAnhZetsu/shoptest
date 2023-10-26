var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var dateFormat = require('handlebars-dateformat');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var employeeRouter = require('./routes/employee');
var toyRouter = require('./routes/toy');
var homeRouter = require('./routes/home');
var adminRoutes = require('./routes/admin');

var hbs = require('hbs');
var Handlebars = require('handlebars');

Handlebars.registerHelper('eq', function(arg1, arg2) {
  return (arg1 == arg2);
});

hbs.handlebars = Handlebars;

hbs.registerHelper('dateFormat', require('handlebars-dateformat'));
hbs.registerHelper('equal', require('handlebars-helper-equal'))

Handlebars.registerHelper('ifCond', function(v1, operator, v2, options) {
  switch (operator) {
    case '>':
      return (v1 > v2) ? options.fn(this) : options.inverse(this);
    //  add more case for other operators ('<', '==', '!=', etc.)
    default:
      return options.inverse(this);
  }
});


// Create an instance of the Express app
var app = express();

// Configure body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

// Configure mongoose
var mongoose = require('mongoose');
//Note: cần khai báo tên db ở cuối uri của connection string
var uri = "mongodb+srv://anhldgch200641:22042002@cluster0.thqcm3k.mongodb.net/";
//disable mongoose warning in terminal
mongoose.set('strictQuery', true);
mongoose.connect(uri)
  .then(() => console.log('connect to db ok'))
  .catch((err) => console.log('connect to db error'));

// Set up views and view engine
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

app.use('/', homeRouter);
app.use('/', indexRouter);
app.use('/index', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRoutes);
app.use('/employee', employeeRouter);
app.use('/toy', toyRouter);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

// Configure server port
app.listen (process.env.PORT || 3001);

module.exports = app;
