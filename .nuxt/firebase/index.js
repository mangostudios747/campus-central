import createApp from './app.js'

import databaseService from './service.database.js'

const appConfig = {"apiKey":"AIzaSyDjLQAzre_M7puZsitnnXhu7uH6M-JIerc","authDomain":"homeworkcentral.firebaseapp.com","databaseURL":"https:\u002F\u002Fhomeworkcentral.firebaseio.com","projectId":"homeworkcentral","storageBucket":"homeworkcentral.appspot.com","messagingSenderId":"709390643857","appId":"1:709390643857:web:7ee7ad222cf5f2ba9f4530"}

export default async (ctx, inject) => {
  const { firebase, session } = await createApp(appConfig, ctx)

  let servicePromises = []

  if (process.server) {
    servicePromises = [
      databaseService(session, firebase, ctx, inject),

    ]
  }

  if (process.client) {
    servicePromises = [
      databaseService(session, firebase, ctx, inject),

    ]
  }

  const [
    database
  ] = await Promise.all(servicePromises)

  const fire = {
    database: database
  }

    inject('fireModule', firebase)
    ctx.$fireModule = firebase

  inject('fire', fire)
  ctx.$fire = fire
}

function forceInject (ctx, inject, key, value) {
  inject(key, value)
  const injectKey = '$' + key
  ctx[injectKey] = value
  if (typeof window !== "undefined" && window.$nuxt) {
  // If clause makes sure it's only run when ready() is called in a component, not in a plugin.
    window.$nuxt.$options[injectKey] = value
  }
}