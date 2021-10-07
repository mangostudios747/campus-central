const express = require('express')
const router = express.Router()
import {mdb} from '../database'
let prefmdb;
mdb.then(c=> {
  prefmdb = c.collection('preferences');

})

router.use((req, res, next) => {

  if (!req.user) return res.status(401).end()
  // todo: implement token acceptance, so that developers may sign in using tokens.
  //  for now, only frontend will be accessing this.
  next()
})

router.get('/', (req, res, next) => {
  res.send({ s:'t' })
})

router.patch('/classes', async function(req, res, next) {
  const classp = req.body;
  await prefmdb.updateOne({_id:req.user.profile._id}, {$set:{classes:classp}}, {upsert:true});
  res.status(204).end();
})

router.get('/classes', async function(req, res, next) {
  const p = ( await prefmdb.findOne({_id:req.user.profile._id}) ) || {};
  let classes = undefined;
  if (p.classes){
    classes = JSON.parse(Object.keys(p.classes)[0]);
  }
  res.status(200).send(classes);
})

module.exports = router;
