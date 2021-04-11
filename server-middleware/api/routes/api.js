/* IMPORTS */
var express = require('express');
var router = express.Router();
const passport = require('../passport')
var usersRouter = require('./users');

router.use('/users', usersRouter) // so we can have /api/users

router.get('/', function(req, res, next) {
    res.render('index', { title: 'HAHAHA'});
  // lol ok just a random homepage
});

router.get('/auth', function(req, res, next){
  if (req.user) res.redirect('/app');
  else res.redirect('/api/sign-in');
})

router.get('/oops', function(req, res, next) {
    res.end('oops lol')
})

router.get('/sign-in',
    passport.authenticate('schoology'));

router.get('/thanks-sgy', passport.authenticate('schoology', {
    successRedirect: '/app', // frontend url
    failureRedirect: '/api/oops' }))

module.exports = router;
