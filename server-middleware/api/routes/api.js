/* IMPORTS */
var express = require('express');
var router = express.Router();
const passport = require('../passport')


router.get('/', function(req, res, next) {
    res.render('index', { title: 'HAHAHA'});
  // lol ok just a random homepage
});

router.get('/auth', function(req, res, next){
  if (req.user) next();
  else res.redirect('/sign-in');
})

router.get('/oops', function(req, res, next) {
    res.end('oops lol')
})

router.get('/sign-in',
    passport.authenticate('schoology'));

router.get('/thanks-sgy', passport.authenticate('schoology', {
    successRedirect: '/app', // todo: change this to the frontend url
    failureRedirect: '/api/oops' }))

module.exports = router;
