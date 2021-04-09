export const state = () => ({
  user: null
})

export const mutations = {
  setUser(state, user) {
    console.log(user)
    state.user = user
  }
}

export const actions = {
  nuxtServerInit ({ commit }, { req }) {
    if (req.user) {
      commit('setUser', req.user.profile)
    }
  }
}
