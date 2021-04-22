import { vuexfireMutations } from 'vuexfire'

export const state = () => ({
  user: null,
  messages:{
    sent:[], inbox:[]
  },
  courses:null // will store
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
  setCourses(state, courses){
    state.cache.courses = courses;
  },
  setCourseMaterials(state, {courseid, materials}){
    console.log('hi')
    state.cache.courseMaterials[courseid] = materials;
  },
  setCourseUpdates(state, {courseid, updates}){
    state.cache.courseUpdates[courseid] = updates;
  }
}

export const actions = {
  setCourses({commit, dispatch}, courses){
    commit('setCourses', courses);
    dispatch('hc/customize', courses)
  }
}


export const getters = {
  getCourse: (state) => (courseid) => {
    return state.cache.courses.find(e=>e.id===courseid)
  }
}
