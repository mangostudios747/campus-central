import low from 'lowdb'
import LocalStorage from 'lowdb/adapters/LocalStorage'
const adapter = new LocalStorage('cc_cache')
const db = low(adapter)

export default {
  install (Vue, options) {
    Vue.prototype.$db = db;
  }
};
