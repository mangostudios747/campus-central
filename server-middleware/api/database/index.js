const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const path = require('path');

const usersdb = low(new FileSync(path.join(__dirname, '../db/users.json')))
usersdb.defaults({}).write();
// this just has userprofile data, which is passed to the frontend via middleware.

const statsdb = low(new FileSync(path.join(__dirname, '../db/stats.json')))
statsdb.defaults({userCount:{}}).write();

const authdb = low(new FileSync(path.join(__dirname, '../db/auth.json')));
authdb.defaults({}).write();
// where we map each user id to a access and refresh token

const userDatadb = low(new FileSync(path.join(__dirname, '../db/userData.json')));
userDatadb.defaults({}).write();


const sessionStoragedb = low(new FileSync(path.join(__dirname, '../db/sessionStorage.json'), { defaultValue: [] }));


const { MongoClient } = require('mongodb');
const uri = process.env.MONGO_URL;
const mdb = MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then((c)=>c.db("campuscentral"));
//let usersmdb, authmdb, userDatamdb, sessionStoragemdb, statsmdb;
/*client.connect(err => {
  const mdb = client.db("campuscentral");
   usersmdb = mdb.collection("users");
   authmdb = mdb.collection("auth");
   userDatamdb = mdb.collection("userData");
   sessionStoragemdb = mdb.collection("sessionStorage");
   statsmdb = mdb.collection("stats");
  // perform actions on the collection object
  client.close();
});*/

module.exports = {
    usersdb,
    authdb,
    userDatadb,
  sessionStoragedb, statsdb,
  mdb
}
