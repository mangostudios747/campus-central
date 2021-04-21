import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
  courses: [],
  updates: [],
  messages: {
    inbox: [],
    sent: []
  },
  theSchedule: {}
})

export const mutations = {
  setValue(state, key, value) {
    state[key] = value
  },
  async getValue(state, key, fn, force = false) {
    if (!state[key] || force) {
      state[key] = await fn()
    }
    return state[key]
  }
}
