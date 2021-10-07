const express = require('express')
const sgy = require('../schoology')
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
  res.send( await sgy.getSectionFolder(req.user, sectionid, folderid));
})

router.get('/:sectionid/updates', async function(req, res, next) {
  const { sectionid } = req.params
  res.send( await sgy.fetchCourseUpdates(req.user, sectionid));
})

router.get('/:sectionid/announcement', async function(req, res, next) {
  const { sectionid } = req.params
  res.send( await sgy.getSectionAnnouncement(req.user, sectionid));
})

module.exports = router
