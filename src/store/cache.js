

export const state = () => ({
  courses: [],
  courseMaterials:{},
  courseUpdates:{},
  updates: [],
  messages: {
    inbox: [],
    sent: []
  },
  theSchedule: {},
  version:'2021-04-24T15:50:33.769Z',
  courseNotes: {}
})

export const mutations = {
  setCourses(state, courses){
    state.courses = courses;
  },
  setCourseMaterials(state, {courseid, materials}){
    //console.log('hi')
    state.courseMaterials[courseid] = materials;
  },
  setCourseUpdates(state, {courseid, updates}){
    state.courseUpdates[courseid] = updates;
  },
  setCourseNotes(state, {courseid, notes}){
    state.courseNotes[courseid] = JSON.parse(JSON.stringify(notes));
  }
}

export const actions = {

  async refreshValue( { state }, key, get) {
      const result = await get();
  }
}
