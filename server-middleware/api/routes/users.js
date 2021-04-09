var express = require('express');
var router = express.Router();
const {getSections,reloadSections, getPendingAssignmentsForSection, getAssignmentsForSection, reloadAssignmentsForSection} = require('../schoology')

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

router.get('/me/sections/reload', async function(req, res, next) {
  res.send((await reloadSections(req.user)));
});

router.get('/me/sections/:sectionid/reload', async function(req, res, next) {
  const sections = await getSections(req.user);
  if (!sections.filter(section => section.id===req.params.sectionid)) return res.status(404).end()
  res.send((await reloadAssignmentsForSection(req.user, req.params.sectionid)));
});


router.get('/test/:index', async function(req, res, next){
  const sections = await getSections(req.user);
  res.send(await getPendingAssignmentsForSection(req.user, sections[req.params.index].id))
})

router.get('/me/sections/:sectionid/assignments', async function(req, res, next){
  const sections = await getSections(req.user);
  if (!sections.filter(section => section.id===req.params.sectionid)) return res.status(404).end()
  res.send(await getAssignmentsForSection(req.user, req.params.sectionid))
});

router.get('/me/sections/:sectionid/assignments/pending', async function(req, res, next){
  const sections = await getSections(req.user);
  if (!sections.filter(section => section.id===req.params.sectionid)) return res.status(404).end()
  res.send(await getPendingAssignmentsForSection(req.user, req.params.sectionid))
});

router.get('/me/sections/:sectionid', async function(req, res, next){
  const sections = await getSections(req.user);

  const poss = sections.filter(section => section.id===req.params.sectionid);
  if (!poss) return res.status(404).end()
  res.send(poss[0])

});



module.exports = router;
