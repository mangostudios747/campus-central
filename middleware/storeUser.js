export default function ({ store, req }) {

  if (process.server) { // do run this code
    //console.log('i ran on the server and the user is', req.user)
    store.commit('setUser', (req.user|| { profile:undefined }).profile);

  }
}
