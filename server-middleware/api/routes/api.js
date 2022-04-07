/* IMPORTS */
const express = require('express');
const router = express.Router();
const passport = require('../passport')
const usersRouter = require('./users');
const sectionsRouter = require('./sections');
const prefRouter = require('./preferences')

const { mdb } = require('../database');
let usersmdb, statsmdb;
mdb.then(c=> {
  usersmdb = c.collection('users');
  statsmdb = c.collection('stats');
})
/* USES */
router.use('/sections', sectionsRouter);
router.use('/users', usersRouter) // so we can have /api/users
router.use('/preferences', prefRouter);

/* ROUTES */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'HAHAHA'});
  // lol ok just a random homepage
});

router.get('/auth', function(req, res, next){
  if (req.user) res.redirect('/app');
  else res.redirect('/cc/api/sign-in'); // used by the homepage
})

router.get('/oops', function(req, res, next) {
    res.end('oops lol')
})

router.get('/session', function(req, res, next) {
  res.send({ session: req.session }).end();
}) // scary

router.get('/sign-in',
    passport.authenticate('schoology'));

router.get('/sign-out', function(req, res){
  req.logout();
  res.redirect('/');
});

router.get('/thanks-sgy', passport.authenticate('schoology', {
    successRedirect: '/app', // frontend url
    failureRedirect: '/cc/api/oops' }))

router.get('/user-count', async function(req, res, next){
  res.send({userCount: (await usersmdb.countDocuments()) })
})

router.get('/user-count/log', async function(req, res, next){
  const state = await statsmdb.find().toArray();
  const keys = state.map(e=>e._id)
  const values = state.map(e=>e.userCount)
  res.send({keys, values})
})



module.exports = router;
