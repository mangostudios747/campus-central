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
        console.log(token, tokenSecret)
        // these are access tokens and access secrets!
        // we need to fetch the user profile now
        getProfile({token, tokenSecret}).then(function(userProfile) {
          console.log(userProfile.name_display)
            usersdb.set(userProfile.uid, userProfile).write()
            authdb.set(userProfile.uid, {token, tokenSecret}).write()
            done(null, {profile:userProfile, credentials:{token, tokenSecret}})
        })

    }));

passport.serializeUser(function(user, done) {
    done(null, user.profile.uid);
});

passport.deserializeUser(function(uid, done) {
    const u = usersdb.get(uid).value();
    const c = authdb.get(uid).value();
    done(null, {credentials:c, profile:u});
});

module.exports = passport
