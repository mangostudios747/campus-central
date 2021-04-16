const express = require('express')
const router = express.Router()
const sgy = require('../schoology')

// middleware: reject the request when there is no user - this way we can keep the code clean
router.use((req, res, next) => {

  if (!req.user) return res.status(401).end()
  // todo: implement token acceptance, so that developers may sign in using tokens.
  //  for now, only frontend will be accessing this.
  next()
})

// all the classes that the user is currently enrolled in
router.get('/me/sections', async function(req, res, next) {
  res.send((await sgy.getSections(req.user)))
})

router.get('/me/sections/reload', async function(req, res, next) {
  res.send((await sgy.reloadSections(req.user)))
})

router.get('/me/sections/:sectionid/reload', async function(req, res, next) {
  const sections = await sgy.getSections(req.user)
  if (!sections.filter(section => section.id === req.params.sectionid)) return res.status(404).end()
  res.send((await sgy.reloadAssignmentsForSection(req.user, req.params.sectionid)))
})


router.get('/test/:index', async function(req, res, next) {
  const sections = await sgy.getSections(req.user)
  res.send(await sgy.getPendingAssignmentsForSection(req.user, sections[req.params.index].id))
})

router.get('/me/sections/:sectionid/assignments', async function(req, res, next) {
  const sections = await sgy.getSections(req.user)
  if (!sections.filter(section => section.id === req.params.sectionid)) return res.status(404).end()
  res.send(await sgy.getAssignmentsForSection(req.user, req.params.sectionid))
})

router.get('/me/sections/:sectionid/assignments/pending', async function(req, res, next) {
  const sections = await sgy.getSections(req.user)
  if (!sections.filter(section => section.id === req.params.sectionid)) return res.status(404).end()
  res.send(await sgy.getPendingAssignmentsForSection(req.user, req.params.sectionid))
})

router.get('/me/sections/:sectionid', async function(req, res, next) {
  const section = await sgy.getSection(req.user, req.params.sectionid);
  res.send(section)

})

router.get('/me/messages/inbox', async function(req, res, next) {
  res.send(await sgy.fetchMessagesInbox(req.user))
})

router.get('/me/messages/sent', async function(req, res, next) {
  res.send(await sgy.fetchMessagesSent(req.user))
})

router.get('/me/messages/inbox/:messageid', async function(req, res, next) {
  res.send(await sgy.fetchInboxMessage(req.user, req.params.messageid))
})
router.get('/me/messages/sent/:messageid', async function(req, res, next) {
  res.send(await sgy.fetchSentMessage(req.user, req.params.messageid))
})

router.get('/profile/:uid', async function(req, res, next) {
  res.send(await sgy.getProfileFor(user.credentials, req.params.uid))
  // use this on the client lol!
})

// to reply to a thread
router.post('/me/messages/:messageid', async function(req, res, next) {
  // recipient, message, subject
  const datums = req.body
  await sgy.replyToMessage(req.user, req.params.messageid, datums)
  res.sendStatus(204).end()
})

router.get('/me/events/week', async function(req, res, next) {
  res.send([...(await sgy.fetchWeekUserEvents(req.user)), ...(await sgy.fetchAllSectionEventsForWeek(req.user))])
})

router.get('/me/events/week/sections', async function(req, res, next) {
  res.send(await sgy.fetchAllSectionEventsForWeek(req.user))
})

router.get('/me/recent', async function(req, res, next) {
  res.send(await sgy.fetchRecentUpdates(req.user));
});

module.exports = router
