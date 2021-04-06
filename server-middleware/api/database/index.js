const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const path = require('path');

const usersdb = low(new FileSync(path.join(__dirname, '../db/users.json')))
usersdb.defaults({}).write();
const authdb = low(new FileSync(path.join(__dirname, '../db/auth.json'))); // where we map each user id to a access and refresh token
authdb.defaults({}).write();




module.exports = {
    usersdb,
    authdb
}
