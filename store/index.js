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


