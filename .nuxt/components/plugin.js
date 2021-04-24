import Vue from 'vue'
import { wrapFunctional } from './index'

const components = {
  CourseMaterials: () => import('../../components/CourseMaterials.vue' /* webpackChunkName: "components/course-materials" */).then(c => wrapFunctional(c.default || c)),
  Logo: () => import('../../components/Logo.vue' /* webpackChunkName: "components/logo" */).then(c => wrapFunctional(c.default || c)),
  MaterialViewer: () => import('../../components/MaterialViewer.vue' /* webpackChunkName: "components/material-viewer" */).then(c => wrapFunctional(c.default || c)),
  Update: () => import('../../components/Update.vue' /* webpackChunkName: "components/update" */).then(c => wrapFunctional(c.default || c)),
  VuetifyLogo: () => import('../../components/VuetifyLogo.vue' /* webpackChunkName: "components/vuetify-logo" */).then(c => wrapFunctional(c.default || c)),
  WeekCalendar: () => import('../../components/WeekCalendar.vue' /* webpackChunkName: "components/week-calendar" */).then(c => wrapFunctional(c.default || c)),
  BreakpointDetection: () => import('../../components/breakpointDetection.vue' /* webpackChunkName: "components/breakpoint-detection" */).then(c => wrapFunctional(c.default || c))
}

for (const name in components) {
  Vue.component(name, components[name])
  Vue.component('Lazy' + name, components[name])
}
