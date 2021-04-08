export default function ({ store, req }) {

  if (process.server) {
    //console.log('i ran on the server and the user is', req.user)
    store.commit('setUser', (req.user|| { profile:undefined }).profile);

  }
}
