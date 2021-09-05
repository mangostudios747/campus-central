const { MongoClient } = require('mongodb');
const uri = process.env.MONGO_URL;
const mdb = MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then((c)=>c.db("campuscentral"));

module.exports = {
  mdb
}
