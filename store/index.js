export const state = () => ({
  user: null,
  messages:{
    sent:[], inbox:[]
  }
})

export const mutations = {
  setUser(state, user) {
    //console.log(user)
    state.user = user
  },
  setMessagesInbox(state, messages) {
    state.messages.inbox = messages
  },
  setMessagesSent(state, messages) {
    state.messages.sent = messages
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
