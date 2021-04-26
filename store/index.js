import { vuexfireMutations } from 'vuexfire'

export const state = () => ({
  user: null,
  messages:{
    sent:[], inbox:[]
  },
  courses:null, // will store
  grades: null
})

export const mutations = {
  setUser(state, user) {
    //console.log(user)
    state.user = user
  },
  ...vuexfireMutations,
  setMessagesInbox(state, messages) {
    state.messages.inbox = messages
  },
  setMessagesSent(state, messages) {
    state.messages.sent = messages
  },
  setGrades(state, grades) {
    state.grades = grades;
  }
}

export const actions = {
  setCourses({commit, dispatch}, courses){
    commit('cache/setCourses', courses);
    dispatch('hc/customize', courses)
  }
}


export const getters = {
  getCourse: (state) => (courseid) => {
    return state.cache.courses.find(e=>e.id===courseid)
  }
}
