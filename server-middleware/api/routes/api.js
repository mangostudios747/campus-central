/* IMPORTS */
const express = require('express');
const router = express.Router();
const passport = require('../passport')
const usersRouter = require('./users');
const sectionsRouter = require('./sections');

const { userDatadb, statsdb } = require('../database');

/* USES */
router.use('/sections', sectionsRouter);
router.use('/users', usersRouter) // so we can have /api/users


/* ROUTES */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'HAHAHA'});
  // lol ok just a random homepage
});

router.get('/auth', function(req, res, next){
  if (req.user) res.redirect('/app');
  else res.redirect('/api/sign-in'); // used by the homepage
})

router.get('/oops', function(req, res, next) {
    res.end('oops lol')
})

/*router.get('/session', function(req, res, next) {
  res.send({ session: req.session.cookie.passport }).end();
}) // scary*/

router.get('/sign-in',
    passport.authenticate('schoology'));

router.get('/thanks-sgy', passport.authenticate('schoology', {
    successRedirect: '/app', // frontend url
    failureRedirect: '/api/oops' }))

router.get('/user-count', function(req, res, next){
  res.send({userCount:Object.keys(userDatadb.getState()).length})
})

router.get('/user-count/log', function(req, res, next){
  const state = {
    "userCount": {
      "1618758000646": 27,
      "1618761600334": 27,
      "1618765200683": 27,
      "1618768800137": 29,
      "1618772400683": 29,
      "1618776000273": 30,
      "1618779600951": 30,
      "1618783200937": 30,
      "1618790400311": 30
    }
  }.userCount || statsdb.getState().userCount;
  const keys = Object.keys(state);
  const values = keys.map(key => state[key]);
  res.send({keys, values})
})

module.exports = router;
