

export const state = () => ({
  courses: [],
  courseMaterials:{},
  courseUpdates:{},
  updates: [],
  messages: {
    inbox: [],
    sent: []
  },
  theSchedule: {}
})

export const mutations = {

}

export const actions = {

  async refreshValue( { state }, key, get) {
      const result = await get();
  }
}
