//creates HTTP errors for Express
const createError = require('http-errors');
const express = require('express');
// provides utilities for working with file and directory paths.
const path = require('path');
//Parse Cookie header and populate req.cookies with an object keyed by the cookie names.
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
//brings in events api routing
const eventsAPIRouter = require('./routes/api/events')

//calling the express function
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

//26-27 came with boiler plate
app.use('/', indexRouter);
app.use('/users', usersRouter);
//calls 2 params: string to set route for domain to hit for api, file and fx to run
app.use('/api/events', eventsAPIRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

module.exports = app;
