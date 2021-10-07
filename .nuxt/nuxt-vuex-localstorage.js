import bindStorage from 'nuxt-vuex-localstorage/plugins/bindStorage'

export default (ctx) => {
  const options = {"mode":"debug","localStorage":["cache"]}
  bindStorage(ctx, options)
}
