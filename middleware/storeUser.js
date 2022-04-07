export default function ({ store, $auth, req }) {

  /*if (process.server) { // do run this code
    //console.log('i ran on the server and the user is', req.user)
    store.commit('setUser', (req.user|| { profile:undefined }).profile);

  }

  $auth.setUser(store.state.user)*/

  store.commit('setUser', $auth.currentUser)

}
