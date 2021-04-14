const express = require('express')
const { getSectionFolder } = require('../schoology')
const router = express.Router()

router.use((req, res, next) => {

  if (!req.user) return res.status(401).end()
  // todo: implement token acceptance, so that developers may sign in using tokens.
  //  for now, only frontend will be accessing this.
  next()
})

router.get('/', (req, res, next) =>{
  res.send({ s:'t' })
})

router.get('/:sectionid/folder/:folderid', async function(req, res, next) {
  const { sectionid, folderid } = req.params
  res.send( await getSectionFolder(req.user, sectionid, folderid));
})

module.exports = router
