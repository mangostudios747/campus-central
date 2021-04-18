/* IMPORTS */
const express = require('express');
const router = express.Router();
const passport = require('../passport')
const usersRouter = require('./users');
const sectionsRouter = require('./sections');
const { userDatadb, usersdb } = require('../database');

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

router.get('/sign-in',
    passport.authenticate('schoology'));

router.get('/thanks-sgy', passport.authenticate('schoology', {
    successRedirect: '/app', // frontend url
    failureRedirect: '/api/oops' }))

router.get('/user-count', function(req, res, next){
  res.send({userCount:Object.keys(userDatadb.getState()).length})
})

module.exports = router;
