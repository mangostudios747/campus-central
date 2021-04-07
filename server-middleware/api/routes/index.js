const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('*', function(req, res, next) {
  if (req.user || req.baseUrl.startsWith('/api')) {
    next()
  }
  else {
    res.redirect('/api/sign-in');
  }
});

//console.log(router)

module.exports = router;