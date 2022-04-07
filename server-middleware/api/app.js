require('dotenv').config();
const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const session = require('express-session')
const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware')
const passport = require('passport');
const uuid = require('node-uuid')
const MONGO_URL = process.env.MONGO_URL;

console.log("I AM RUNNING")

//const indexRouter = require('./routes/index')
const apiRouter = require('./routes/api')
const {mdb} = require("./database");
let usersmdb, statsmdb;
mdb.then(c=> {
  usersmdb = c.collection('users');
  statsmdb = c.collection('stats');
})
var cron = require('node-cron');

cron.schedule('0 * * * *', async function(){
  const userCount = await usersmdb.countDocuments();
  await statsmdb.insertOne({
    _id: new Date(),
    userCount
  })
});


const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


const store = MongoStore.create({
  mongoUrl: MONGO_URL,
});



app.use(session({
  secret: process.env.COOKIE_SECRET, // TODO: legit secret
  resave: false,
  store,
  genid: function () {
    return uuid.v4();
  },
  saveUninitialized: false,
  cookie: { //
    secure: false,
    maxAge: 365*24*60*60*1000
  }
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

//app.use('/app', indexRouter)
app.use(apiRouter); // app will be injected at `/cc/api`

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(
    createError(404)
  );
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = err // req.app.get('env') === 'development' ? err : {};

  // render the error page
  //res.status(err.status || 500);
  //res.render('error');
  next()
});

module.exports = app;
