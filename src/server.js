const express = require('express')
const {Nuxt} = require('nuxt')
const path = require('path')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const api = require('./api/app');
// Create App
const app = express()

// Set API Gateway Middleware
app.use(awsServerlessExpressMiddleware.eventContext())

// Provide Assets
app.use('/_nuxt', express.static(path.join(__dirname, '.nuxt', 'dist')))
app.use(api);
// Add Nuxt
let config = require('./nuxt.config.js')
const nuxt = new Nuxt(config)
app.use(nuxt.render)


module.exports = app
