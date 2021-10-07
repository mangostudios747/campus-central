import Vue from 'vue'
import colors from 'vuetify/es5/util/colors'

const GRADE_OPINIONS = {
  PERFECT: 100,
  GOOD: 90,
  OKAY: 75,
  CRITICAL: 60,
  FAILING: 0
}
const GRADE_COLORS = {
  PERFECT: colors.green.base,
  GOOD: colors.lime.base,
  OKAY: colors.yellow.darken2,
  CRITICAL: colors.deepOrange.lighten1,
  FAILING: colors.purple.base
}

Vue.directive('color-grade', {
  componentUpdated(el, { value }) {
    // value is the actual grade percentage
  }
})
