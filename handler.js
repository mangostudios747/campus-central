const sls = require('serverless-http')
const binaryMimeTypes = require('./binaryMimeTypes')
const nuxt = require('./nuxtBuild')

module.exports.nuxt = sls(nuxt, {
  binary: binaryMimeTypes
})
