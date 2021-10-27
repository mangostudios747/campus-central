export { default as CourseMaterials } from '../../src/components/CourseMaterials.vue'
export { default as Logo } from '../../src/components/Logo.vue'
export { default as MaterialViewer } from '../../src/components/MaterialViewer.vue'
export { default as Update } from '../../src/components/Update.vue'
export { default as VuetifyLogo } from '../../src/components/VuetifyLogo.vue'
export { default as WeekCalendar } from '../../src/components/WeekCalendar.vue'
export { default as BreakpointDetection } from '../../src/components/breakpointDetection.vue'

export const LazyCourseMaterials = import('../../src/components/CourseMaterials.vue' /* webpackChunkName: "components/course-materials" */).then(c => wrapFunctional(c.default || c))
export const LazyLogo = import('../../src/components/Logo.vue' /* webpackChunkName: "components/logo" */).then(c => wrapFunctional(c.default || c))
export const LazyMaterialViewer = import('../../src/components/MaterialViewer.vue' /* webpackChunkName: "components/material-viewer" */).then(c => wrapFunctional(c.default || c))
export const LazyUpdate = import('../../src/components/Update.vue' /* webpackChunkName: "components/update" */).then(c => wrapFunctional(c.default || c))
export const LazyVuetifyLogo = import('../../src/components/VuetifyLogo.vue' /* webpackChunkName: "components/vuetify-logo" */).then(c => wrapFunctional(c.default || c))
export const LazyWeekCalendar = import('../../src/components/WeekCalendar.vue' /* webpackChunkName: "components/week-calendar" */).then(c => wrapFunctional(c.default || c))
export const LazyBreakpointDetection = import('../../src/components/breakpointDetection.vue' /* webpackChunkName: "components/breakpoint-detection" */).then(c => wrapFunctional(c.default || c))

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
