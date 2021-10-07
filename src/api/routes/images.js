const express = require('express');
const router = express.Router();
const request = require('request');
const { key, secret } = { key: process.env.schoology_key, secret: process.env.schoology_secret}

router.get('*', async (req, res, next) => {
  const {url} = req.body;
  const {token, tokenSecret} = req.user.credentials;

})
