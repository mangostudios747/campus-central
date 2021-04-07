var express = require('express');
var router = express.Router();
const {getSections} = require('../schoology')


// middleware: reject the request when there is no user - this way we can keep the code clean
router.use((req, res, next) => {
  if (!req.user) return res.status(401).end();
  // todo: implement token acceptance, so that developers may sign in using tokens.
  //  for now, only frontend will be accessing this.
  next();
})

// all the classes that the user is currently enrolled in
router.get('/me/sections', async function(req, res, next) {
  res.send((await getSections(req.user)));
});





module.exports = router;
