const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const session = require('express-session')
const LowdbStore = require('lowdb-session-store')(session);
const sassMiddleware = require('node-sass-middleware')
const passport = require('passport');
const uuid = require('node-uuid')


const indexRouter = require('./routes/index')
const apiRouter = require('./routes/api')
const {sessionStoragedb} = require("./database");


const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(session({
  secret: 'keyboard cat', // TODO: legit secret
  resave: false,
  store: new LowdbStore(sessionStoragedb, {
    ttl: 86400
  }),
  genid: function () {
    return uuid.v4();
  },
  saveUninitialized: true,
  cookie: { secure: false }
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser('keyboard cat'));
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

const [pinitialize, psession] = [passport.initialize(), passport.session()]

app.use(pinitialize);
app.use(psession);

app.use('/app', indexRouter)
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(
    //createError(404)
  );
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  //res.status(err.status || 500);
  //res.render('error');
  next()
});

module.exports = app;
