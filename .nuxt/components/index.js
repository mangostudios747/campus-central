export { default as CourseMaterials } from '../../components/CourseMaterials.vue'
export { default as Logo } from '../../components/Logo.vue'
export { default as MaterialViewer } from '../../components/MaterialViewer.vue'
export { default as Update } from '../../components/Update.vue'
export { default as VuetifyLogo } from '../../components/VuetifyLogo.vue'
export { default as WeekCalendar } from '../../components/WeekCalendar.vue'

export const LazyCourseMaterials = import('../../components/CourseMaterials.vue' /* webpackChunkName: "components/course-materials" */).then(c => wrapFunctional(c.default || c))
export const LazyLogo = import('../../components/Logo.vue' /* webpackChunkName: "components/logo" */).then(c => wrapFunctional(c.default || c))
export const LazyMaterialViewer = import('../../components/MaterialViewer.vue' /* webpackChunkName: "components/material-viewer" */).then(c => wrapFunctional(c.default || c))
export const LazyUpdate = import('../../components/Update.vue' /* webpackChunkName: "components/update" */).then(c => wrapFunctional(c.default || c))
export const LazyVuetifyLogo = import('../../components/VuetifyLogo.vue' /* webpackChunkName: "components/vuetify-logo" */).then(c => wrapFunctional(c.default || c))
export const LazyWeekCalendar = import('../../components/WeekCalendar.vue' /* webpackChunkName: "components/week-calendar" */).then(c => wrapFunctional(c.default || c))

// nuxt/nuxt.js#8607
export function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
