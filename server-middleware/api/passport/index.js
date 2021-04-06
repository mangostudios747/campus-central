/* IMPORTS */
const passport = require('passport')
    , SchoologyStrategy = require('passport-schoology-oauth').SchoologyStrategy;

const {usersdb, authdb} = require("../database");
const {getProfile} = require('../schoology')
const { key, secret } = require('./../keys/sc.json')

/* CONSTANTS */
const HOSTING_DOMAIN = process.env.HOST || 'http://localhost:3000';
const sgyDomain = 'https://pausd.schoology.com'


passport.use('schoology',new SchoologyStrategy({
        consumerKey: key,
        consumerSecret: secret,
        callbackURL: `${HOSTING_DOMAIN}/api/thanks-sgy`,
        sgyDomain
    },
    async function(token, tokenSecret, profile, done) {
        // these are access tokens and access secrets!
        // we need to fetch the user profile now
        getProfile(token, tokenSecret).then(function(userProfile) {
            usersdb.set(userProfile.uid, userProfile).write()
            authdb.set(userProfile.uid, {token, tokenSecret}).write()
            done(null, userProfile)
        })

    }));

passport.serializeUser(function(user, done) {
    done(null, user.uid);
});

passport.deserializeUser(function(uid, done) {
    const u = usersdb.get(uid).value();
    done(null, u);
});

module.exports = passport
