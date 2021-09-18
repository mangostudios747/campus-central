const express = require('express')
const router = express.Router()
const protRoutes = require('./protectedRoutes.json')
/* GET home page. */
router.get('*', function(req, res, next) {
  if (req.user) {
    next();
  }
  else if (protRoutes[req.url]) {
    next();
  }
  else {
    //  if protected route
    res.redirect('/cc/api/sign-in')
  }
})



module.exports = router
