export const state = () => ({
  user: null
})

export const mutations = {
  setUser(state, user) {
    //console.log(user)
    state.user = user
  }
}

export const actions = {
  /*nuxtServerInit ({ commit }, { req }) {
    if (req.session.oauth){
      console.log(req.session.oauth)
    }

    if (req.user) {
      commit('setUser', req.user.profile)
    }
    else {
      console.log('user not found' ,''+req.user)
    }
  }*/
}
